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

const validationSchema = yup.object({
  firstName: yup.string().required("Ce champ est obligatoire"),
  lastName: yup.string().required("Ce champ est obligatoire"),
  position: yup.string().required("Ce champ est obligatoire"),
  email: yup
    .string()
    .email("Email invalide")
    .required("Ce champ est obligatoire"),
  phoneNumber: yup.string().required("Ce champ est obligatoire"),
  company: yup.string().required("Ce champ est obligatoire"),
  metier: yup.string().required("Ce champ est obligatoire"),
  secteur: yup.string().required("Ce champ est obligatoire"),
  client: yup.string().required("Ce champ est obligatoire"),
  simulation: yup.string().required("Ce champ est obligatoire"),
  tjm: yup.number().required("Ce champ est obligatoire"),
  debut: yup.string().required("Ce champ est obligatoire"),
  fin: yup.string().required("Ce champ est obligatoire"),
});
const AddNewMission = ({}) => {
  const [error, setError] = useState(null);
  const [activeModal, setActiveModal] = useState(false);
  const [simulationFile, setSimulationFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
      position: "",
      email: "",
      phoneNumber: "",
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
        formData.append("position", values.position);
        formData.append("email", values.email);
        formData.append("phoneNumber", values.phoneNumber);
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

  return (
    <div>
        {isLoading && <PageLoader/>}
      <ToastContainer />
      <Button
        text="Déclarer une nouvelle mission"
        className=" bg-black-500 text-white text-[14px] font-semibold  h-[35px] flex items-center justify-center rounded-[10px]"
        onClick={onOpen}
      />
      <Modal
        title="Nouvelle mission"
        labelclassName="btn-outline-dark"
        activeModal={activeModal}
        onClose={onClose}
      >
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
            <button className="btn btn-dark  text-center rounded-xl" type="submit">
              Enregistrer
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddNewMission;
