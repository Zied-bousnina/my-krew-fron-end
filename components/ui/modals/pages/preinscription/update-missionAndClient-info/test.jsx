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
  dateOfBirth: yup.string().required("Ce champ est obligatoire"),

  // Client
  company: yup.string().required("Ce champ est obligatoire"),
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
      company: "",
      metier: "",
      secteur: "",
      client: "",
      simulation: "",
      tjm: "",
      debut: "",
      fin: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (new Date(values.debut) > new Date(values.fin)) {
        toast.error("La date de début doit être inférieure à la date de fin");
        return;
      }
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

         // Client
        formData.append("company", values.company);
        formData.append("metier", values.metier);
        formData.append("secteur", values.secteur);
        formData.append("client", values.client);
        formData.append("simulation", values.simulation);
        formData.append("tjm", values.tjm);
        formData.append("debut", values.debut);
        formData.append("fin", values.fin);
        formData.append("simulationfile", simulationFile);

        missionService
          .createMission(formData)
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
            formik.resetForm();
          });
      }
    },
  });

  const COMMENTS_CLIENT = [
    {
      title: "Nom",
      validated: preregistration?.clientInfo?.clientContact?.validated,
      causeNonValidation: preregistration?.clientInfo?.clientContact?.causeNonValidation,
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
  const COMMENT_CONSULTANT = [
    {
      title: "Nom",
      validated: preregistration?.personalInfo?.firstName?.validated,
      causeNonValidation: preregistration?.personalInfo?.firstName?.causeNonValidation,
    },
    {
      title: "Prenom",
      validated: preregistration?.personalInfo?.lastName?.validated,
      causeNonValidation: preregistration?.personalInfo?.lastName?.causeNonValidation,
    },
    {
      title: "Car info ",
      validated: preregistration?.personalInfo?.carInfo?.drivingLicense?.validated,
      causeNonValidation: preregistration?.personalInfo?.carInfo?.drivingLicense?.causeNonValidation,
    },
    {
      title: "Date de naissance",
      validated: preregistration?.personalInfo?.dateOfBirth?.validated,
      causeNonValidation: preregistration?.personalInfo?.dateOfBirth?.causeNonValidation,
    },
    {
      title: "E-mail",
      validated: preregistration?.personalInfo?.email?.validated,
      causeNonValidation: preregistration?.personalInfo?.email?.causeNonValidation,
    },
    {
      title: "CIN",
      validated: preregistration?.personalInfo?.identificationDocument?.validated,
      causeNonValidation: preregistration?.personalInfo?.identificationDocument?.causeNonValidation,
    },
    {
      title: "Location",
      validated: preregistration?.personalInfo?.location?.validated,
      causeNonValidation: preregistration?.personalInfo?.location?.causeNonValidation,
    },
    {
      title: "Nationalité",
      validated: preregistration?.personalInfo?.nationality?.validated,
      causeNonValidation: preregistration?.personalInfo?.nationality?.causeNonValidation,
    },
    {
      title: "Tel",
      validated: preregistration?.personalInfo?.phoneNumber?.validated,
      causeNonValidation: preregistration?.personalInfo?.phoneNumber?.causeNonValidation,
    },
    {
      title: "Rib",
      validated: preregistration?.personalInfo?.rib?.validated,
      causeNonValidation: preregistration?.personalInfo?.rib?.causeNonValidation,
    },
    {
      title: "Rib document",
      validated: preregistration?.personalInfo?.ribDocument?.validated,
      causeNonValidation: preregistration?.personalInfo?.ribDocument?.causeNonValidation,
    },
    {
      title: "Numéro de sécurité sociale",
      validated: preregistration?.personalInfo?.socialSecurityNumber?.validated,
      causeNonValidation: preregistration?.personalInfo?.socialSecurityNumber?.causeNonValidation,
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
            preregistration?.validationRH == "PENDING" ? "bg-slate-400" : preregistration?.validationRH == "VALIDATED" ? "bg-[#128200]" : "bg-[#BC0000]"
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
        activeModal={activeModal && preregistration?.validationRH=="NOTVALIDATED"}
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
                id="firstName"
                name="firstName"
                placeholder="Nom"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                defaultValue={preregistration?.clientInfo?.clientContact?.firstName?.value}
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
                defaultValue={preregistration?.clientInfo?.lastName?.value}

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
              <label className="form-label">Nom</label>
              <Textinput
                id="firstName"
                name="firstName"
                placeholder="Nom"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                defaultValue={preregistration?.clientInfo?.clientContact?.firstName?.value}
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
                defaultValue={preregistration?.clientInfo?.lastName?.value}

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
