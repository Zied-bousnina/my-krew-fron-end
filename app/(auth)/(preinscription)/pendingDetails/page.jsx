"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import useDarkMode from "@/hooks/useDarkMode";
import RegForm from "@/components/partials/auth/reg-from";
import Social from "@/components/partials/auth/social";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";
import { Disclosure } from "@headlessui/react";
import { useRouter } from 'next/router'
import { useDispatch } from "react-redux";
import { handleGetRegistrationByUserId } from "@/components/partials/auth/store";
import { useSelector } from "react-redux";
import Icons from "@/components/ui/Icon";
import AddNewMission from "@/components/ui/modals/pages/consultant-home/addNewMission";
import UpdateMissionClientInfo from "@/components/ui/modals/pages/preinscription/update-missionAndClient-info";
import AuthService from "@/_services/auth.service";
const PendingDetails = ({params}) => {
  const [isDark] = useDarkMode();
  // const router = useRouter()
  // console.log(router.query)
  // const  {isLoading}  = useSelector((state) => state.auth);
  const  {preregistration}  = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false)
  const [infoPersoById, setinfoPersoById] = useState()
  useEffect(() => {

    dispatch(handleGetRegistrationByUserId(params.id))
    fetchinfoPersoById()

  }, [preregistration?.status])
  const fetchinfoPersoById = async () => {
    setisLoading(true)

    AuthService.getPreregistrationByconsultant().then((data) => {
      console.log("+++++++++++++ abc :", data)
      setinfoPersoById(data)
      setisLoading(false)

    }
    )
    .catch(err=> {
      setisLoading(false)

    }).finally(()=> {


      setisLoading(false)
    }
    )
  }

  console.log(preregistration)

  console.log(params.id)


  const handleIconClick = () => {
    fetchinfoPersoById()
    // dispatch(handleGetRegistrationByUserId(params.id))
  }
  return (
    <>
    <div className="loginwrapper">
      <div className="lg-inner-column">
      <div className="left-column relative z-[1]"
       style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0)), url(/assets/images/all-img/unsplash_63XrEEiOko8.png)`,
        backgroundSize: 'cover',
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

  <Link href="/">
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

// background: 'rgba(215, 215, 209, 0.32)',
// backdropFilter: 'blur(0.2px)',
// zIndex: '2',
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

  <button onClick={handleIconClick}
  disabled={isLoading}
  >

                 <Icons

                    icon="mdi:reload"
                    className="w-6 h-6"
                    style={{ color: "#4669F2" }}
                  />
  </button>

                  Votre demande est en cours de verification</h4>
                {/* <img
                    src={
                      isDark
                        ? "/assets/images/all-img/mk3.svg"
                        : "/assets/images/all-img/mk3.svg"
                    }
                    alt=""
                    // className="mx-auto"
                  /> */}
                  <div className="grid grid-cols-12 gap-12">
      <div className="lg:col-span-10 col-span-12">
        <Card >

{/* 1 - Validation RH */}
{isLoading ?
  <div role="status" class="max-w-sm animate-pulse">
    <div class="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-100 mb-4"></div>

    <span class="sr-only">Loading...</span>
</div> :


<div className="mt-6 space-y-5">
  <div key={1} className="mb-3">
  <UpdateMissionClientInfo
  preregistration={infoPersoById}
  />
    {/* <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className={`
          ${
            preregistration?.validationRH == "PENDING" ? "bg-slate-400" : preregistration?.validationRH == "VALIDATED" ? "bg-[#128200]" : "bg-[#BC0000]"
          }


           bg-opacity-[23%] rounded-t-md flex justify-between cursor-pointer transition duration-150 font-medium w-full text-start text-base text-[#1E1E1E] px-8 py-4`}>
            <span>
              1
              <span className="font-semibold text-xs text-[#1E1E1E]">
                - Validation RH
              </span>
            </span>
            <span
              className={` ${
                open && "rotate-180 transform"
              }  transition-all duration-150 text-xl`}
            >

            </span>
          </Disclosure.Button>
        </>
      )}
    </Disclosure> */}
  </div>
</div>
}

{/* 2 - Prise de contact avec le client */}
{isLoading ?
  <div role="status" class="max-w-sm animate-pulse">
    <div class="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-100 mb-4"></div>

    <span class="sr-only">Loading...</span>
</div> :


          <div className="mt-6 space-y-5">
          <div key={2} className="mb-3">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                      className={`
                        ${
            preregistration?.validateClient == "PENDING" ? "bg-slate-400" : preregistration?.validateClient == "VALIDATED" ? "bg-[#128200]" : "bg-[#BC0000]"}

                      bg-opacity-[23%] rounded-t-md flex justify-between cursor-pointer transition duration-150 font-medium w-full text-start text-base  text-[#1E1E1E] px-8 py-4`}>
                        <span>
                          2
                          <span className="font-semibold text-xs  text-[#1E1E1E]">
                            - Prise de contact avec le client
                          </span>
                        </span>
                        <span
                          className={` ${
                            open && "rotate-180 transform"
                          }  transition-all duration-150 text-xl`}
                        >
                          {/* <Icon icon="heroicons:chevron-down-solid" /> */}
                        </span>
                      </Disclosure.Button>

                    </>
                  )}
                </Disclosure>
              </div>
          </div>}

          {/*3 - Contrat de prestation validé avec le client */}
          {isLoading ?
  <div role="status" class="max-w-sm animate-pulse">
    <div class="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-100 mb-4"></div>

    <span class="sr-only">Loading...</span>
</div> :


          <div className="mt-6 space-y-5">
          <div key={3} className="mb-3">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button  className={`
                        ${
            preregistration?.validateContractWithClient
 == "PENDING" ? "bg-slate-400" : preregistration?.validateContractWithClient
 == "VALIDATED" ? "bg-[#128200]" : "bg-[#BC0000]"}

                      bg-opacity-[23%] rounded-t-md flex justify-between cursor-pointer transition duration-150 font-medium w-full text-start text-base  text-[#1E1E1E] px-8 py-4`}>
                        <span>
                          3
                          <span className="font-semibold text-xs  text-[#1E1E1E]">
                            - Contrat de prestation validé avec le client
                          </span>
                        </span>
                        <span
                          className={` ${
                            open && "rotate-180 transform"
                          }  transition-all duration-150 text-xl`}
                        >
                          {/* <Icon icon="heroicons:chevron-down-solid" /> */}
                        </span>
                      </Disclosure.Button>

                    </>
                  )}
                </Disclosure>
              </div>
          </div>}
          {/* 4 - Édition du contrat de travail */}
          {isLoading ?
  <div role="status" class="max-w-sm animate-pulse">
    <div class="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-100 mb-4"></div>

    <span class="sr-only">Loading...</span>
</div> :


          <div className="mt-6 space-y-5">
          <div key={4} className="mb-3">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className={`
                        ${
            preregistration?.validateContractTravail

 == "PENDING" ? "bg-slate-400" : preregistration?.validateContractTravail

 == "VALIDATED" ? "bg-[#128200]" : "bg-[#BC0000]"}

                      bg-opacity-[23%] rounded-t-md flex justify-between cursor-pointer transition duration-150 font-medium w-full text-start text-base  text-[#1E1E1E] px-8 py-4`}>
                        <span>
                          4
                          <span className="font-semibold text-xs  text-[#1E1E1E]">
                            - Édition du contrat de travail
                          </span>
                        </span>
                        <span
                          className={` ${
                            open && "rotate-180 transform"
                          }  transition-all duration-150 text-xl`}
                        >
                          {/* <Icon icon="heroicons:chevron-down-solid" /> */}
                        </span>
                      </Disclosure.Button>

                    </>
                  )}
                </Disclosure>
              </div>
          </div>
          }
          {/* 5 - Transmission et validation du contrat */}
          {isLoading ?
  <div role="status" class="max-w-sm animate-pulse">
    <div class="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-100 mb-4"></div>

    <span class="sr-only">Loading...</span>
</div> :


          <div className="mt-6 space-y-5">
          <div key={5} className="mb-3">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className={`
                        ${
            preregistration?.transmissionContract


 == "PENDING" ? "bg-slate-400" : preregistration?.transmissionContract


 == "VALIDATED" ? "bg-[#128200]" : "bg-[#BC0000]"}

                      bg-opacity-[23%] rounded-t-md flex justify-between cursor-pointer transition duration-150 font-medium w-full text-start text-base  text-[#1E1E1E] px-8 py-4`}>
                        <span>
                          5
                          <span className="font-semibold text-xs  text-[#1E1E1E]">
                            - Transmission et validation du contrat
                          </span>
                        </span>
                        <span
                          className={` ${
                            open && "rotate-180 transform"
                          }  transition-all duration-150 text-xl`}
                        >
                          {/* <Icon icon="heroicons:chevron-down-solid" /> */}
                        </span>
                      </Disclosure.Button>

                    </>
                  )}
                </Disclosure>
              </div>
          </div>
          }

        </Card>
      </div>


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

export default PendingDetails;
