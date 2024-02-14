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
import {useFormik} from "formik";
import AuthService from "@/_services/auth.service";
import {authActions} from "@/store/auth/authSlice";
const schema = yup
  .object({
    firstName: yup.string().required("Name is Required"),
    lastName: yup.string().required("Last Name is Required"),
    email: yup.string().email().required("Email is Required"),
    phoneNumber: yup.string().required("Num is Required"),
    company: yup.string().required("Societe is Required"),
    position: yup.string().required("Poste is Required"),


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
    const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

    const formik = useFormik({
        initialValues: {
          email: "",
          phoneNumber: "",
          company: "",
          position: "",
          firstName: "",
          lastName: "",

        },
        validationSchema: schema,
        onSubmit: (values) => {
            setIsLoading(true);
            AuthService.Register3(values)
                .then((res) => {


                    toast.success("Next step ", {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    router.push(`/registerPage4`)
                })
                .catch((err) => console.log(err))
                .finally(() => {
                    setIsLoading(false);
                });
        },
    });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5 ">
      <Textinput
          id={"lastName"}
        name="lastName"
        // label="Prénom"
        type="text"
        placeholder="Prénom"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
      />{" "}
      <Textinput
          id={"firstName"}
        name="v"
        // label="Prénom"
        type="text"
        placeholder="NOM"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
      />{" "}
      <Textinput
          id={"email"}
        name="email"
        // label="Prénom"
        type="text"
        placeholder="Adresse e-email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />{" "}
        <Textinput
            id={"phoneNumber"}
        name="phoneNumber"
        // label="Prénom"
        type="text"
        placeholder="Numéro de téléphone"
        value={formik.values.phoneNumber}
        onChange={formik.handleChange}
        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
      />{" "}
       <Textinput
           id={"company"}
        name="company"
        // label="Prénom"
        type="text"
        placeholder="Societé"
        value={formik.values.company}
        onChange={formik.handleChange}
        error={formik.touched.company && Boolean(formik.errors.company)}
        helperText={formik.touched.company && formik.errors.company}
      />{" "}
       <Textinput
           id={"position"}
        name="position"
        // label="Prénom"
        type="text"
        placeholder="Poste du contact"
        value={formik.values.position}
        onChange={formik.handleChange}
        error={formik.touched.position && Boolean(formik.errors.position)}
        helperText={formik.touched.position && formik.errors.position}
      />{" "}



{/* <div className="flex justify-end m-5"> */}
<div className="flex justify-end">
<Link
                    href={`/registerpage2`}
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
    >  {isLoading ? (
        <div role="status">
            <svg
                aria-hidden="true"
                class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                />
            </svg>
            <span class="sr-only">Loading...</span>
        </div>
    ) : (
        "Suivant"
    )}

    </button>
  </div>

    </form>
  );
};

export default RegForm3;
