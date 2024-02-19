


import React, { useEffect, useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AuthService from "@/_services/auth.service";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { useSearchParams } from 'next/navigation'
const validationSchema = yup
  .object({
    password: yup.string().required("Password is Required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Password is Required"),

  })
  .required();

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, seterrors] = useState("")
  const searchParams = useSearchParams()

  const token = searchParams.get('token')
  const id = searchParams.get('id')

  const [invalidUser, setinvalidUser] = useState('')
  const [busy, setBusy] = useState(true)
  const [error, setError] = useState('')

  const verifyToken = () => {

    AuthService.VerifyToken(token, id)
        .then((res) => {
            setBusy(false)
            console.log(res)
            setIsLoading(false);

        })
        .catch((err) => {
            console.log(err)
            seterrors(err)
            if(!err.success) {
                setinvalidUser(err.error)
            }
            setIsLoading(false);
        })
    }
  useEffect(() => {
    verifyToken()

  }, [])


  const formik = useFormik({
    initialValues: {
      email: "",

    },
    validationSchema: validationSchema,
    onSubmit: (values) => {

      seterrors("")
      setIsLoading(true);
      AuthService.ResetPassword(values,token, id)
        .then((res) => {


          console.log(res)

          // dispatch(authActions.login({token: res.token, router:router}))
          toast.success("mot de passe réinitialisé avec succès ", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          window.location.href = "/";
          setIsLoading(false);

        })
        .catch((err) => {
          console.log(err)
          seterrors(err)
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });
  return (
    <>
{invalidUser ?
    <div className='max-w-screen-sm m-auto pt-40'>
    <h1 className='text-center text-3xl text-gray-500 mb-3' >
      {invalidUser}
    </h1>
  </div> :



    <form onSubmit={formik.handleSubmit} className="space-y-4 ">

      <Textinput
       id="password"
        name="password"
        label="password"
        type="password"
        value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        placeholder="Entrez votre mot de passe"
      />
      <Textinput
       id="confirmPassword"
        name="confirmPassword"
        label="confirmPassword"
        type="password"
        value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        placeholder="Confirmez votre mot de passe"
      />
  {!errors.success && errors !="" ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Erreur!</strong>
            {
              errors.error== 'You can request a new token after one hour!'  ?
              (
                <span className="block sm:inline"> Vous pouvez demander un nouveau jeton après une heure!</span>

              ) : errors.error=="Sorry! User not found!" ?
              (
                <span className="block sm:inline"> Désolé! Utilisateur non trouvé!</span>
              ):errors.error=="Password must be between 8 and 20 characters" ?
              (
                <span className="block sm:inline">
                Le mot de passe doit comporter entre 8 et 20 caractères
                </span>
              ):
              errors.error=="reset Token Not found !" ?
              (
                <span className="block sm:inline">
                Jeton de réinitialisation non trouvé!
                </span>
              ):
              errors.error=="You cannot use the same password" ?
              (
                <span className="block sm:inline">
                Vous ne pouvez pas utiliser le même mot de passe
                </span>
              ):
             null
            }
            {/* <span className="block sm:inline"> Informations d'identification invalides.</span> */}
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                onClick={() => seterrors("")}
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.348 5.652a.5.5 0 0 0-.707 0L10 9.293 6.36 5.652a.5.5 0 0 0-.708.708L9.293 10l-3.64 3.64a.5.5 0 0 0 .708.708L10 10.707l3.64 3.64a.5.5 0 0 0 .708-.708L10.707 10l3.64-3.64a.5.5 0 0 0 0-.708z"
                />
              </svg>
            </span>
          </div>
        ):errors.success && errors ?
        (

          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Succès!</strong>
            <span className="block sm:inline"> {errors.success}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                onClick={() => seterrors("")}
                className="fill-current h-6 w-6 text-green-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.348 5.652a.5.5 0 0 0-.707 0L10 9.293 6.36 5.652a.5.5 0 0 0-.708.708L9.293 10l-3.64 3.64a.5.5 0 0 0 .708.708L10 10.707l3.64 3.64a.5.5 0 0 0 .708-.708L10.707 10l3.64-3.64a.5.5 0 0 0 0-.708z"
                />
              </svg>
            </span>
          </div>

        ): null

          }
<button
          disabled={isLoading}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          type="submit"
          className="btn btn-dark block w-full text-center"
        >
          {isLoading ? (
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
            "Reset"
          )}
        </button>
    </form>
}
    </>
  );
};

export default ResetPassword;
