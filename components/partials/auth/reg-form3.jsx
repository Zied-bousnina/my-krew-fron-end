import React, { useState } from "react";
import { toast } from "react-toastify";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Checkbox from "@/components/ui/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { handleRegister } from "./store";
import Link from "next/link";
const schema = yup
  .object({
    name: yup.string().required("Name is Required"),
    lastName: yup.string().required("Last Name is Required"),
    mail: yup.string().email().required("Email is Required"),
    num: yup.string().required("Num is Required"),
    societe: yup.string().required("Societe is Required"),
    poste: yup.string().required("Poste is Required"),


  })
  .required();

const RegForm3 = ({id}) => {
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const router = useRouter();

  const onSubmit = (data) => {
    // dispatch(handleRegister(data));

    // setTimeout(() => {
    //   router.push("/");
    // }, 1500);
    router.push(`/registerPage4/${id}`);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
      <Textinput
        name="lastName"
        // label="Prénom"
        type="text"
        placeholder="Prénom"
        register={register}
        error={errors.lastName}
      />{" "}
      <Textinput
        name="name"
        // label="Prénom"
        type="text"
        placeholder="NOM"
        register={register}
        error={errors.name}
      />{" "}
      <Textinput
        name="mail"
        // label="Prénom"
        type="text"
        placeholder="Adresse e-mail"
        register={register}
        error={errors.mail}
      />{" "}
        <Textinput
        name="num"
        // label="Prénom"
        type="text"
        placeholder="Numéro de téléphone"
        register={register}
        error={errors.num}
      />{" "}
       <Textinput
        name="societe"
        // label="Prénom"
        type="text"
        placeholder="Societé"
        register={register}
        error={errors.societe}
      />{" "}
       <Textinput
        name="poste"
        // label="Prénom"
        type="text"
        placeholder="Poste du contact"
        register={register}
        error={errors.poste}
      />{" "}



{/* <div className="flex justify-end m-5"> */}
<div className="flex justify-end">
<Link
                    href={`/registerpage2/${id}`}
                    className="text-slate-900 dark:text-white font-medium hover:underline"
                  >

    <button
      type="button"
    //   disabled
      className="btn"
      style={{ backgroundColor: "#1E1E1E", opacity: "0.55", marginRight: "8px",color: "white", }}
    >
      Retour
    </button>
                  </Link>
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

export default RegForm3;
