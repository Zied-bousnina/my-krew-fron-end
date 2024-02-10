import React, { useEffect, useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Checkbox from "@/components/ui/Checkbox";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { handleLogin, handleRegister2, handlelogin2 } from "./store";
import { ToastContainer, toast } from "react-toastify";
// import { then } from './../../../.next/server/app/(dashboard)/ecommerce/page';

const schema = yup.object({
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup.string().required("Password is Required"),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is Required')
  })
  .required();
const SignUpForm = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const  {isLoading}  = useSelector((state) => state.auth);
  const  {error} = useSelector((state) => state.auth);
  const  state = useSelector((state) => state.auth);

  // console.log(isAuth);
  function parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

  console.log(error)
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });
  const router = useRouter();
  const onSubmit = (data) => {
    // const user = users.find(
    //   (user) => user.email === data.email && user.password === data.password
    // );
 if(data.email !="" && data.password!="") {
  const data2 =  {
    email: data.email,
    password: data.password,
    confirm: data.password
  }

   dispatch(handleRegister2(data2))
   .then((res) => {
    console.log("ressss", res)
    if(res.type =="auth/handleRegister/rejected") {
      toast.error("Invalid credentials", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log("error", res.error)
    }else if(
      res.type =="auth/handleRegister/fulfilled"
    ) {
      console.log(res)
      toast.success("votre compte a été crée avec succès"
      , {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // setTimeout(() => {
        router.push("/");
      // }, 1500);
    }





      // toast.success("Bienvenue", {
      //   position: "top-right",
      //   autoClose: 1500,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
      // setTimeout(() => {
      //   router.push("/analytics");
      // }, 1500);

  }
  )
  .catch((err) => {
    // console.log("error", err)
    // toast.error("Invalid credentials", {
    //   position: "top-right",
    //   autoClose: 1500,
    //   hideProgressBar: true,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   // theme: "light",
    // });
    console.log(err);
  });

  }else {
    toast.error("Veuillez remplir les champs", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  }
    // if (user) {

    //   // setTimeout(() => {
    //   //   router.push("/analytics");
    //   // }, 1500);
    // } else {
    //   toast.error("Invalid credentials", {
    //     position: "top-right",
    //     autoClose: 1500,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    // }
  };

  const [checked, setChecked] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Textinput
        name="email"
        label="email"
        placeholder="enter your email"

        type="email"
        register={register}
        error={errors?.email}
      />
      <Textinput
        name="password"
        label="passwrod"
        type="password"
placeholder="********"
        register={register}
        error={errors.password}
      />
      <Textinput
        name="confirmPassword"
        label="Consfirm passwrod"
        type="password"
        placeholder="********"

        register={register}
        error={errors.confirmPassword}
      />
      <div className="flex justify-end">

        {error &&
        <p className="text-sm text-red-500 dark:text-red-400">
        L'adresse e-mail est déjà utilisée
        </p>
        }

      </div>

      <button
      disabled={isLoading}
      className="btn btn-dark block w-full text-center">
{
  isLoading ?
  <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">
            Loading...
          </span>
        </div>
:
      "s'inscrire"
}

      </button>
    </form>
  );
};

export default SignUpForm;
