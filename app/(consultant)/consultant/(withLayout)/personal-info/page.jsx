"use client";
import Icon from "@/components/ui/Icon";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";
import { consultantService } from "@/_services/consultant.service";
import Loading from "@/app/loading";
import { format } from "date-fns";
import UpdateInfoImage from "@/components/ui/modals/pages/personal-info/updateInfoImage";
import UpdateInfoCIN from "@/components/ui/modals/pages/personal-info/updateInfoCIN";
import UpdateInfoRIB from "@/components/ui/modals/pages/personal-info/updateInfoRIB";

const ConsultantPersonalInfoPage = () => {
  const [currentConsultant, setCurrentConsultant] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentConsultant = () => {
    setIsLoading(true);
    consultantService
      .getCurrentConsultant()
      .then((res) => {
        setCurrentConsultant(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getCurrentConsultant();
  }, []);

  const handleDownload = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = downloadUrl;
      downloadLink.download = "image.jpg"; // You can set the file name here
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(downloadUrl); // Clean up
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };
  return (
    <>
      {isLoading ? (
        <div className="lg:col-span-8 col-span-12 space-y-5 flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        Object.keys(currentConsultant).length !== 0 && (
          <div className="lg:col-span-8 col-span-12 space-y-5">
            <div className="flex gap-6 items-center pb-8">
              <Icon icon="heroicons:question-mark-circle" width={35} />
              <h1 className="font-extra text-4xl">Mes Infos Perso</h1>
            </div>
            <div className="flex items-center gap-6 pb-12">
              <img
                src={
                  !currentConsultant.image ||
                  currentConsultant.image === "default.jpg"
                    ? "/assets/images/placeholder/image-placeholder.png"
                    : currentConsultant.image
                }
                className="h-[75px] w-[75px] rounded-lg"
              />
              <h5 className=" font-semibold">
                {currentConsultant?.preRegister?.personalInfo?.firstName
                  ?.value +
                  " " +
                  currentConsultant?.preRegister?.personalInfo?.lastName?.value}
              </h5>
              <UpdateInfoImage refresh={getCurrentConsultant} />
            </div>
            <div className="pb-20">
              <h6 className="font-semibold">Information Personnelles</h6>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 mt-6 sm:pr-[250px]">
                <Textinput
                  name="email"
                  label="Addresse e-mail"
                  type="email"
                  placeholder="Votre addresse e-mail"
                  className="bg-transparent rounded-xl"
                  defaultValue={
                    currentConsultant?.preRegister?.personalInfo?.email?.value
                  }
                />
                <Textinput
                  name="contact"
                  label="Poste du contact"
                  type="text"
                  placeholder="Votre poste du contact"
                  className="bg-transparent rounded-xl"
                  defaultValue={
                    currentConsultant?.preRegister?.clientInfo?.clientContact
                      ?.position?.value
                  }
                />
                <Textinput
                  name="phone"
                  label="Numéro de téléphone"
                  type="number"
                  placeholder="Votre numéro de téléphone"
                  className="bg-transparent rounded-xl"
                  defaultValue={
                    currentConsultant?.preRegister?.personalInfo?.phoneNumber
                      ?.value
                  }
                />
                <Textinput
                  name="company"
                  label="Société"
                  type="text"
                  placeholder="Votre société"
                  className="bg-transparent rounded-xl"
                  defaultValue={
                    currentConsultant?.preRegister?.clientInfo?.company?.value
                  }
                />
              </div>
            </div>
            <div>
              <h6 className="font-semibold">Documents Associés</h6>
              <div className="flex sm:flex-row flex-col gap-4 mt-8">
                {/*-------------card----------------------*/}
                <div className="flex flex-col items-center justify-between border rounded-lg p-6">
                  {/*icon*/}
                  <div className="flex item-center gap-2">
                    <Icon
                      icon="heroicons:identification"
                      className="text-red-400"
                      width={25}
                    />
                    <p className="text-xl font-semibold">CIN</p>
                  </div>
                  {/*ivoice date */}
                  <p className="text-gray-400 text-sm mt-2">
                    Invoice date:{" "}
                    {format(currentConsultant.updatedAt, "dd/MM/yyyy")}
                  </p>
                  {/*image*/}
                  <img
                    src={
                      currentConsultant?.preRegister?.personalInfo
                        ?.identificationDocument?.value
                    }
                    className="mt-6 w-[250px] h-[150px] object-cover rounded-lg"
                  />
                  {/*button*/}
                  <div className="mt-6 flex justify-between items-center gap-2">
                    <Button
                      className="text-[#369ae7] text-sm font-light px-6 py-2 rounded-full bg-[#f0f8fc] "
                      icon="heroicons:arrow-down-tray"
                      iconPosition="right"
                      iconClass="w-4"
                      text="Télécharger"
                      onClick={() =>
                        handleDownload(
                          currentConsultant?.preRegister?.personalInfo
                            ?.identificationDocument?.value
                        )
                      }
                    />
                    <UpdateInfoCIN refresh={getCurrentConsultant} />
                  </div>
                </div>
                {/*-------------card----------------------*/}
                <div className="flex flex-col items-center justify-between border rounded-lg p-6">
                  {/*icon*/}
                  <div className="flex item-center gap-2">
                    <Icon
                      icon="heroicons:identification"
                      className="text-purple-400"
                      width={25}
                    />
                    <p className="text-xl font-semibold">RIB</p>
                  </div>
                  {/*ivoice date */}
                  <p className="text-gray-400 text-sm mt-2">
                    Invoice date:{" "}
                    {format(currentConsultant.updatedAt, "dd/MM/yyyy")}
                  </p>
                  {/*image*/}
                  <img
                    src={
                      currentConsultant?.preRegister?.personalInfo?.ribDocument
                        ?.value
                    }
                    className="mt-6 w-[250px] h-[150px] object-cover rounded-lg"
                  />
                  {/*button*/}
                  <div className="mt-6 flex justify-between items-center gap-2">
                    <Button
                      className="text-[#369ae7] text-sm font-light px-6 py-2 rounded-full bg-[#f0f8fc] "
                      icon="heroicons:arrow-down-tray"
                      iconPosition="right"
                      iconClass="w-4"
                      text="Télécharger"
                      onClick={() =>
                        handleDownload(
                          currentConsultant?.preRegister?.personalInfo
                            ?.ribDocument?.value
                        )
                      }
                    />
                    <UpdateInfoRIB refresh={getCurrentConsultant} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default ConsultantPersonalInfoPage;
