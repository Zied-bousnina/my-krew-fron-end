"use client";
import Link from "next/link";
import LoginForm from "@/components/partials/auth/login-form";
import Social from "@/components/partials/auth/social";
import useDarkMode from "@/hooks/useDarkMode";
import Image from "next/image";
import SignUpForm from "@/components/partials/auth/signUp-form";

// image import

const SignUp = () => {
  const [isDark] = useDarkMode();
  return (
    <>

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

    <Link href="/">
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
              <div className="auth-box h-full flex flex-col justify-center">
                <div className="mobile-logo text-left mb-6 lg:hidden block">
                  <Link href="/">
                    <img
                      src={
                        isDark
                          ? "/assets/images/all-img/Calque4.png"
                          : "/assets/images/all-img/Calque4.png"
                      }
                      alt=""
                      className="mx-auto"
                    />
                  </Link>
                </div>
                <div className="text-left 2xl:mb-10 mb-4">
                     <Image
        src="/assets/images/all-img/mk3.svg"
        alt="My SVG"
        width={150}
        height={150}
        style={{
         paddingBottom: '10px',
        }}
      />
                  <h4 className="font-medium">
                    Créez un compte MyKrew
                  </h4>
                  {/* <img
                      src={
                        isDark
                          ? "/assets/images/all-img/mk3.svg"
                          : "/assets/images/all-img/mk3.svg"
                      }
                      alt=""
                      // className="mx-auto"
                    /> */}
                  <div className="text-slate-500 text-base">
                  Accédez à la gestion et au suivi de vos finances en un clic.
                  </div>
                </div>
                <SignUpForm />

                <div className="md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 mt-12 uppercase text-sm">

                    Vous avez déjà un compte ? {" "}

                  <Link
                    href="/"
                    className="text-slate-900 dark:text-white font-medium hover:underline"
                  >
                  Connectez-vous
                  </Link>
                </div>
              </div>
              <div className="auth-footer text-center">
                {/* Copyright 2021, Dashcode All Rights Reserved. */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
