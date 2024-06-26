"use client";

import React from "react";
import Link from "next/link";
import useDarkMode from "@/hooks/useDarkMode";
import RegForm from "@/components/partials/auth/reg-from";
import Social from "@/components/partials/auth/social";
import Image from "next/image";
import Button from "@/components/ui/Button";

const Declined = ({ params }) => {
  console.log(params);
  const [isDark] = useDarkMode();
  return (
    <>
      <div className="loginwrapper">
        <div className="lg-inner-column">
          <div
            className="left-column relative z-[1]"
            style={{
              backgroundImage: `url(/assets/images/all-img/unsplash_f3nGngsnp3A2.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "1.875rem",
              margin: "10px",
              //  opacity : '0.9',
              //  background: 'rgba(215, 215, 209, 0.32)',
            }}
          >
            <div className="max-w-[520px] pt-10 ltr:pl-20 rtl:pr-20">
              <div
                className=" bg-black opacity-100"
                style={{
                  width: "6.25rem",
                  height: "4.3125rem",
                  position: "fixed",
                  top: "4%",
                  left: "3%",
                  borderRadius: "1.1875rem",
                  border: "0px solid #FFF",
                  background: "rgba(215, 215, 209, 0.32)",
                  backdropFilter: "blur(3.6500000953674316px)",
                  zIndex: "2",
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
                    // className="mb-10"
                  />
                </Link>
              </div>
            </div>
            <div className="absolute left-20 2xl:bottom-20 bottom-20 z-[-1]">
              <h2
                className="text-4xl font-bold text-white  mb-4"
                style={
                  {
                    // background: 'rgba(215, 215, 209, 0.32)',
                    // backdropFilter: 'blur(3.6500000953674316px)',
                    // zIndex: '2',
                  }
                }
              >
                Votre demande n'a pas été validée. Vérifiez vos informations ou
                contactez notre support pour assistance. Nous sommes là pour
                vous aider !
              </h2>
            </div>
          </div>

          <div className="right-column relative">
            <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
              <div className="auth-box h-full flex flex-col justify-center">
                <div className="mobile-logo text-left mb-6 lg:hidden block">
                  <Link href="/v4/public">
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
                      paddingBottom: "10px",
                    }}
                  />
                  <h4 className="font-medium">
                    {" "}
                    Votre demande n’a pas été acceptée
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
                    <Link
                      href={`/pendingDetails/${5}`}
                      className="text-[#76736E] dark:text-white"
                    >
                      <Button
                        // href="/"
                        className="btn btn-[#76736E]
                dark:bg-slate-800 dark:text-white
                bg-[#76736E] text-white
                "
                      >
                        Consultez votre demande
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

export default Declined;
