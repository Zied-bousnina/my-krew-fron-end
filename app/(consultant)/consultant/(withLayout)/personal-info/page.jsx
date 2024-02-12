"use client";
import Icon from "@/components/ui/Icon";
import React from "react";
import Image from "next/image";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";

const ConsultantPersonalInfoPage = () => {
  return (
    <div className="lg:col-span-8 col-span-12 space-y-5">
      <div className="flex gap-6 items-center pb-8">
        <Icon icon="heroicons:question-mark-circle" width={35} />
        <h1 className="font-extra text-4xl">Mes Infos Perso</h1>
      </div>
      <div className="flex items-center gap-6 pb-12">
        <Image
          src="/assets/images/users/user-1.jpg"
          width={75}
          height={75}
          className="rounded-lg"
        />
        <h5 className=" font-semibold">Mohamed Amine Laziz</h5>
        <div>
          <Icon icon="heroicons:pencil-square" width={25} />
        </div>
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
          />
          <Textinput
            name="contact"
            label="Poste du contact"
            type="text"
            placeholder="Votre poste du contact"
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
            label="Société"
            type="text"
            placeholder="Votre société"
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
            <p className="text-gray-400 text-sm mt-2">
              Invoice date: 12/04/2024
            </p>
            {/*image*/}
            <Image
              src="/assets/images/flags/gn.png"
              width={250}
              height={150}
              className="mt-6"
            />
            {/*button*/}
            <div className="mt-6 flex justify-between items-center gap-2">
              <Button
                className="text-[#369ae7] text-sm font-light px-6 py-2 rounded-full bg-[#f0f8fc] "
                icon="heroicons:arrow-down-tray"
                iconPosition="right"
                iconClass="w-4"
                text="Télécharger"
              />
              <Button
                className="text-[#be6e25] text-sm font-light px-6 py-2 rounded-full bg-[#fff6df] "
                icon="heroicons:arrow-up-tray"
                iconPosition="right"
                iconClass="w-4"
                text="Remplacer"
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
              <p className="text-xl font-semibold">Permis de conduire</p>
            </div>
            {/*ivoice date */}
            <p className="text-gray-400 text-sm mt-2">
              Invoice date: 12/04/2024
            </p>
            {/*image*/}
            <Image
              src="/assets/images/flags/gn.png"
              width={250}
              height={150}
              className="mt-6"
            />
            {/*button*/}
            <div className="mt-6 flex justify-between items-center gap-2">
              <Button
                className="text-[#369ae7] text-sm font-light px-6 py-2 rounded-full bg-[#f0f8fc] "
                icon="heroicons:arrow-down-tray"
                iconPosition="right"
                iconClass="w-4"
                text="Télécharger"
              />
              <Button
                className="text-[#be6e25] text-sm font-light px-6 py-2 rounded-full bg-[#fff6df] "
                icon="heroicons:arrow-up-tray"
                iconPosition="right"
                iconClass="w-4"
                text="Remplacer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantPersonalInfoPage;
