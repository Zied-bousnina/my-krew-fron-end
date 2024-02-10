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
import { useEffect, useState } from "react";
import Input from "postcss/lib/input";
import GlobalFilter from "@/components/partials/table/GlobalFilter";
import ConfirmationPopup from "@/components/ui/ConfirmationPopup";
import InputBox from "@/components/ui/InputBox";
import Contact from "@/components/ui/Contact";
import Document from "@/components/ui/Document";
import { useDispatch } from "react-redux";
import { handleFetchConsultants } from "@/store/rhreducer";
import { useSelector } from "react-redux";
import MissionConsultantTable from "@/components/partials/table/missionsConsultantTable";

const ProjectPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("Tous les Consultants");
  const  {consultants}  = useSelector((state) => state.rhconsultant);
const dispatch = useDispatch()
  useEffect(() => {
    dispatch(handleFetchConsultants())

  }, [])

  console.log(consultants)
  return (
    <>
      <div className="space-y-5 p-4">
        {/* <HomeBredCurbs title="Tableau de bord - RH" notification={false} /> */}
        <div className="grid grid-cols-12 gap-5">
          <div className="lg:col-span-5 col-span-12 space-y-5">
            <div className="relative">
              {/* <div className="absolute left-0">
              <Image
                src="/assets/icons/search.svg"
                alt="search"
                className="w-5 h-5 "
              />
            </div> */}
              <GlobalFilter />
              <Button
                text="Rechercher"
                className="absolute right-2 top-2 bg-black-500 text-white text-[14px] font-semibold w-[120px] h-[35px] flex items-center justify-center rounded-[10px]"
              />
            </div>
            {/* </Card> */}
            <Card className="bg-white border border-[#EAE3D5]">
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src="/assets/images/all-img/thumb-4.png"
                    className="w-[75px] h-[75px]"
                  />
                  <div className="flex items-start gap-1 flex-col">
                    <span className="text-[13px] text-[#B1AA9A]">
                      Consultant
                    </span>
                    <p className="text-[22px] font-bold text-[#503515]">
                      bousnina zied
                    </p>
                  </div>
                </div>
                <div className="w-10 h-10 flex items-center justify-center bg-[#F7F5EF] rounded-full cursor-pointer hover:bg-[#EAE3D5]">
                  <Image
                    src="/assets/icons/edit-pen.svg"
                    className="w-5 h-5 "
                  />
                </div>
              </div>
              <div className="mt-2 py-4 flex items-center gap-2 border-b-2 border-dotted  border-[#EFEBE1]">
                <div className="flex items-center bg-[#F7F5EF] px-3 rounded-[6px] gap-2 min-w-[127px] h-[36px] cursor-pointer">
                  <Image src="/assets/icons/chat.svg" className="w-4 h-4" />
                  <p className="text-[#503515] text-[14px]">Envoyer mail</p>
                </div>
                <div className="flex items-center justify-between bg-[#F7F5EF] px-3 rounded-[6px] gap-2 min-w-[127px] h-[36px] cursor-pointer">
                  <Image src="/assets/icons/plus.svg" className="w-4 h-4" />
                  <p className="text-[#503515] text-[14px]">Nv Virement</p>
                  <Image
                    src="/assets/icons/arrow-down.svg"
                    className="w-4 h-4"
                  />
                </div>
              </div>

              <div className="flex items-start flex-col gap-2 py-4  border-b-2 border-dotted  border-[#EFEBE1]">
                <Contact icon="/assets/icons/alt.svg" text="zied@gmail.com" />
                <Contact icon="/assets/icons/phone.svg" text="55 184 192" />
                <Contact
                  icon="/assets/icons/office.svg"
                  text="Menzel Temime, Nabeul, Tunisie"
                />
              </div>
              <div className="flex items-start flex-col gap-2 py-4  border-b-2 border-dotted  border-[#EFEBE1]">
                <Contact label="Nationalité" text="Tunisien" isBadge={true} />
                <Contact label="RIB" text="215-754876265862258" />
                <Contact label="N° Sécurité " text="CN-12548552" />
              </div>
              <div className="flex items-start flex-col gap-2 py-4  ">
                <Contact label="Documents Assocciés" text="05" />
                <div className="flex flex-col gap-2">
                  <Document
                    title="Fichier Simulation"
                    icon="/assets/icons/document.svg"
                    date="May 29, 2022"
                    bgColor="bg-[#DD6E42]/20"
                  />
                  <Document
                    title="Permis de Conduire"
                    icon="/assets/icons/document.svg"
                    date=" Feb 13, 2022"
                    bgColor="bg-[#A67DB8]/20"
                  />
                </div>

                <div className="w-full flex  justify-end mt-2">
                  <p className="text-[14px] text-[#503515] ">Tout Afficher</p>
                </div>
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
            <MissionConsultantTable consultants={consultants} />
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
