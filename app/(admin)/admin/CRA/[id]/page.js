"use client";

import { consultantService } from "@/_services/consultant.service";
import { rhServices } from "@/_services/rh.service";
import Loading from "@/app/loading";
import Button from "@/components/ui/Button";
import Contact from "@/components/ui/Contact";
import Document from "@/components/ui/Document";
import Icon from "@/components/ui/Icon";
import Textarea from "@/components/ui/Textarea";
import EventCalendar from "@/components/ui/event-calendar";
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from "date-fns";
import { fr } from "date-fns/locale";
import ValidationCRA from "@/components/ui/ValidationCRA";
import React, { useEffect, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import ReactToPrint from "react-to-print";

const ConsultantCompteRenduActivitePage = ({params}) => {
  const canvasRef = React.useRef(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const componentRef = React.useRef();
  const [currentConsultant, setCurrentConsultant] = useState({});
  const [signatureUrl, setSignatureUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const saveSignature = () => {
    // Assuming you have a button to trigger this function
    const signatureDataUrl = canvasRef.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
    setSignatureUrl(signatureDataUrl);
  };

  const deleteSignature = () => {
    canvasRef.current.clear();
    setSignatureUrl("");
  };

  const getCurrentConsultant = () => {
    setIsLoading(true);
    rhServices
      .getCRAinfoByMissionId(params.id)
      .then((res) => {
        console.log(res)
        setCurrentConsultant(res);
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
  const switchValidation = (value) => {
    switch (value) {
      case 'VALIDATED':
        return 'Valideé';
      case 'PENDING':
        return 'En cours';
      case 'NOTVALIDATED':
        return 'Refusé';
      default:
        // Handle other cases or invalid values
        return 'En attente';
    }
  };
console.log(" {currentConsultant?.cra?.userId?.preRegister?.personalInfo?.firstName?.value}",  currentConsultant)
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
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
                    Consultant :
                  </div>
                  <p className="text-md font-semibold">
                    {currentConsultant?.cra?.userId?.preRegister?.personalInfo?.firstName?.value} {" "}  {currentConsultant?.cra?.userId?.preRegister?.personalInfo?.lastName?.value}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center mt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-md bg-[#f6f7f3] border border-slate-800">
                     Email:
                    </div>
                    <p className="text-md font-semibold"> {currentConsultant?.cra?.userId?.preRegister?.personalInfo?.email?.value}</p>
                  </div>

                </div>
              </div>
              {/*note globale section */}
              <div className="border border-x-0 border-t-0 border-b-slate-800 px-12 pb-12 pt-4 mr-0 sm:mr-8">
                <h4 className="font-semibold lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4 mb-6">
                  CRA
                </h4>
                <div className="flex items-start flex-col gap-2 py-4  ">
                <Contact label="Documents Assocciés" text="05" />
                <div className="flex flex-col gap-2">
                {currentConsultant?.cra?.craFile ?<>


                  <Document
                    title="CRA"
                    icon="/assets/icons/document.svg"
                    date={new Date(currentConsultant?.cra?.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    bgColor="bg-[#DD6E42]/20"
                    url={currentConsultant?.cra?.craFile}
                  />
                   <ValidationCRA
                    stepNumber={1}
                    step="Validation CRA"
                    state={switchValidation(currentConsultant?.cra?.status)}
                    id={currentConsultant?.cra?._id}
                  />
                  </>
                  :
                  "Aucun fichier pour l'instant"
                }

                </div>


              </div>

              </div>
              {/*personnalisation section */}

            </div>
            <div className="lg:col-span-4 col-span-12 space-y-5">


            </div>
          </div>
          <div className="hidden">
            <PrintableCard
              ref={componentRef}
              currentConsultant={currentConsultant}
              selectedDates={selectedDates}
              signatureUrl={signatureUrl}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ConsultantCompteRenduActivitePage;

const PrintableCard = React.forwardRef(
  ({ currentConsultant, selectedDates, signatureUrl }, ref) => {
    // Get the current date
    const currentDate = new Date();

    // Define the start and end of the current month
    const startDate = startOfMonth(currentDate);
    const endDate = endOfMonth(currentDate);

    // Generate an array of dates for the current month
    const daysArray = eachDayOfInterval({ start: startDate, end: endDate });

    const isDaySelected = (day) => {
      return selectedDates.some(
        (selectedDate) =>
          new Date(selectedDate).getTime() === new Date(day).getTime()
      );
    };

    // Placeholder data for duration and note, this should come from your state or props
    const durationNoteData = daysArray.map((day, _) => {
      if (isDaySelected(day)) {
        return {
          duration: 1,
          note: "",
        };
      } else {
        return {
          duration: 0,
          note: "",
        };
      }
    });
    return (
      <div className="  bg-white  pb-4" ref={ref}>
        <div className="p-4">
          <p className="text-lg">Compte rendu d'activité</p>
          <p className="text-lg font-bold">
            {format(new Date(), "MMM yyyy", { locale: fr })} -{" "}
            {currentConsultant?.preRegister?.personalInfo?.firstName?.value +
              " " +
              currentConsultant?.preRegister?.personalInfo?.lastName?.value}
          </p>
        </div>
        <div className="px-4 flex gap-8">
          <div className="flex-1 flex flex-col justify-between ">
            <div className="flex flex-col gap-4">
              <div className="border border-slate-200 rounded-lg p-5">
                <div className="flex items-center gap-4">
                  <Icon icon="heroicons:clock" width={20} />
                  <p className="text-md font-semibold">Temps de travail</p>
                </div>
                <p className="pl-1 mt-4 mb-8 text-3xl font-bold">
                  {selectedDates.length}J.
                </p>
              </div>
              <div className="border border-slate-200 rounded-lg p-5">
                <div className="flex items-center gap-4">
                  <Icon icon="heroicons:briefcase" width={20} />
                  <p className="text-md font-semibold">Prestataire</p>
                </div>
                <p className="pl-1 mt-4 mb-8 text-3xl font-bold">
                  {currentConsultant?.preRegister?.clientInfo?.company?.value}
                </p>
              </div>
              <div className="border border-slate-200 rounded-lg p-5">
                <div className="flex items-center gap-4">
                  <Icon icon="heroicons:building-office" width={20} />
                  <p className="text-md font-semibold">Client</p>
                </div>
                <p className="pl-1 mt-4 mb-8 text-3xl font-bold">
                  {currentConsultant?.preRegister?.clientInfo?.clientContact
                    ?.firstName?.value +
                    " " +
                    currentConsultant?.preRegister?.clientInfo?.clientContact
                      ?.lastName?.value}
                </p>
                <p className="">
                  Email:{" "}
                  <span className="">
                    {
                      currentConsultant?.preRegister?.clientInfo?.clientContact
                        ?.email?.value
                    }
                  </span>
                </p>
                <p className="mt-1">
                  Tel:{" "}
                  <span className="">
                    {
                      currentConsultant?.preRegister?.clientInfo?.clientContact
                        ?.phoneNumber?.value
                    }
                  </span>
                </p>
              </div>
            </div>
            {signatureUrl !== "" && (
              <div className="flex justify-end mt-12">
                <img
                  src={signatureUrl}
                  className="h-[150px] w-[200px] border-2 border-slate-800 border-dashed rounded-lg p-4"
                />
              </div>
            )}
          </div>
          <div className="flex-1">
            <table className="w-full  border border-slate-200 rounded-xl ">
              <thead>
                <tr className="flex gap-4 items-center p-4">
                  <th>Jour</th>
                  <th>Durée</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody className="">
                {daysArray.map((day, index) => {
                  const { duration, note } = durationNoteData[index];
                  return (
                    <tr
                      key={index}
                      className={`flex gap-2 items-center px-4 py-2 text-slate-500 text-sm ${
                        duration === 0 && "bg-slate-100"
                      }`}
                    >
                      <td className="">
                        {format(day, "EEE d", { locale: fr })}
                      </td>
                      <td>{duration}</td>
                      <td>{note}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
);
