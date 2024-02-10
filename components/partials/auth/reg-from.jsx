import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Checkbox from "@/components/ui/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { handleRegister, handleRegistretionStep1 } from "./store";
import Flatpickr from "react-flatpickr";
// import { useRouter } from "next/navigation";
const schema = yup
  .object({
    firstName: yup.string().required("Name is Required"),
    lastName: yup.string().required("Last Name is Required"),
    email: yup.string().email().required("Email is Required"),
    phoneNumber: yup.string().required("Num is Required"),
    // dateNais: yup.string().required("DateNais is Required"),
    location: yup.string().required("LieuNais is Required"),
    nationality: yup.string().required("Nationalite is Required"),


  })
  .required();

const RegForm = ({id}) => {


  const [picker, setPicker] = useState(new Date());
  const dispatch = useDispatch();
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  // const router = useRouter();

  const onSubmit = (data) => {
    dispatch(handleRegistretionStep1({...data,id}))
    .then((res) => {
      console.log(res);
      if(res.type=="auth/handleRegistretionStep1/fulfilled"){
        router.push(`/registerpage2/${id}`);
      }
    })
    .catch((err) => {
      // toast.error("Something went wrong");
    }
    );

    console.log(data);
    if(data?.dateOfBirth == ""){
      toast.error("Date de naissance est obligatoire");
      return;
    }
    console.log(data)
    // router.push("/registerpage2/5");
    // setTimeout(() => {
    //   router.push("/");
    // }, 1500);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
    <ToastContainer/>
      <Textinput
        name="lastName"
        // label="Prénom"
        type="text"
        placeholder="Prénom"
        register={register}
        error={errors.lastName}
      />{" "}
      <Textinput
        name="firstName"
        // label="Prénom"
        type="text"
        placeholder="NOM"
        register={register}
        error={errors.firstName}
      />{" "}
      <Textinput
        name="email"
        // label="Prénom"
        type="text"
        placeholder="Adresse e-mail"
        register={register}
        error={errors.email}
      />{" "}
        <Textinput
        name="phoneNumber"
        // label="Prénom"
        type="text"
        placeholder="Numéro de téléphone"
        register={register}
        error={errors.phoneNumber}
      />{" "}
        <Textinput
        name="dateOfBirth"
        // label="Prénom"
        type="date"
        placeholder="Date de naissance"
        register={register}
        // error={errors.dateNais}
      />{" "}

        <Textinput
        name="location"
        // label="Prénom"
        type="text"
        placeholder="Lieu de naissance"
        register={register}
        error={errors.location}
      />{" "}
        <Textinput
        name="nationality"
        // label="Prénom"
        type="text"
        placeholder="Nationalité"
        register={register}
        error={errors.nationality}
      />{" "}


{/* <div className="flex justify-end m-5"> */}
<div className="flex justify-end">
    <button
      type="button"
      disabled
      className="btn"
      style={{ backgroundColor: "#76736E", opacity: "0.55", marginRight: "8px",color: "white", }}
    >
      Retour
    </button>
    <button
      type="submit"
      className="btn"
      style={{ backgroundColor: "#1E1E1E",color: "white", }}
    >
      Suivant
    </button>
  </div>

    </form>
  );
};

export default RegForm;
