import React, { useState } from "react";
// import { toast } from "react-toastify";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Checkbox from "@/components/ui/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { handleRegister, handleRegistretionStep2 } from "./store";
import Fileinput from "@/components/ui/Fileinput";
import Radio from "@/components/ui/Radio";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

const schema = yup
  .object({
    avs: yup.string().required("avs is Required"),


    rib: yup.string().required("rib is Required"),



  })
  .required();

const RegForm2 = ({id}) => {
  const [value, setValue] = useState("non");
  const  {isLoading}  = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setValue(e.target.value);
  };


  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    // enqueueSnackbar('This is a success message!', { variant });
  };
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
    if(value === "oui" && data.permis == "") {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    if(data.cin == "" || data.avs == "" || data.passport == "" || data.rib == "") {
      handleClickVariant('error');
      toast.error("Veuillez remplir tous les champs");

      return;
    }
    const formdata = new FormData();
  // Add non-file data to FormData
  Object.keys(data).forEach((key) => {
    formdata.append(key, data[key]);
});

// Add file data to FormData
console.log(form)
Object.keys(form).forEach((key) => {
    if (Array.isArray(form[key])) {
        form[key].forEach((file) => {
            formdata.append(key, file);
        });
    } else {
        formdata.append(key, form[key]);
    }
});
    console.log(formdata, "formdata")

    const data2 = {
      ...data,
      permis: form.permis,
      passport: form.passport,
      cin: form.cin,


    }
    dispatch(handleRegistretionStep2({...data2, id}))
    .then((res) => {
      console.log(res);
      if(res.type=="auth/handleRegistretionStep2/fulfilled"){
        router.push(`/registerPage4/${id}`);
      }
    })
    .catch((err) => {
      // toast.error("Something went wrong");
    }
    );
    //
    console.log("regis", data2)
    // router.push(`/registerPage3/${id}`);
    // setTimeout(() => {
    //   router.push("/");
    // }, 1500);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
    <ToastContainer/>
      <Textinput
        name="avs"
        // label="Prénom"
        type="text"
        placeholder="Numéro de sécurité sociale / AVS"
        register={register}
        error={errors.avs}
        style={{

        }}
      />{" "}
      <Fileinput
        name="cin"
        label="choisir un fichier"
        onChange={onChangeHandlerFile}
        type="text"
        placeholder="Pièce d’identité ( CNI )"
        register={register}
        error={errors.cin}
        value={
          form.cin?.name
        }
      />{" "}
        <Fileinput
        name="passport"
value={form.passport}
        label="choisir un fichier"
        onChange={onChangeHandlerFile}
        type="text"
        placeholder="Passeport"
        register={register}
        error={errors.passport}
      />{" "}
      <Textinput
        name="rib"

        // label="Prénom"
        type="text"
        placeholder="RIB"
        register={register}
        // error={errors.rib}
      />{" "}
       <Fileinput
        name="ribDocument"
value={form.ribDocument}
        label="choisir un fichier"
        onChange={onChangeHandlerFile}
        type="text"
        placeholder="RIB document"
        register={register}
        error={errors.ribDocument}
      />{" "}
  <div className="text-[#76736E] text-base pt-5">
  Possédez-vous une voiture ?
                </div>

        <div className="flex flex-wrap space-xy-5">
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
            <Fileinput
        name="permis"
        label="choisir un fichier"
        onChange={onChangeHandlerFile}
        type="text"
        placeholder="Permis de conduire"
        register={register}
        error={errors.passport}
      />{" "}
            </div>
          ) : null
        }










{/* <div className="flex justify-end m-5"> */}
<div className="flex justify-end">
<Link
                    href={`/register`}
                    className="text-slate-900 dark:text-white font-medium hover:underline"
                  >
    <button
      type="button"

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
    >
    {
  isLoading ?
  <div role="status">
    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>
:
      "Suivant"
}

    </button>
  </div>

    </form>
  );
};

export default RegForm2;
