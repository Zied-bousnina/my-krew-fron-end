"use client";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import GroupChart4 from "@/components/partials/widget/chart/group-chart-4";
import DonutChart from "@/components/partials/widget/chart/donut-chart";
import BasicArea from "@/components/partials/chart/appex-chart/BasicArea";
import SelectMonth from "@/components/partials/SelectMonth";
import TaskLists from "@/components/partials/widget/task-list";
import MessageList from "@/components/partials/widget/message-list";
import TrackingParcel from "@/components/partials/widget/activity";
import TeamTable from "@/components/partials/table/team-table";
import { meets, files } from "@/constant/data";
import CalendarView from "@/components/partials/widget/CalendarView";
import HomeBredCurbs from "@/components/partials/HomeBredCurbs";
import ImageBlock1 from "@/components/partials/widget/block/image-block-1";
import TransactionsTable from "@/components/partials/table/transactions";
import Button from "@/components/ui/Button";
import Image from "@/components/ui/Image";
import FilterTableItem from "@/components/ui/FilterTableItem";
import { useState } from "react";
import Input from "postcss/lib/input";
import GlobalFilter from "@/components/partials/table/GlobalFilter";
import ConfirmationPopup from "@/components/ui/ConfirmationPopup";
import InputBox from "@/components/ui/InputBox";
import Contact from "@/components/ui/Contact";
import Document from "@/components/ui/Document";
import StatisticBox from "@/components/ui/StatisticBox";
import ValidationStep from "@/components/ui/ValidationStep";

const ProjectPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("Tous les Consultants");

  return (
    <>
      <div className="space-y-5 p-4">
        {/* <HomeBredCurbs
          title="Validation Missions "
          subTitle="Mission de zied - "
          variant="Ste Magaztee"
          notification={false}
        /> */}
        <h1 className="text-[36px] font-semibold text-3xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
        Validation Missions

        </h1>
        <br/>
        <p className="text-[36px] font-semibold">
            <span>Mission de zied -</span>
            <span className="text-[23px] text-[#68461F] italic">ste </span>
          </p>

        <div className="grid grid-cols-12 gap-5">
          <div className="lg:col-span-4 col-span-12 space-y-5">
            {/* </Card> */}
            <Card className="bg-[#F7F5EF] border border-[#EAE3D5]">
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center justify-between gap-4 w-full">
                  <h2 className="text-[#503515] text-[20px] font-bold">
                    Statistiques Demandes
                  </h2>
                  <Image src="/assets/icons/logout.svg" className="w-7 h-7" />
                </div>
              </div>
              <div className="mt-6 flex flex-col items-start gap-4">
                <StatisticBox
                  icon="/assets/icons/roadmap.svg"
                  title="Demandes de Préinscription"
                  numberOfNotifications={5}
                  isSelected={true}
                />
                <StatisticBox
                  icon="/assets/icons/loader.svg"
                  title="Demandes de Préinscription"
                  numberOfNotifications={5}
                />
                <StatisticBox
                  icon="/assets/icons/seen.svg"
                  title="Demandes non traitées"
                  numberOfNotifications={5}
                />
              </div>
            </Card>
            {/* <Card>
              <div className="grid grid-cols-9 gap-5">
                <div className="2xl:col-span-3 lg:col-span-4 col-span-12">
                  <ImageBlock1
                    title="Chiffre d’Affaire"
                    amount="67 000 €"
                    growth="20"
                  />
                </div>
                <div className="2xl:col-span-3 lg:col-span-4 col-span-12">
                  <ImageBlock1
                    title="TJM Moyen"
                    amount="650€"
                    amountColor="text-[#1E1E1E]"
                    bgColor="bg-[#FEFCF1]"
                    border="border border-[#EAE3D5]"
                  />
                </div>
                <div className="2xl:col-span-3 lg:col-span-4 col-span-12">
                  <ImageBlock1
                    title="Nb de Consultants"
                    amount="550"
                    amountColor="text-[#1E1E1E]"
                    bgColor="bg-[#FEFCF1]"
                    border="border border-[#EAE3D5]"
                  />
                </div>
              </div>
            </Card>

            <div className="flex items-center gap-4">
              <FilterTableItem
                icon="/assets/icons/burger.svg"
                alt="Burger"
                additionalClasses="justify-center"
              />
              <FilterTableItem
                icon="/assets/icons/filter.svg"
                alt="filter"
                text="Sort: Last updated"
              />
              <div
                className={`min-w-[39px] h-[38px] rounded-[10px] border border-[#EAE3D5] flex items-center gap-2  bg-white cursor-pointer`}
              >
                <div
                  className={`min-w-[39px] h-full p-2 rounded-tl-[10px] rounded-bl-[10px] text-[13px] ${
                    selectedFilter === "Tous les Consultants"
                      ? "bg-[#EAE3D5]"
                      : ""
                  }`}
                  onClick={() => setSelectedFilter("Tous les Consultants")}
                >
                  Tous les Consultants
                </div>
                <div
                  className={`min-w-[39px] h-full p-2 rounded-tr-[10px] rounded-br-[10px] text-[13px]
                ${selectedFilter === "Missions" ? "bg-[#EAE3D5]" : ""}
              `}
                  onClick={() => setSelectedFilter("Missions")}
                >
                  Missions
                </div>
              </div>

              <FilterTableItem text="Ajouter un Consultant" />
              <FilterTableItem text="Export List" />
            </div> */}

            {/* <TransactionsTable /> */}
          </div>
          <div className="lg:col-span-7 col-span-12 space-y-5">
            <Card className="bg-white border border-[#EAE3D5]">
              <div className="w-full flex flex-col gap-6">
                <h2 className="text-[28px] text-[#171A1F] font-bold">
                  Validation du Processus
                </h2>
                <div>
                  <Contact label="Type" isBadge={true} text="Préinscription" />
                  <Contact label="Demendeur">
                    <div className="flex items-center gap-2">
                      <Image src="/assets/images/all-img/user.png" />
                      <p className="text-[14px] text-[#171A1F] font-semibold">
                        bousnina zied
                      </p>
                    </div>
                  </Contact>
                </div>

                <div className="flex flex-col gap-2">
                  <ValidationStep
                    stepNumber={1}
                    step="Validation Informations Personnelles"
                    state="Valideé"
                  />
                  <ValidationStep
                    stepNumber={2}
                    step="Validation Informations Personnelles"
                    state="Valideé"
                  />
                  <ValidationStep
                    stepNumber={3}
                    step="Validation Informations Personnelles"
                    state="En Cours"
                  />
                  <ValidationStep
                    stepNumber={4}
                    step="Validation Informations Personnelles"
                    state="En attente"
                  />

                  <div>
                    <Contact
                      label="Nationalité"
                      text="Terminer la mission"
                      bgColor="bg-[#DE3B40]/10"
                      textColor="text-[#DE3B40]"
                      badgeIcon="/assets/icons/close.svg"
                      isBadge={true}
                    />
                  </div>
                </div>
                <Card className="bg-white border border-[#EAE3D5]">
                  <div className="flex flex-col items-start justify-between gap-6">
                    <div className="flex items-start gap-6">
                      <div className="flex items-center gap-1 border-b-2 border-[#E9E2CF] cursor-pointer">
                        <Image
                          src="/assets/icons/share-left.svg"
                          className="w-3 h-3"
                        />
                        <p className="text-[12px] font-bold text-[#68461F]">
                          Note au consultant
                        </p>
                      </div>
                      <div className="flex items-center gap-1 cursor-pointer">
                        <Image
                          src="/assets/icons/edit-pen.svg"
                          className="w-3 h-3"
                        />
                        <p className="text-[12px] font-bold text-[#68461F]">
                          Note au consultant
                        </p>
                      </div>
                    </div>

                    <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Votre contrat n'a pas été validé par le client vu le
                      montant TJM proposé">

                      

                    </textarea>

                    <div className="w-full flex items-center justify-between mt-5">
                      <div className="flex items-center gap-2">
                        <Image
                          src="/assets/icons/text.svg"
                          className="w-4 h-4  cursor-pointer"
                        />
                        <Image
                          src="/assets/icons/smile.svg"
                          className="w-4 h-4 cursor-pointer"
                        />
                        <Image
                          src="/assets/icons/attach.svg"
                          className="w-4 h-4 cursor-pointer"
                        />
                      </div>
                      <Button
                        text="Envoyer la note"
                        className="bg-black-500 text-white w-[132px] h-[35px] text-[11px] flex items-center justify-center"
                      />
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </div>
        </div>
        {/* <div className="grid xl:grid-cols-3 grid-cols-1 gap-5">
        <Card title="Task list" headerslot={<SelectMonth />}>
          <TaskLists />
        </Card>
        <Card title="Messages" headerslot={<SelectMonth />}>
          <MessageList />
        </Card>
        <Card title="Activity" headerslot={<SelectMonth />}>
          <TrackingParcel />
        </Card>
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="xl:col-span-8 lg:col-span-7 col-span-12">
          <Card title="Team members" noborder>
            <TeamTable />
          </Card>
        </div>
        <div className="xl:col-span-4 lg:col-span-5 col-span-12">
          <Card title="Files" headerslot={<SelectMonth />}>
            <ul className="divide-y divide-slate-100 dark:divide-slate-700">
              {files.map((item, i) => (
                <li key={i} className="block py-[8px]">
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <div className="flex-1 flex space-x-2 rtl:space-x-reverse">
                      <div className="flex-none">
                        <div className="h-8 w-8">
                          <img
                            src={item.img}
                            alt=""
                            className="block w-full h-full object-cover rounded-full border hover:border-white border-transparent"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <span className="block text-slate-600 text-sm dark:text-slate-300">
                          {item.title}
                        </span>
                        <span className="block font-normal text-xs text-slate-500 mt-1">
                          {item.date}
                        </span>
                      </div>
                    </div>
                    <div className="flex-none">
                      <button
                        type="button"
                        className="text-xs text-slate-900 dark:text-white"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div> */}
      </div>
    </>
  );
};

export default ProjectPage;
