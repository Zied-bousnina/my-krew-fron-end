import React, { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import * as yup from "yup";
import FormGroup from "@/components/ui/FormGroup";
import ErrorAlert from "@/components/ui/alert/error";
import Button from "@/components/ui/Button";
import Textinput from "@/components/ui/Textinput";
import Fileinput from "@/components/ui/Fileinput";
import { useFormik } from "formik";
import { missionService } from "@/_services/mission.service";
import { ToastContainer, toast } from "react-toastify";
import PageLoader from "@/components/ui/loaders/pageloader";
import { Disclosure } from "@headlessui/react";
import { ButtonBase } from "@mui/material";
import Radio from "@/components/ui/Radio";
const validationSchema = yup.object({
  firstName: yup.string().required("Ce champ est obligatoire"),
  lastName: yup.string().required("Ce champ est obligatoire"),
  location: yup.string().required("Ce champ est obligatoire"),
  email: yup
    .string()
    .email("Email invalide")
    .required("Ce champ est obligatoire"),
  phoneNumber: yup.string().required("Ce champ est obligatoire"),
  nationality: yup.string().required("Ce champ est obligatoire"),
  socialSecurityNumber: yup.string().required("Ce champ est obligatoire"),
  dateOfBirth: yup.string().required("Ce champ est obligatoire"),
  rib: yup.string().required("Ce champ est obligatoire"),

  firstNameClient: yup.string().required("Ce champ est obligatoire"),
  lastNameClient: yup.string().required("Ce champ est obligatoire"),

  phoneNumberClient: yup.string().required("Ce champ est obligatoire"),
  emailClient: yup
    .string()
    .email("Email invalide")
    .required("Ce champ est obligatoire"),


  // Client
  company: yup.string().required("Ce champ est obligatoire"),



  position: yup.string().required("Ce champ est obligatoire"),
  // Mission
  metier: yup.string().required("Ce champ est obligatoire"),
  secteur: yup.string().required("Ce champ est obligatoire"),
  client: yup.string().required("Ce champ est obligatoire"),
  simulation: yup.string().required("Ce champ est obligatoire"),
  tjm: yup.number().required("Ce champ est obligatoire"),
  debut: yup.string().required("Ce champ est obligatoire"),
  fin: yup.string().required("Ce champ est obligatoire"),


});
const   UpdateMissionClientInfo = ({ refresh,preregistration }) => {
  const [error, setError] = useState(null);
  const [CINerror, setCINError] = useState(null);
  const [RIBError, setRIBError] = useState(null);
  const [activeModal, setActiveModal] = useState(false);
  const [simulationFile, setSimulationFile] = useState(null);
  const [CINFILE, setCINFILE] = useState(null);
  const [RIBfile, setRIBfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [screen, setscreen] = useState("errors")
  console.log("absbjhkdjgiugisdugsmi :", preregistration?.status  )
console.log("Modal //////////////////",preregistration)
  const onClose = () => {
    setActiveModal(false);
  };
  const onOpen = () => {
    setActiveModal(true);
  };
  //*handle changeFile state
  const handleSimulationFileChange = (e) => {
    setError(null);
    setSimulationFile(e.target.files[0]);
  };
  const [value, setValue] = useState("non");
  const handleChange = (e) => {
    setValue(e.target.value);
};
  const handleCINFileChange = (e) => {
    setCINError(null);
    setCINFILE(e.target.files[0]);
  };
  const handleRIBFileChange = (e) => {
    setRIBError(null);
    setRIBfile(e.target.files[0]);
  };
  const [Permiserror, setPermisError] = useState(null);
  const [Permisfile, setPermisfile] = useState(null);
  const handlePERMISFileChange = (e) => {
    setPermisError(null);
    setPermisfile(e.target.files[0]);
  };

  //*validate file input
  const validateFileInput = () => {
    console.log("**********************************************************************************")
    if (!CINFILE) {
      setCINError("Ce champ est obligatoire");
      return false;
    }
    if (!RIBfile) {
      setRIBError("Ce champ est obligatoire");
      return false;
    }
    if (value === "oui" && !Permisfile) {
      setPermisError("Ce champ est obligatoire");
      return false;
    }
    if (!simulationFile) {
      setError("Ce champ est obligatoire");
      return false;
    }

    return true;
  };
  //*form handling
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      location: "",
      email: "",
      phoneNumber: "",
      nationality: "",
      socialSecurityNumber: "",
      rib:"",
      dateOfBirth: "",

       // Client
       firstNameClient: "",
       lastNameClient: "",
       emailClient: "",
       phoneNumberClient: "",
      company: "",
      position:"",

      // Mission
      metier: "",//
      secteur: "",//
      client: "",//
      simulation: "",//
      tjm: "",//
      debut: "",//
      fin: ""//
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {

      if (validateFileInput()) {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        formData.append("location", values.location);
        formData.append("email", values.email);
        formData.append("phoneNumber", values.phoneNumber);
        formData.append("nationality", values.nationality);
        formData.append("socialSecurityNumber", values.socialSecurityNumber);
        formData.append("ribDocument", RIBfile);
        formData.append("identificationDocument", CINFILE);
        if (value === "oui") {
          formData.append("carInfo", Permisfile);
        }

         // Client
        formData.append("company", values.company);
        formData.append("firstNameClient", values.firstNameClient);
        formData.append("lastNameClient", values.lastNameClient);
        formData.append("emailClient", values.emailClient);
        formData.append("phoneNumberClient", values.phoneNumberClient);

        // Mission
        formData.append("metier", values.metier);
        formData.append("secteur", values.secteur);
        formData.append("client", values.client);
        formData.append("simulation", values.simulation);
        formData.append("tjm", values.tjm);
        formData.append("debut", values.debut);
        formData.append("fin", values.fin);
        formData.append("simulationfile", simulationFile);

        missionService
        .UpdateInformationClientAndPersonalConsultantInfo(formData, preregistration?.userId?.preRegister?._id)
        .then((res) => {
          toast.success("Mission ajoutée avec succès");
          onClose();
          refresh();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
          // formik.resetForm();
        });
      }
    },
  });
  const COMMENTS_CLIENT = [
    {
      title: "Nom",
      validated: preregistration?.clientInfo?.clientContact?.firstName?.validated,
      causeNonValidation: preregistration?.clientInfo?.clientContact?.firstName?.causeNonValidation,
    },
    {
      title: "Prenom",
      validated: preregistration?.clientInfo?.clientContact?.lastName?.validated,
      causeNonValidation: preregistration?.clientInfo?.clientContact?.lastName?.causeNonValidation,
    },
    {
      title: "E-mail",
      validated: preregistration?.clientInfo?.clientContact?.email?.validated,
      causeNonValidation: preregistration?.clientInfo?.clientContact?.email?.causeNonValidation,
    },
    {
      title: "Tel",
      validated: preregistration?.clientInfo?.clientContact?.phoneNumber?.validated,
      causeNonValidation: preregistration?.clientInfo?.clientContact?.phoneNumber?.causeNonValidation,
    },


  ];
  const COMMENTS_MISSION = [
    {
      title: "Métier",
      validated: preregistration?.missionInfo?.profession?.validated,
      causeNonValidation: preregistration?.missionInfo?.profession?.causeNonValidation,
    },
    {
      title: "TJM",
      validated: preregistration?.missionInfo?.dailyRate?.validated,
      causeNonValidation: preregistration?.missionInfo?.dailyRate?.causeNonValidation,
    },
    {
      title: "Secteur d'activité",
      validated: preregistration?.missionInfo?.industrySector?.validated,
      causeNonValidation: preregistration?.missionInfo?.industrySector?.causeNonValidation,
    },
    {
      title: "Client final : ",
      validated: preregistration?.missionInfo?.finalClient?.validated,
      causeNonValidation: preregistration?.missionInfo?.finalClient?.causeNonValidation,
    },
    {
      title: "Date de début :  ",
      validated: preregistration?.missionInfo?.startDate?.validated,
      causeNonValidation: preregistration?.missionInfo?.startDate?.causeNonValidation,
    },
    {
      title: "Date de fin de mission : ",
      validated: preregistration?.missionInfo?.endDate?.validated,
      causeNonValidation: preregistration?.missionInfo?.endDate?.causeNonValidation,
    },
    {
      title: "Simulation :",
      validated: preregistration?.missionInfo?.isSimulationValidated?.validated,
      causeNonValidation: preregistration?.missionInfo?.isSimulationValidated?.causeNonValidation,
    },

  ];
  const COMMENT_CONSULTANT = [
    {
      title: "Nom",
      validated: preregistration?.userId?.preRegister?.personalInfo?.firstName?.validated,
      causeNonValidation: preregistration?.userId?.preRegister?.personalInfo?.firstName?.causeNonValidation,
    },
    {
      title: "Prenom",
      validated: preregistration?.userId?.preRegister?.personalInfo?.lastName?.validated,
      causeNonValidation: preregistration?.userId?.preRegister?.personalInfo?.lastName?.causeNonValidation,
    },
    {
      title: "Car info ",
      validated: preregistration?.userId?.preRegister?.personalInfo?.carInfo?.drivingLicense?.validated,
      causeNonValidation: preregistration?.userId?.preRegister?.personalInfo?.carInfo?.drivingLicense?.causeNonValidation,
    },
    {
      title: "Date de naissance",
      validated: preregistration?.userId?.preRegister?.personalInfo?.dateOfBirth?.validated,
      causeNonValidation: preregistration?.userId?.preRegister?.personalInfo?.dateOfBirth?.causeNonValidation,
    },
    {
      title: "E-mail",
      validated: preregistration?.userId?.preRegister?.personalInfo?.email?.validated,
      causeNonValidation: preregistration?.userId?.preRegister?.personalInfo?.email?.causeNonValidation,
    },
    {
      title: "CIN",
      validated: preregistration?.userId?.preRegister?.personalInfo?.identificationDocument?.validated,
      causeNonValidation: preregistration?.userId?.preRegister?.personalInfo?.identificationDocument?.causeNonValidation,
    },
    {
      title: "Location",
      validated: preregistration?.userId?.preRegister?.personalInfo?.location?.validated,
      causeNonValidation: preregistration?.userId?.preRegister?.personalInfo?.location?.causeNonValidation,
    },
    {
      title: "Nationalité",
      validated: preregistration?.userId?.preRegister?.personalInfo?.nationality?.validated,
      causeNonValidation: preregistration?.userId?.preRegister?.personalInfo?.nationality?.causeNonValidation,
    },
    {
      title: "Tel",
      validated: preregistration?.userId?.preRegister?.personalInfo?.phoneNumber?.validated,
      causeNonValidation: preregistration?.userId?.preRegister?.personalInfo?.phoneNumber?.causeNonValidation,
    },
    {
      title: "Rib",
      validated: preregistration?.userId?.preRegister?.personalInfo?.rib?.validated,
      causeNonValidation: preregistration?.userId?.preRegister?.personalInfo?.rib?.causeNonValidation,
    },
    {
      title: "Rib document",
      validated: preregistration?.userId?.preRegister?.personalInfo?.ribDocument?.validated,
      causeNonValidation: preregistration?.userId?.preRegister?.personalInfo?.ribDocument?.causeNonValidation,
    },
    {
      title: "Numéro de sécurité sociale",
      validated: preregistration?.userId?.preRegister?.personalInfo?.socialSecurityNumber?.validated,
      causeNonValidation: preregistration?.userId?.preRegister?.personalInfo?.socialSecurityNumber?.causeNonValidation,
    }


  ]
  return (
    <div>
      {isLoading && <PageLoader />}
      <ToastContainer />
      {/* <Button
        text="Déclarer une nouvelle mission"
        className=" bg-black-500 text-white text-[14px] font-semibold  h-[35px] flex items-center justify-center rounded-[10px]"
        onClick={onOpen}
      /> */}
       <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button
           onClick={onOpen}
           className={`
          ${
            (preregistration?.userId?.preRegister?.validationRH == "PENDING"
             && preregistration?.status =="PENDING") ? "bg-slate-400" :
              (preregistration?.userId?.preRegister?.validationRH == "VALIDATED"
              && (preregistration?.status =="WAITINGCONTRACT" || preregistration?.status =="VALID" || preregistration?.status =="COMPLETED")) ? "bg-[#128200]" : "bg-[#BC0000]"
          }
          // bg-[#128200]

           bg-opacity-[23%] rounded-t-md flex justify-between cursor-pointer transition duration-150 font-medium w-full text-start text-base text-[#1E1E1E] px-8 py-4`}>
            <span>
              1
              <span className="font-semibold text-xs text-[#1E1E1E]">
                - Validation RH
              </span>
            </span>
            <span
              className={` ${
                open && "rotate-180 transform"
              }  transition-all duration-150 text-xl`}
            >
              {/* <Icon icon="heroicons:chevron-down-solid" /> */}
            </span>
          </Disclosure.Button>
        </>
      )}
    </Disclosure>
      <Modal
        title="Update Info"
        labelclassName="btn-outline-dark"
        activeModal={activeModal && (preregistration?.userId?.preRegister?.validationRH=="NOTVALIDATED" || preregistration?.status =="REJECTED")}
        onClose={onClose}
      >
      {/* <ButtonBase
        className="btn btn-outline-dark  text-center rounded-xl"
        onClick={()=>setscreen('update')}
      >
        Déclarer une nouvelle mission
      </ButtonBase> */}

          <Button
        text={screen =="errors"? "Ajouter info": "Les remarques de la RH"}
        className=" bg-black-500 text-white text-[14px] font-semibold  h-[35px] flex items-center justify-center rounded-[10px]"
        onClick={()=>setscreen(screen =="errors"? 'update' : "errors")}
      />
      {
        screen =="errors" ?

        (
          <div>

        <h1 className="text-lg font-bold bg-[#f7f5ef] px-4 py-2 mb-2 mt-6 rounded-xl inline-block">
        Remarques de la RH sur les informations personnelles
           :



         { COMMENT_CONSULTANT.map(item=>(

            !item.validated&& <ErrorAlert text={item.causeNonValidation} title={item.title} />
          ))
}
          </h1>
 <h1 className="text-lg font-bold bg-[#f7f5ef] px-4 py-2 mb-2 mt-6 rounded-xl inline-block">
        Remarques de la RH sur les informations du client
           :

         { COMMENTS_CLIENT.map(item=>(

!item.validated&& <ErrorAlert text={item.causeNonValidation} title={item.title} />
))
}
        </h1>
        <h1 className="text-lg font-bold bg-[#f7f5ef] px-4 py-2 mb-2 mt-6 rounded-xl inline-block">
        Remarques de la RH sur les informations du Mission
           :

         { COMMENTS_MISSION.map(item=>(

!item.validated&& <ErrorAlert text={item.causeNonValidation} title={item.title} />
))
}
        </h1>
          </div>
        )

      :

        <form onSubmit={formik.handleSubmit} dir="ltr">
          <p className="text-lg font-bold bg-[#f7f5ef] px-4 py-2 mb-2 rounded-xl inline-block">
            Info du client:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Nom</label>
              <Textinput
                id="firstNameClient"
                name="firstNameClient"
                placeholder="Nom"
                value={formik.values.firstNameClient}
                onChange={formik.handleChange}
                defaultValue={preregistration?.userId?.preRegister?.clientInfo?.clientContact?.firstNameClient?.value}
                error={
                  formik.touched.firstNameClient && Boolean(formik.errors.firstNameClient)
                }
                helperText={formik.touched.firstNameClient && formik.errors.firstNameClient}
              />
            </div>
            <div>
              <label className="form-label">Prenom</label>
              <Textinput
                id="lastNameClient"
                name="lastNameClient"


                placeholder="Prenom"
                value={formik.values.lastNameClient}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastNameClient && Boolean(formik.errors.lastNameClient)
                }
                helperText={formik.touched.lastNameClient && formik.errors.lastNameClient}
              />
            </div>
            <div>
              <label className="form-label">Poste</label>
              <Textinput
                id="position"
                name="position"


                placeholder="Poste"
                value={formik.values.position}
                onChange={formik.handleChange}
                error={
                  formik.touched.position && Boolean(formik.errors.position)
                }
                helperText={formik.touched.position && formik.errors.position}
              />
            </div>
            <div>
              <label className="form-label">Email</label>
              <Textinput
                id="emailClient"
                name="emailClient"
                placeholder="emailClient"
                value={formik.values.emailClient}
                onChange={formik.handleChange}
                error={formik.touched.emailClient && Boolean(formik.errors.emailClient)}
                helperText={formik.touched.emailClient && formik.errors.emailClient}
              />
            </div>
            <div>
              <label className="form-label">Téléphone</label>
              <Textinput
                id="phoneNumberClient"
                name="phoneNumberClient"
                placeholder="Téléphone"
                value={formik.values.phoneNumberClient}
                onChange={formik.handleChange}
                error={
                  formik.touched.phoneNumberClient &&
                  Boolean(formik.errors.phoneNumberClient)
                }
                helperText={
                  formik.touched.phoneNumberClient && formik.errors.phoneNumberClient
                }
              />
            </div>
            <div>
              <label className="form-label">Entreprise</label>
              <Textinput
                id="company"
                name="company"
                placeholder="Entreprise"
                value={formik.values.company}
                onChange={formik.handleChange}
                error={formik.touched.company && Boolean(formik.errors.company)}
                helperText={formik.touched.company && formik.errors.company}
              />
            </div>
          </div>
          <p className="text-lg font-bold bg-[#f7f5ef] px-4 py-2 mb-2 mt-6 rounded-xl inline-block">
            Info Perso:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Nom</label>
              <Textinput
                id="firstName"
                name="firstName"
                placeholder="Nom"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                defaultValue={preregistration?.userId?.preRegister?.clientInfo?.clientContact?.firstName?.value}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </div>
            <div>
              <label className="form-label">Prenom</label>
              <Textinput
                id="lastName"
                name="lastName"
                defaultValue={preregistration?.userId?.preRegister?.clientInfo?.lastName?.value}

                placeholder="Prenom"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </div>
            <div>
              <label className="form-label">Lieu</label>
              <Textinput
                id="location"
                name="location"


                placeholder="Lieu"
                value={formik.values.location}
                onChange={formik.handleChange}
                error={
                  formik.touched.location && Boolean(formik.errors.location)
                }
                helperText={formik.touched.location && formik.errors.location}
              />
            </div>
            <div>
              <label className="form-label">Email</label>
              <Textinput
                id="email"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </div>
            <div>
              <label className="form-label">Téléphone</label>
              <Textinput
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Téléphone"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
            </div>
            <div>
              <label className="form-label">Nationalité</label>
              <Textinput
                id="nationality"
                name="nationality"
                placeholder="Nationalité"
                value={formik.values.nationality}
                onChange={formik.handleChange}
                error={formik.touched.nationality && Boolean(formik.errors.nationality)}
                helperText={formik.touched.nationality && formik.errors.nationality}
              />
            </div>
            <div>
              <label className="form-label">Num de sécurité sociale / AVS</label>
              <Textinput
                id="socialSecurityNumber"
                name="socialSecurityNumber"
                placeholder="Num de sécurité sociale / AVS"
                value={formik.values.socialSecurityNumber}
                onChange={formik.handleChange}
                error={formik.touched.socialSecurityNumber && Boolean(formik.errors.socialSecurityNumber)}
                helperText={formik.touched.socialSecurityNumber && formik.errors.socialSecurityNumber}
              />
            </div>
            <div>
              <label className="form-label">Date de naissance</label>
              <Textinput
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                placeholder="Date de naissance "
                value={formik.values.dateOfBirth}
                onChange={formik.handleChange}
                error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
              />
            </div>
            <div>
              <label className="form-label">RIB </label>
              <Textinput
                id="rib"
                name="rib"
                placeholder="RIB "
                value={formik.values.rib}
                onChange={formik.handleChange}
                error={formik.touched.rib && Boolean(formik.errors.rib)}
                helperText={formik.touched.rib && formik.errors.rib}
              />
            </div>

            <div>
              <label className="form-label">RIB Document : </label>
              <Fileinput
                name="ribDocument"
                label="choisir un fichier"
                placeholder="RIB Document "
                selectedFile={RIBfile}
                className={`pl-3 ${!!RIBError && "border-2 border-danger-500"} `}
                onChange={handleRIBFileChange}
              />
              {!!RIBError && (
                <p className="text-danger-500 text-sm mt-2">{RIBError}</p>
              )}
            </div>
            <div>
              <label className="form-label">Pièce d'identité</label>
              <Fileinput
                name="identificationDocument"
                label="choisir un fichier"
                placeholder="Pièce d'identité"
                selectedFile={CINFILE}
                className={`pl-3 ${!!CINerror && "border-2 border-danger-500"} `}
                onChange={handleCINFileChange}
              />
              {!!CINerror && (
                <p className="text-danger-500 text-sm mt-2">{CINerror}</p>
              )}
            </div>
            <div>
              <label className="form-label">Possédez-vous une voiture ?</label>
              <Radio
                    label="Oui"
                    name="x"
                    value="oui"
                    checked={value === "oui"}
                    onChange={handleChange}
                />
                <Radio
                    label="Non"
                    name="x"
                    value="non"
                    checked={value === "non"}
                    onChange={handleChange}
                />
            </div>
            {
                value === "oui" ? (
                  <div>

                  <label className="form-label">Permis de conduire: </label>
              <Fileinput
                name="permis"
                label="choisir un fichier"
                placeholder="permis Document "
                selectedFile={Permisfile}
                className={`pl-3 ${!!Permiserror && "border-2 border-danger-500"} `}
                onChange={handlePERMISFileChange}
              />
              {!!Permiserror && (
                <p className="text-danger-500 text-sm mt-2">{Permiserror}</p>
              )}
                  </div>

                ) : null
            }
          </div>
          <p className="text-lg font-bold bg-[#f7f5ef] px-4 py-2 mb-2 mt-6 rounded-xl inline-block">
            Info du mission:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Metier</label>
              <Textinput
                id="metier"
                name="metier"
                placeholder="metier"
                value={formik.values.metier}
                onChange={formik.handleChange}
                error={formik.touched.metier && Boolean(formik.errors.metier)}
                helperText={formik.touched.metier && formik.errors.metier}
              />
            </div>
            <div>
              <label className="form-label">Secteur d'activité</label>
              <Textinput
                id="secteur"
                name="secteur"
                placeholder="secteur d'activité"
                value={formik.values.secteur}
                onChange={formik.handleChange}
                error={formik.touched.secteur && Boolean(formik.errors.secteur)}
                helperText={formik.touched.secteur && formik.errors.secteur}
              />
            </div>
            <div>
              <label className="form-label">Client final</label>
              <Textinput
                id="client"
                name="client"
                placeholder="client final"
                value={formik.values.client}
                onChange={formik.handleChange}
                error={formik.touched.client && Boolean(formik.errors.client)}
                helperText={formik.touched.client && formik.errors.client}
              />
            </div>
            <div>
              <label className="form-label">Simulation</label>
              <Textinput
                id="simulation"
                name="simulation"
                placeholder="simulation"
                value={formik.values.simulation}
                onChange={formik.handleChange}
                error={
                  formik.touched.simulation && Boolean(formik.errors.simulation)
                }
                helperText={
                  formik.touched.simulation && formik.errors.simulation
                }
              />
            </div>
            <div>
              <label className="form-label">TJM</label>
              <Textinput
                id="tjm"
                name="tjm"
                placeholder="tjm"
                type="number"
                value={formik.values.tjm}
                onChange={formik.handleChange}
                error={formik.touched.tjm && Boolean(formik.errors.tjm)}
                helperText={formik.touched.tjm && formik.errors.tjm}
              />
            </div>
            <div>
              <label className="form-label">Date debut</label>
              <Textinput
                id="debut"
                name="debut"
                placeholder="date debut"
                type="date"
                value={formik.values.debut}
                onChange={formik.handleChange}
                error={formik.touched.debut && Boolean(formik.errors.debut)}
                helperText={formik.touched.debut && formik.errors.debut}
              />
            </div>
            <div>
              <label className="form-label">Date fin</label>
              <Textinput
                id="fin"
                name="fin"
                placeholder="date fin"
                type="date"
                value={formik.values.fin}
                onChange={formik.handleChange}
                error={formik.touched.fin && Boolean(formik.errors.fin)}
                helperText={formik.touched.fin && formik.errors.fin}
              />
            </div>
            <div>
              <label className="form-label">fichier Simulation</label>
              <Fileinput
                name="simulationfile"
                label="choisir un fichier"
                placeholder="Simulation"
                selectedFile={simulationFile}
                className={`pl-3 ${!!error && "border-2 border-danger-500"} `}
                onChange={handleSimulationFileChange}
              />
              {!!error && (
                <p className="text-danger-500 text-sm mt-2">{error}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end mt-4">
            <button
              className="btn btn-dark  text-center rounded-xl"
              type="submit"
            >
              Enregistrer
            </button>
          </div>
        </form>
      }
      </Modal>
    </div>
  );
};

export default UpdateMissionClientInfo;
