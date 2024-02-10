import React, { useState } from "react";

import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Checkbox from "@/components/ui/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { handleRegister, handleRegistretionStep4 } from "./store";
import Link from "next/link";
import Fileinput from "@/components/ui/Fileinput";
import { ToastContainer, toast } from "react-toastify";
const schema = yup
  .object({
    metier: yup.string().required("Ce champ est obligatoire"),
    secteur: yup.string().required("Ce champ est obligatoire"),
    client: yup.string().required("Ce champ est obligatoire"),
    simulation: yup.string().required("Ce champ est obligatoire"),
    tjm: yup.string().required("Ce champ est obligatoire"),
    debut: yup.string().required("Ce champ est obligatoire"),
    fin: yup.string().required("Ce champ est obligatoire"),
    // simulationfile: yup.string().required("Ce champ est obligatoire"),


  })
  .required();

const RegForm4 = ({id}) => {
  const dispatch = useDispatch();
  const  {isLoading}  = useSelector((state) => state.auth);
  const [checked, setChecked] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit, 
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const [form, setForm] = useState({})
  const onChangeHandlerFile = (e) => {
    // const { name, files } = e.target;
    const { name, files } = e.target;

    setForm({
      ...form,
      [name]: files?.[0],
      // kbis: e.target.files[0]
    });
  };

  const router = useRouter();

  const onSubmit = (data) => {
    // dispatch(handleRegister(data));
    // setTimeout(() => {
    //   router.push("/");
    // }, 1500);
    if(form.simulationfile == undefined){
      toast.error("Veuillez choisir un fichier");
      return;
    }

    const data2 =  {
      ...data,
      simulationfile: form.simulationfile
    }
    dispatch(handleRegistretionStep4({...data2,id}))
    .then((res) => {
      console.log(res);
      if(res.type=="auth/handleRegistretionStep4/fulfilled"){
        router.push(`/pending/${id}`);
      }
    })
    .catch((err) => {
      // toast.error("Something went wrong");
    }
    );

    console.log(data2)
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
      <ToastContainer/>
      <Textinput
        name="metier"
        // label="Prénom"
        type="text"
        placeholder="Métier"
        register={register}
        error={errors.metier}
      />{" "}
      <Textinput
        name="secteur"
        // label="Prénom"
        type="text"
        placeholder="Secteur d'activité"
        register={register}
        error={errors.secteur}
      />{" "}
      <Textinput
        name="client"
        // label="Prénom"
        type="text"
        placeholder="client final"
        register={register}
        error={errors.client}
      />{" "}
        <Textinput
        name="simulation"
        // label="Prénom"
        type="text"
        placeholder="Simulation"
        register={register}
        error={errors.simulation}
      />{" "}
       <Textinput
        name="tjm"
        // label="Prénom"
        type="number"
        placeholder="TJM"
        register={register}
        error={errors.tjm}
      />{" "}
       <Textinput
        name="debut"
        // label="Prénom"
        type="date"
        placeholder="Date de début"
        register={register}
        error={errors.debut}
      />{" "}
      <Textinput
        name="fin"
        // label="Prénom"
        type="date"
        placeholder="Date de fin"
        register={register}
        error={errors.fin}
      />{" "}

<Fileinput
        name="simulationfile"
        label="choisir un fichier"

        type="text"
        placeholder="Simulation"
        register={register}
        error={errors.simulationfile}
        onChange={onChangeHandlerFile}
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
      disabled={isLoading}
      className="btn"
      style={{ backgroundColor: "#1E1E1E",color: "white", }}
    >{
     isLoading ?
  <div role="status">
    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>
:
      "Terminer"
}

    </button>
  </div>

    </form>
  );
};

export default RegForm4;
