"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Icon from "@/components/ui/Icon";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";
import { missionService } from "@/_services/mission.service";
import Loading from "@/app/loading";
import * as yup from "yup";
import { format } from "date-fns";
import Fileinput from "@/components/ui/Fileinput";
const validationSchema = yup.object({
  firstName: yup.string().required("Ce champ est obligatoire"),
  lastName: yup.string().required("Ce champ est obligatoire"),
  position: yup.string().required("Ce champ est obligatoire"),
  email: yup
    .string()
    .email("Email invalide")
    .required("Ce champ est obligatoire"),
  phoneNumber: yup.string().required("Ce champ est obligatoire"),
  company: yup.string().required("Ce champ est obligatoire"),
  metier: yup.string().required("Ce champ est obligatoire"),
  secteur: yup.string().required("Ce champ est obligatoire"),
  client: yup.string().required("Ce champ est obligatoire"),
  simulation: yup.string().required("Ce champ est obligatoire"),
  tjm: yup.number().required("Ce champ est obligatoire"),
  debut: yup.string().required("Ce champ est obligatoire"),
  fin: yup.string().required("Ce champ est obligatoire"),
});

const ConsultantMissionDetailsPage = () => {
  const { id } = useParams();
  const [mission, setMission] = useState(null);
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
        !!mission && (
          <div>
            <div className="flex gap-6 items-center pb-8">
              <Icon icon="heroicons:question-mark-circle" width={35} />
              <h1 className="font-extra text-4xl">Info Mission</h1>
            </div>
            <div className="pb-12">
              <h6 className="font-semibold">Information du client</h6>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 mt-6 sm:pr-[250px]">
                <div className="relative ">
                  <Textinput
                    name="nom"
                    label="Nom"
                    type="text"
                    placeholder="Votre nom"
                    className="bg-transparent rounded-xl"
                    defaultValue={
                      mission?.clientInfo?.clientContact?.lastName?.value
                    }
                    disabled={
                      mission?.clientInfo?.clientContact?.lastName
                        ?.validated !== false
                        ? true
                        : false
                    }
                    comment={
                      mission?.clientInfo?.clientContact?.lastName
                        ?.validated === false
                        ? mission?.clientInfo?.clientContact?.lastName
                            ?.causeNonValidation
                        : null
                    }
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
                <div className="relative ">
                  <Textinput
                    name="prenom"
                    label="Prenom"
                    type="text"
                    placeholder="Votre prenom"
                    className="bg-transparent rounded-xl"
                    defaultValue={
                      mission?.clientInfo?.clientContact?.firstName?.value
                    }
                    disabled={
                      mission?.clientInfo?.clientContact?.firstName
                        ?.validated !== false
                        ? true
                        : false
                    }
                  />
                  <Icon
                    className={`absolute top-0 right-0 ${
                      getTheRightIcon(
                        mission?.clientInfo?.clientContact?.firstName?.validated
                      ).color
                    }`}
                    icon={
                      getTheRightIcon(
                        mission?.clientInfo?.clientContact?.firstName?.validated
                      ).icon
                    }
                  />
                </div>
                <div className="relative ">
                  <Textinput
                    name="email"
                    label="Addresse e-mail"
                    type="email"
                    placeholder="Votre addresse e-mail"
                    className="bg-transparent rounded-xl"
                    defaultValue={
                      mission?.clientInfo?.clientContact?.email?.value
                    }
                    disabled={
                      mission?.clientInfo?.clientContact?.email?.validated !==
                      false
                        ? true
                        : false
                    }
                  />
                  <Icon
                    className={`absolute top-0 right-0 ${
                      getTheRightIcon(
                        mission?.clientInfo?.clientContact?.email?.validated
                      ).color
                    }`}
                    icon={
                      getTheRightIcon(
                        mission?.clientInfo?.clientContact?.email?.validated
                      ).icon
                    }
                  />
                </div>
                <div className="relative ">
                  <Textinput
                    name="poste"
                    label="Poste"
                    type="text"
                    placeholder="Votre poste"
                    className="bg-transparent rounded-xl"
                    defaultValue={
                      mission?.clientInfo?.clientContact?.position?.value
                    }
                    disabled={
                      mission?.clientInfo?.clientContact?.position
                        ?.validated !== false
                        ? true
                        : false
                    }
                  />
                  <Icon
                    className={`absolute top-0 right-0 ${
                      getTheRightIcon(
                        mission?.clientInfo?.clientContact?.position?.validated
                      ).color
                    }`}
                    icon={
                      getTheRightIcon(
                        mission?.clientInfo?.clientContact?.position?.validated
                      ).icon
                    }
                  />
                </div>
                <div className="relative ">
                  <Textinput
                    name="phone"
                    label="Numéro de téléphone"
                    type="text"
                    placeholder="Votre numéro de téléphone"
                    className="bg-transparent rounded-xl"
                    defaultValue={
                      mission?.clientInfo?.clientContact?.phoneNumber?.value
                    }
                    disabled={
                      mission?.clientInfo?.clientContact?.phoneNumber
                        ?.validated !== false
                        ? true
                        : false
                    }
                  />
                  <Icon
                    className={`absolute top-0 right-0 ${
                      getTheRightIcon(
                        mission?.clientInfo?.clientContact?.phoneNumber
                          ?.validated
                      ).color
                    }`}
                    icon={
                      getTheRightIcon(
                        mission?.clientInfo?.clientContact?.phoneNumber
                          ?.validated
                      ).icon
                    }
                  />
                </div>
                <div className="relative ">
                  <Textinput
                    name="company"
                    label="Entreprise"
                    type="text"
                    placeholder="Votre Entreprise"
                    className="bg-transparent rounded-xl"
                    defaultValue={mission?.clientInfo?.company?.value}
                    disabled={
                      mission?.clientInfo?.company?.validated !== false
                        ? true
                        : false
                    }
                  />
                  <Icon
                    className={`absolute top-0 right-0 ${
                      getTheRightIcon(mission?.clientInfo?.company?.validated)
                        .color
                    }`}
                    icon={
                      getTheRightIcon(mission?.clientInfo?.company?.validated)
                        .icon
                    }
                  />
                </div>
              </div>
            </div>
            <div className="pb-12">
              <h6 className="font-semibold">Information du mission</h6>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 mt-6 sm:pr-[250px]">
                <div className="relative ">
                  <Textinput
                    name="metier"
                    label="Métier"
                    type="text"
                    placeholder="métier"
                    className="bg-transparent rounded-xl"
                    defaultValue={mission?.missionInfo?.profession?.value}
                    disabled={
                      mission?.missionInfo?.profession?.validated !== false
                        ? true
                        : false
                    }
                    comment={
                      mission?.missionInfo?.profession?.validated === false
                        ? mission?.clientInfo?.clientContact?.lastName
                            ?.causeNonValidation
                        : null
                    }
                  />
                  <Icon
                    className={`absolute top-0 right-0 ${
                      getTheRightIcon(
                        mission?.missionInfo?.profession?.validated
                      ).color
                    }`}
                    icon={
                      getTheRightIcon(
                        mission?.missionInfo?.profession?.validated
                      ).icon
                    }
                  />
                </div>
                <div className="relative ">
                  <Textinput
                    name="secteur"
                    label="Secteur"
                    type="text"
                    placeholder="Votre prenom"
                    className="bg-transparent rounded-xl"
                    defaultValue={mission?.missionInfo?.industrySector?.value}
                    disabled={
                      mission?.missionInfo?.industrySector?.validated !== false
                        ? true
                        : false
                    }
                  />
                  <Icon
                    className={`absolute top-0 right-0 ${
                      getTheRightIcon(
                        mission?.missionInfo?.industrySector?.validated
                      ).color
                    }`}
                    icon={
                      getTheRightIcon(
                        mission?.missionInfo?.industrySector?.validated
                      ).icon
                    }
                  />
                </div>
                <div className="relative ">
                  <Textinput
                    name="client"
                    label="Client finale"
                    type="text"
                    placeholder="client finale"
                    className="bg-transparent rounded-xl"
                    defaultValue={mission?.missionInfo?.finalClient?.value}
                    disabled={
                      mission?.missionInfo?.finalClient?.validated !== false
                        ? true
                        : false
                    }
                  />
                  <Icon
                    className={`absolute top-0 right-0 ${
                      getTheRightIcon(
                        mission?.missionInfo?.finalClient?.validated
                      ).color
                    }`}
                    icon={
                      getTheRightIcon(
                        mission?.missionInfo?.finalClient?.validated
                      ).icon
                    }
                  />
                </div>
                <div className="relative ">
                  <Textinput
                    name="simulation"
                    label="simulation"
                    type="text"
                    placeholder="Votre poste"
                    className="bg-transparent rounded-xl"
                    defaultValue={mission?.missionInfo?.simulation?.value}
                    disabled={
                      mission?.missionInfo?.simulation?.validated !== false
                        ? true
                        : false
                    }
                  />
                  <Icon
                    className={`absolute top-0 right-0 ${
                      getTheRightIcon(
                        mission?.missionInfo?.simulation?.validated
                      ).color
                    }`}
                    icon={
                      getTheRightIcon(
                        mission?.missionInfo?.simulation?.validated
                      ).icon
                    }
                  />
                </div>
                <div className="relative ">
                  <Textinput
                    name="tjm"
                    label="TJM"
                    type="text"
                    placeholder="tjm"
                    className="bg-transparent rounded-xl"
                    defaultValue={mission?.missionInfo?.dailyRate?.value}
                    disabled={
                      mission?.missionInfo?.dailyRate?.validated !== false
                        ? true
                        : false
                    }
                  />
                  <Icon
                    className={`absolute top-0 right-0 ${
                      getTheRightIcon(
                        mission?.missionInfo?.dailyRate?.validated
                      ).color
                    }`}
                    icon={
                      getTheRightIcon(
                        mission?.missionInfo?.dailyRate?.validated
                      ).icon
                    }
                  />
                </div>
                <div className="relative ">
                  {mission?.missionInfo?.startDate?.validated !== false ? (
                    <div>
                      <label className={`block capitalize text-sm mb-3 }`}>
                        Date debut
                      </label>
                      <div className="bg-slate-50 p-2 rounded-lg border text-sm cursor-not-allowed">
                        {format(
                          new Date(mission?.missionInfo?.startDate?.value),
                          "MM/dd/yyyy"
                        )}{" "}
                      </div>
                    </div>
                  ) : (
                    <Textinput
                      name="debut"
                      label="Date debut"
                      type="date"
                      placeholder="date debut"
                      className="bg-transparent rounded-xl"
                    />
                  )}
                  <Icon
                    className={`absolute top-0 right-0 ${
                      getTheRightIcon(
                        mission?.missionInfo?.startDate?.validated
                      ).color
                    }`}
                    icon={
                      getTheRightIcon(
                        mission?.missionInfo?.startDate?.validated
                      ).icon
                    }
                  />
                </div>
                <div className="relative ">
                  {mission?.missionInfo?.endDate?.validated !== false ? (
                    <div>
                      <label className={`block capitalize text-sm mb-3 }`}>
                        Date debut
                      </label>
                      <div className="bg-slate-50 p-2 rounded-lg border text-sm cursor-not-allowed">
                        {format(
                          new Date(mission?.missionInfo?.endDate?.value),
                          "MM/dd/yyyy"
                        )}{" "}
                      </div>
                    </div>
                  ) : (
                    <Textinput
                      name="fin"
                      label="Date fin"
                      type="date"
                      placeholder="date debut"
                      className="bg-transparent rounded-xl"
                    />
                  )}
                  <Icon
                    className={`absolute top-0 right-0 ${
                      getTheRightIcon(mission?.missionInfo?.endDate?.validated)
                        .color
                    }`}
                    icon={
                      getTheRightIcon(mission?.missionInfo?.endDate?.validated)
                        .icon
                    }
                  />
                </div>
                <div className="relative ">
                  {mission?.missionInfo?.isSimulationValidated?.validated !==
                  false ? (
                    <div>
                      <label className={`block capitalize text-sm mb-3 }`}>
                        Fichier simulation
                      </label>
                      <div className="bg-slate-50 p-2 rounded-lg border text-sm cursor-not-allowed">
                        <iframe
                        className="w-full h-[300px]"
                          src={
                            mission?.missionInfo?.isSimulationValidated?.value
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    <Fileinput
                      name="simulationfile"
                      label="choisir un fichier"
                      placeholder="Simulation"
                      // className={`pl-3 ${!!error && "border-2 border-danger-500"} `}
                      className={`pl-3 `}
                    />
                  )}
                  <Icon
                    className={`absolute top-0 right-0 ${
                      getTheRightIcon(
                        mission?.missionInfo?.isSimulationValidated?.validated
                      ).color
                    }`}
                    icon={
                      getTheRightIcon(
                        mission?.missionInfo?.isSimulationValidated?.validated
                      ).icon
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ConsultantMissionDetailsPage;

{
  /* <div>
            <h6 className="font-semibold">Documents Associés</h6>
            <div className="flex sm:flex-row flex-col gap-4 mt-8">
              <div className="flex flex-col items-center justify-between border rounded-lg p-6">
                <div className="flex item-center gap-2">
                  <Icon
                    icon="heroicons:identification"
                    className="text-red-400"
                    width={25}
                  />
                  <p className="text-xl font-semibold">CIN</p>
                </div>
                <p className="text-gray-400 text-sm mt-2">Invoice date:</p>
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
              <div className="flex flex-col items-center justify-between border rounded-lg p-6">
                <div className="flex item-center gap-2">
                  <Icon
                    icon="heroicons:identification"
                    className="text-purple-400"
                    width={25}
                  />
                  <p className="text-xl font-semibold">RIB</p>
                </div>
                <p className="text-gray-400 text-sm mt-2">Invoice date:</p>
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
          </div> */
}
