"use client";

import React, { useEffect, useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Checkbox from "@/components/ui/Checkbox";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { handleLogin, handlelogin2 } from "./store";
import { ToastContainer, toast } from "react-toastify";

// import { then } from './../../../.next/server/app/(dashboard)/ecommerce/page';
// import 'react-toastify/dist/ReactToastify.css';
const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();
const LoginForm = () => {
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
  }

   dispatch(handlelogin2(data2, router))
   .then((res) => {

    if(res.type =="auth/handlelogin/rejected") {
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
      res.type =="auth/handlelogin/fulfilled"
    ) {
      if(res?.payload?.role=="RH") {
        router.push("/rh")
      }else {

        if(res.payload?.status=="NOTEXIST") {
          router.push(`/register/${res.payload?.id}`)
        }else if(res.payload?.status=="PENDING") {
          router.push(`/pending/${res.payload?.id}`)
        }else if(res.payload?.status=="NOTVALIDATED"){
          router.push(`/declined/${res.payload?.id}`)
        }
      }
      // setTimeout(() => {
      //   router.push("/analytics");
      // }, 1500);
      console.log(res)
    }
    console.log(res.payload?.token)
    const user  = parseJwt(res.payload?.token)
    console.log(user)
    // if(user?.role=="ADMIN") {
    //   router.push("/admin")
    // } else if(user?.role=="RH") {
    //   // router.push("/consultant")
    //   router.push("/rh")
    // }



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

    // console.log(err);
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
    <>
       <ToastContainer />
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Textinput
        name="email"
        label="email"
        defaultValue="z@gmail.com"
        type="email"
        register={register}
        error={errors?.email}
      />
      <Textinput
        name="password"
        label="passwrod"
        type="password"
        defaultValue="123456789"
        register={register}
        error={errors.password}
      />
      <div className="flex justify-between">
        <Checkbox
          value={checked}
          onChange={() => setChecked(!checked)}
          label="Keep me signed in"
        />
        {error &&
        <p className="text-sm text-red-500 dark:text-red-400">
          Invalid credentials
        </p>
        }
        <Link
          href="/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
           Mot de passe oublié ?{" "}
        </Link>
      </div>

      <button
      disabled={isLoading}
       style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      className="btn btn-dark block w-full text-center">
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
      "Se connecter"
}

      </button>
    </form>
    </>
  );
};

export default LoginForm;
