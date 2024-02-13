"use client";

import BasicArea from "@/components/partials/chart/appex-chart/BasicArea";
import Button from "@/components/ui/Button";

import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Textarea from "@/components/ui/Textarea";
import EventCalendar from "@/components/ui/event-calendar";
import React, { useState } from "react";
import SignatureCanvas from "react-signature-canvas";

const ConsultantCompteRenduActivitePage = () => {
  const canvasRef = React.useRef(null);
  console.log("canvasRef:",canvasRef);
  return (
    <div className="space-y-5">
      {/* <HomeBredCurbs title="Tableau de bord - RH" /> */}
      <div className="grid grid-cols-12 gap-5">
        <div className="lg:col-span-8 col-span-12 space-y-5">
          {/*title */}
          <div className="flex gap-6 items-center pb-4">
            <Icon icon="heroicons:document-text" width={35} />
            <h1 className="font-bold text-4xl ">Compte Rendu d'activié</h1>
          </div>
          {/*body*/}

          {/*information section */}
          <div className=" border border-x-0 border-y-slate-800 p-8 mr-0 sm:mr-8 ">
            <h4 className="font-semibold lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4 mb-6">
              Informations
            </h4>
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-md bg-[#f6f7f3] border border-slate-800">
                <Icon
                  icon="heroicons:clock"
                  className="text-[#b4b1a9]"
                  width={25}
                />
              </div>
              <p className="text-md font-semibold">20J.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center mt-6">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-md bg-[#f6f7f3] border border-slate-800">
                  <Icon
                    icon="heroicons:credit-card"
                    className="text-[#b4b1a9]"
                    width={25}
                  />
                </div>
                <p className="text-md font-semibold">PORTAGE LAB</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="p-2 rounded-md bg-[#f6f7f3] border border-slate-800">
                  <Icon
                    icon="heroicons:wallet"
                    className="text-[#b4b1a9]"
                    width={25}
                  />
                </div>
                <p className="text-md font-semibold">CAFE CREME</p>
              </div>
            </div>
          </div>
          {/*note globale section */}
          <div className="border border-x-0 border-t-0 border-b-slate-800 px-12 pb-12 pt-4 mr-0 sm:mr-8">
            <h4 className="font-semibold lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4 mb-6">
              Note globale
            </h4>
            <Textarea
              row={6}
              placeholder="note sure le compte rendu d'activité"
            />
          </div>
          {/*personnalisation section */}
          <div className=" px-12 pb-12 pt-4 mr-0 sm:mr-8">
            <h4 className="font-semibold lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4 mb-6">
              Personnalisation
            </h4>
            <p className="mb-2">Ajouter ma signature:</p>
            <div className="flex">
              <div className="border-2 border-slate-800 border-dashed rounded-lg ">
                <SignatureCanvas
                  ref={canvasRef}
                  penColor="black"
                  canvasProps={{ className: "sigCanvas" }}
                />
              </div>
            </div>
            <div className="flex mt-3">
            <Button
            onClick={()=>canvasRef.current.clear()}
              text=" Enregistrer ma signature"
              className="btn btn-dark rounded-lg hover:bg-opacity-80 text-white py-2 px-4"
            />
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 col-span-12 space-y-5">
          <EventCalendar />

          <div className="flex p-2 rounded-lg bg-[#f6f7f3] gap-2">
            <Button
              text=" Enregistrer"
              className="border bg-white rounded-lg hover:bg-[#fefdf0]  py-2 px-4"
            />
            <Button
              text=" Télécharger le PDF"
              className="border bg-[#00c97b] rounded-lg hover:bg-opacity-80 text-white py-2 px-4"
            />
            <Button
              text="Partager"
              className="border bg-[#00c97b] rounded-lg hover:bg-opacity-80 text-white py-2 px-4"
            />
            <Button
              text="Supprimer"
              className="border bg-danger-500 rounded-lg hover:bg-opacity-80 text-white py-2 px-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantCompteRenduActivitePage;
