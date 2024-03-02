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
import ButtonLoader from "@/components/ui/loaders/buttonLoader";
import { adminServices } from "@/_services/admin.service";

const validationSchema = yup.object({
  firstName: yup.string().required("Ce champ est obligatoire"),
  lastName: yup.string().required("Ce champ est obligatoire"),
  email: yup
    .string()
    .email("Email invalide")
    .required("Ce champ est obligatoire"),
  phoneNumber: yup.string().required("Ce champ est obligatoire"),

});
const   AddNewRh = ({ refresh }) => {
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



  //*form handling
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {

console.log("jkjbjhblhbli")

        setIsLoading(true);
        const formData = new FormData();
        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);

        formData.append("email", values.email);
        formData.append("phoneNumber", values.phoneNumber);

        adminServices.AddNewRh(formData)
        .then((res) => {
          toast.success("Compte RH ajoutée avec succès");
          onClose();
          refresh();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
          formik.resetForm();
          setSimulationFile(null);
        });

      }

  });

  return (
    <div>
      <ToastContainer />
      <Button
        text="Ajouter un membre RH"
        className=" bg-black-500 text-white text-[14px] font-semibold  h-[35px] flex items-center justify-center rounded-[10px]"
        onClick={onOpen}
      />
      <Modal
        title="Nouvelle membre"
        labelclassName="btn-outline-dark"
        activeModal={activeModal}
        onClose={onClose}
      >
        <form onSubmit={formik.handleSubmit} dir="ltr">
          <p className="text-lg font-bold bg-[#f7f5ef] px-4 py-2 mb-2 rounded-xl inline-block">
            Info :
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

          </div>


          <div className="flex items-center justify-end mt-4">
            <button
              className="btn btn-dark  text-center rounded-xl"

              disabled={isLoading}
            >
              {isLoading ? <ButtonLoader /> : "Enregistrer"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddNewRh;
