"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Icon from "@/components/ui/Icon";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";
import { missionService } from "@/_services/mission.service";
import Loading from "@/app/loading";

const ConsultantMissionDetailsPage = () => {
  const { id } = useParams();
  const [mission, setMission] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getMissionById = () => {
    setIsLoading(true);
    return missionService
      .getMissionById(id)
      .then((res) => {
        console.log(res);
        setMission(res);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getMissionById();
  }, []);

  const getTheRightIcon = (value) => {
    switch (value) {
      case null:
        return { icon: "heroicons:clock", color: "text-warning-500" };
      case false:
        return { icon: "heroicons:x-circle", color: "text-danger-500" };
      case true:
        return { icon: "heroicons:check-circle", color: "text-success-500" };
      default:
        return { icon: "heroicons:clock", color: "text-warning-400" };
    }
  };

  return (
    <div className="lg:col-span-8 col-span-12 space-y-5">
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="flex gap-6 items-center pb-8">
            <Icon icon="heroicons:question-mark-circle" width={35} />
            <h1 className="font-extra text-4xl">Info Mission</h1>
          </div>
          <div className="pb-20">
            <h6 className="font-semibold">Information du client</h6>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 mt-6 sm:pr-[250px]">
              <div className="relative ">
                <Textinput
                  name="nom"
                  label="Nom"
                  type="text"
                  placeholder="Votre nom"
                  className="bg-transparent rounded-xl"
                />
                <Icon
                  className={`absolute top-0 right-0 ${
                    getTheRightIcon(
                      mission?.clientInfo?.clientContact?.lastName?.validated
                    ).color
                  }`}
                  icon={
                    getTheRightIcon(
                      mission?.clientInfo?.clientContact?.lastName?.validated
                    ).icon
                  }
                />
              </div>
              <Textinput
                name="prenom"
                label="Prenom"
                type="text"
                placeholder="Votre prenom"
                className="bg-transparent rounded-xl"
              />

              <Textinput
                name="email"
                label="Addresse e-mail"
                type="email"
                placeholder="Votre addresse e-mail"
                className="bg-transparent rounded-xl"
              />
              <Textinput
                name="poste"
                label="Poste"
                type="text"
                placeholder="Votre poste"
                className="bg-transparent rounded-xl"
              />
              <Textinput
                name="phone"
                label="Numéro de téléphone"
                type="number"
                placeholder="Votre numéro de téléphone"
                className="bg-transparent rounded-xl"
              />
              <Textinput
                name="company"
                label="Entreprise"
                type="text"
                placeholder="Votre Entreprise"
                className="bg-transparent rounded-xl"
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
                <p className="text-gray-400 text-sm mt-2">Invoice date:</p>
                {/*image*/}
                <img
                  src={"/assets/images/placeholder/image-placeholder.png"}
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
                    onClick={() => {}}
                  />
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
                <p className="text-gray-400 text-sm mt-2">Invoice date:</p>
                {/*image*/}
                <img
                  src={"/assets/images/placeholder/image-placeholder.png"}
                  className="mt-6 w-[250px] h-[150px] object-cover rounded-lg"
                />

                <div className="mt-6 flex justify-between items-center gap-2">
                  <Button
                    className="text-[#369ae7] text-sm font-light px-6 py-2 rounded-full bg-[#f0f8fc] "
                    icon="heroicons:arrow-down-tray"
                    iconPosition="right"
                    iconClass="w-4"
                    text="Télécharger"
                    onClick={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultantMissionDetailsPage;
