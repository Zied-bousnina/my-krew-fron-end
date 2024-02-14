"use client";

import React from "react";
import Link from "next/link";
import useDarkMode from "@/hooks/useDarkMode";
import RegForm from "@/components/partials/auth/reg-from";
import Social from "@/components/partials/auth/social";
import Image from "next/image";
import Button from "@/components/ui/Button";

const Pending = ({params}) => {
  console.log(params)
  const [isDark] = useDarkMode();
  return (
    <>
    <div className="loginwrapper">
      <div className="lg-inner-column">
      <div className="left-column relative z-[1]"
       style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0)), url(/assets/images/all-img/unsplash_f3nGngsnp3A.png)`,
        backgroundSize: 'cover',
         backgroundPosition: 'center',
         borderRadius: '1.875rem',
         margin: '10px',


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
    <Image
      src={
        isDark
          ? "/assets/images/all-img/Calque4.png"
          : "/assets/images/all-img/Calque4.png"
      }
      alt="ddd"
      width={400}
      height={400}
      // className="mb-10"
      style={{ width: '100%', height: 'auto' }}
    />
  </Link>
</div>

</div>
<div className="absolute left-20 2xl:bottom-20 bottom-20 z-[-1]">
<h2 className="text-4xl font-bold text-white  mb-4"

style={{

background: 'rgba(215, 215, 209, 0.32)',
backdropFilter: 'blur(0.2px)',
zIndex: '2',
}}

>
Nous vérifions vos informations. Nous vous tiendrons informé dans quelques instants !
</h2>
</div>

</div>

        <div className="right-column relative">
          <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
            <div className="auth-box h-full flex flex-col justify-center">
              <div className="mobile-logo text-left mb-6 lg:hidden block">
                <Link href="/v4/public">
                  <Image
                    src={
                      isDark
                        ? "/assets/images/all-img/Calque4.png"
                        : "/assets/images/all-img/Calque4.png"
                    }
                    alt=""
                    className="mx-auto"
                    width={100}
                    height={100}
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
                <h4 className="font-medium">  Votre demande est en cours de verification</h4>
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
                <Link
                 href={`/pendingDetails`}
                  className="text-[#76736E] dark:text-white"
                >
                <Button
                // href="/"
                className="btn btn-[#76736E]
                dark:bg-slate-800 dark:text-white
                bg-[#76736E] text-white
                "
                >
                suivre votre demande
                </Button>
                </Link>

                </div>
              </div>
              {/* <RegForm /> */}


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

export default Pending;
