"use client";

import React from "react";
import Link from "next/link";
import ForgotPass from "@/components/partials/auth/forgot-pass";
import useDarkMode from "@/hooks/useDarkMode";

const ForgotPassPage = () => {
  const [isDark] = useDarkMode();
  return (
    <div className="loginwrapper">
      <div className="lg-inner-column">
      <div className="left-column relative z-[1]"
         style={{
          backgroundImage: `url(/assets/images/all-img/Rectangle.png)`,
          backgroundSize: 'cover',
           backgroundPosition: 'center',
           borderRadius: '1.875rem',
           margin: '10px',
          //  opacity : '0.9',
          //  background: 'rgba(215, 215, 209, 0.32)',

            }}

            >
  <div className="max-w-[520px] pt-10 ltr:pl-20 rtl:pr-20">
  <div className=" bg-black opacity-100"
  style={{
  width: '6.25rem',
  height: '4.3125rem',
  position: 'fixed',
  top: '4%',
  left: '3%',
  borderRadius: '1.1875rem',
  border: '0px solid #FFF',
  background: 'rgba(215, 215, 209, 0.32)',
  backdropFilter: 'blur(3.6500000953674316px)',
  zIndex: '2',
}}
  >

    <Link href="/v4/public">
      <img
        src={
          isDark
            ? "/assets/images/all-img/Calque4.png"
            : "/assets/images/all-img/Calque4.png"
        }
        alt="ddd"
        width={150}
        height={150}
        // className="mb-10"
      />
    </Link>
  </div>

  </div>
  <div className="absolute left-20 2xl:bottom-20 bottom-20 z-[-1]">
  <h2 className="text-4xl font-bold text-white  mb-4">
    Gestion Financière Simplifiée avec MyKrew : Suivi, Cooptation et Succès{" "}

      Professionnel

  </h2>
</div>

</div>
        <div className="right-column relative">
          <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
            <div className="auth-box2 flex flex-col justify-center h-full">
              <div className="mobile-logo text-center mb-6 lg:hidden block">
                <Link href="/v4/public">
                  <img
                    src={
                      isDark
                        ? "/assets/images/logo/logo-white.svg"
                        : "/assets/images/logo/logo.svg"
                    }
                    alt=""
                    className="mx-auto"
                  />
                </Link>
              </div>
              <div className="text-center 2xl:mb-10 mb-5">
                <h4 className="font-medium mb-4">Mot de passe oublié ?</h4>
                <div className="text-slate-500 dark:text-slate-400 text-base">
                Réinitialiser le mot de passe avec my-Krew
                </div>
              </div>
              <div className="font-normal text-base text-slate-500 dark:text-slate-400 text-center px-2 bg-slate-100 dark:bg-slate-600 rounded py-3 mb-4 mt-10">
              Entrez votre adresse e-mail et des instructions vous seront envoyées!
              </div>

              <ForgotPass />
              <div className="md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-8 uppercase text-sm">
              Oubliez ça,
                <Link
                  href="/v4/public"
                  className="text-slate-900 dark:text-white font-medium hover:underline"
                >
                  {' '}Renvoyez-moi {' '}
                </Link>
                à la page de connexion
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassPage;
