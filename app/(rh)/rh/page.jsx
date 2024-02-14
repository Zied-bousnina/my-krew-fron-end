  // "use client";
// import dynamic from "next/dynamic";
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
import { useEffect, useMemo, useState } from "react";
import Input from "postcss/lib/input";
import GlobalFilter from "@/components/partials/table/GlobalFilter";
import ConfirmationPopup from "@/components/ui/ConfirmationPopup";
import InputBox from "@/components/ui/InputBox";
import dynamic from "next/dynamic";
import RevenueBarChart from "@/components/partials/widget/chart/revenue-bar-chart";
import Modal from "@/components/ui/Modal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { handleFetchConsultants } from "@/store/rhreducer";
import Loading from "@/app/loading";
import Missions from "@/components/partials/table/missions";
import { set } from "react-hook-form";
import { rhServices } from "@/_services/rh.service";

const MostSales = dynamic(
  () => import("@/components/partials/widget/most-sales"),
  {
    ssr: false,
  }
);
const RhDashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState("Tous les Consultants");
  const [showAddConsultantPopup, setShowAddConsultantPopup] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const openAddConsultantPopupHandler = () => setShowAddConsultantPopup(true);
  const closeAddConsultantPopupHandler = () => setShowAddConsultantPopup(false);

  const openEditProfilePopupHandler = () => setShowEditProfile(true);
  const closeEditProfilePopupHandler = () => setShowEditProfile(false);

  const [filterMap, setFilterMap] = useState("usa");

  const [consultantV2, setconsultantV2] = useState([])
  const [isConsultLoading, setIsConsultLoading] = useState(false);
  const [isStatsLOading, setisStatsLOading] = useState(false);
const [statistiques, setstatistiques] = useState({})
const [missionsPending, setmissionsPending] = useState([])
const [missionsPendingLoading, setmissionsPendingLoading] = useState(false)

const getAllPendingMission = () => {
  setmissionsPendingLoading(true)
  rhServices.getPendingPreregistration().then((data) => {
    setmissionsPending(data);
    setmissionsPendingLoading(false)
  }).catch((err) => {
    setmissionsPendingLoading(false)
  })
  .finally(() => {
    setmissionsPendingLoading(false)
  })
}
  const getAllConsultant = () => {
    setIsConsultLoading(true);
    rhServices.getAllConsultant().then((data) => {
      console.log(data)
      setIsConsultLoading(false);
      setconsultantV2(data);


    }

    ).catch((err) => {

    })
    .finally(() => {
      setIsConsultLoading(false);
    });


  }

  const getstatistiques = ()=> {
    setisStatsLOading(true);
    rhServices.getStatistiques().then((data) => {
      setstatistiques(data);
      setisStatsLOading(false);

    }).catch((err) => {

      setisStatsLOading(false);
    })
    .finally(() => {
      setisStatsLOading(false);
    });

  }

useEffect(() => {
  getAllConsultant()
  getstatistiques()
  getAllPendingMission()
}, [])






  return (
    <>
         <Modal
        title="Export list"
        labelclassName="btn-outline-dark"
        activeModal={showEditProfile}
        onClose={closeEditProfilePopupHandler}
      >


          <div className="flex flex-col items-start justify-between gap-5 w-full">
            <div className="flex gap-4 items-center w-full">
              <Image
                src="/assets/images/all-img/thumb-4.png"
                className="w-[75px] h-[75px]"
              />
              <p className="text-[34px] text-[#1E1E1E] font-bold">Firoz NOM</p>
            </div>
            <p className="w-full flex justify-end text-[13px] font-bold text-[#1E1E1E]">
              Process de validation
            </p>
            <div className="flex flex-col gap-4 text-center  text-[18px] text-[#1E1E1E] w-full">
              <InputBox
                readOnly={true}
                isSwitched={true}
                placeholder="Prise de contact avec le client"
                additionalClasses="w-full"
              />
              <InputBox
                readOnly={true}
                isSwitched={true}
                placeholder="Contract de prestation validé avec le client"
                additionalClasses="w-full"
              />
              <InputBox
                readOnly={true}
                isSwitched={true}
                placeholder="Edition du contrat de travail"
                additionalClasses="w-full"
              />
              <InputBox
                readOnly={true}
                isSwitched={true}
                placeholder="Transmission et validation du contract"
                additionalClasses="w-full"
              />
            </div>
            <div className="w-full flex justify-end gap-4">
              <Button
                text="Terminer"
                className="bg-[#1E1E1E] w-[168px] h-[49px] text-white"
                onClick={closeEditProfilePopupHandler}
              />
            </div>
          </div>
          </Modal>


        <Modal
        title="Ajouter un consultant"
        labelclassName="btn-outline-dark"
        activeModal={showAddConsultantPopup}
        onClose={closeAddConsultantPopupHandler}
      >


          <div className="flex flex-col items-start justify-between gap-5 w-full">
            <div className="flex gap-4 items-center w-full">
              <Image
                src="/assets/images/all-img/thumb-4.png"
                className="w-[75px] h-[75px]"
              />
              <p className="text-[34px] text-[#1E1E1E] font-bold">Firoz NOM</p>
            </div>
            <div className="flex flex-col gap-4 text-center  text-[18px] text-[#1E1E1E] w-full">
              <InputBox placeholder="Prenom" additionalClasses="w-full" />
              <InputBox placeholder="Nom" additionalClasses="w-full" />
              <InputBox
                placeholder="Adresse e-mail"
                additionalClasses="w-full"
              />
              <InputBox
                placeholder="Numéro de téléphone"
                additionalClasses="w-full"
              />
              <InputBox
                placeholder="Date de naissance"
                additionalClasses="w-full"
              />
              <InputBox
                placeholder="Lieu de naissance"
                additionalClasses="w-full"
              />
              <InputBox placeholder="Nationalité" additionalClasses="w-full" />
            </div>
            <div className="w-full flex justify-end gap-4">
              <Button
                text="Annuler"
                className="bg-[#1E1E1E] w-[168px] h-[49px] text-white"
                onClick={closeAddConsultantPopupHandler}
              />
            </div>
          </div>
          </Modal>

      <div className="space-y-5">
        {/* <HomeBredCurbs title="Tableau de bord - RH" /> */}
        <div className="grid grid-cols-12 gap-5">
          <div className="lg:col-span-8 col-span-12 space-y-5">
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
            <Card>
              <BasicArea height={240} />
            </Card>
            <Card>
              <div className="grid grid-cols-9 gap-5">
                <div className="2xl:col-span-3 lg:col-span-4 col-span-12">
                  <ImageBlock1
                    title="Chiffre d’Affaire"
                    amount={statistiques?.totalRevenue?.toLocaleString('fr-FR', {style:'currency', currency: 'EUR'})}
                    growth="20"
                  />
                </div>
                <div className="2xl:col-span-3 lg:col-span-4 col-span-12">
                  <ImageBlock1
                    title="TJM Moyen"
                    amount={statistiques?.averageTJM?.toLocaleString('fr-FR', {style:'currency', currency: 'EUR'})}
                    amountColor="text-[#1E1E1E]"
                    bgColor="bg-[#FEFCF1]"
                    border="border border-[#EAE3D5]"
                  />
                </div>
                <div className="2xl:col-span-3 lg:col-span-4 col-span-12">
                  <ImageBlock1
                    title="Nb de Consultants"
                    amount={statistiques?.numberOfConsultants}
                    amountColor="text-[#1E1E1E]"
                    bgColor="bg-[#FEFCF1]"
                    border="border border-[#EAE3D5]"
                  />
                </div>
              </div>
            </Card>


{
  !isConsultLoading  ?
  ( selectedFilter =="Tous les Consultants" ?
            <TransactionsTable consultants={consultantV2} />
  :
  (
    missionsPendingLoading ?  <Loading /> :

  <Missions consultants={missionsPending} />
  )

  )
            :
            <Loading />

}
          </div>
          <div className="lg:col-span-4 col-span-12 space-y-5">
            <Card
              title="Historique des demandes"
              className="border border-[#EAE3D5] bg-white relative"
            >
              <span className="absolute top-7 right-4 text-[13px] font-semibold text-[#D8CCB2] cursor-pointer hover:border-b hover:border-[#D8CCB2]">
                Voir tout {">"}
              </span>
              <MessageList />
            </Card>
            <Card
              title="Nos consultants"
              className="border border-[#EAE3D5] bg-white relative"
            >
              <span className="absolute top-7 right-4 text-[13px] font-semibold text-[#D8CCB2] cursor-pointer hover:border-b hover:border-[#D8CCB2]">
                Voir tout {">"}
              </span>
              <TaskLists />
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

export default RhDashboard;
