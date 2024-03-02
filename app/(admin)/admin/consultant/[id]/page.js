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
import { rhServices } from "@/_services/rh.service";
import CustomTable from "@/components/partials/table/custom-table";
import Dropdown from "@/components/ui/Dropdown";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import { missionService } from "@/_services/mission.service";
import Loading from "@/app/loading";
import Modal from "@/components/ui/Modal";
import Textinput from "@/components/ui/Textinput";
import { useFormik } from "formik";
import * as yup from "yup";
const validationSchema = yup.object({
    montant: yup.string()
        .required("Ce champ est obligatoire")
        .matches(/^\d+(\.\d{1,2})?€?$/, "Le montant doit être au format monétaire en euros"),
});
const ProfileLabel = (state, bgcolor) => {


  return (
    <div className={`flex items-center justify-between gap-3 p-4 w-[211px] h-[50px] ${bgcolor} border-[1.5px] border-[#EAE3D5] rounded-[8px]`}>
      <div className="flex gap-2">

        <div className="flex-none text-slate-600 dark:text-white text-sm font-normal items-center lg:flex  overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="overflow-hidden text-ellipsis whitespace-nowrap w-[85px] block font-semibold">
           {state}
          </span>
        </div>
      </div>
      <span className="text-base inline-block ltr:ml-[10px] rtl:mr-[10px]">
        <Icon icon="heroicons-outline:chevron-down"></Icon>
      </span>
    </div>
  );
};
// import Virement from "@/components/ui/Virement";
const ProjectPage = ({params}) => {
  const [selectedFilter, setSelectedFilter] = useState("Tous les Consultants");
  const  {consultants}  = useSelector((state) => state.rhconsultant);
const dispatch = useDispatch()
const [infoPersoById, setinfoPersoById] = useState({})
const [mission, setmission] = useState([])
const [missionsPendingLoading, setmissionsPendingLoading] = useState(false)
const [isloading, setisloading] = useState(false)
const [showConfirmationPopup, setConfirmationPopup] = useState(false);
const [updateIsloading, setupdateIsloading] = useState(false)
const setOnCloseConfirmationPopupHandler = () => setConfirmationPopup(false);
const [stepSelected, setstepSelected] = useState("Participation")


const formik = useFormik({
  initialValues: {
      montant: "",

  },
  validationSchema: validationSchema,
  onSubmit: (values) => {
console.log(values, stepSelected)

setupdateIsloading(true);
      const formData = new FormData();
      formData.append("montant", values.montant);

      rhServices
        .AddVirement({montant:values.montant, typeVirement:stepSelected}, params.id)
        .then((res) => {
          // toast.success("Mission ajoutée avec succès");

          console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",res)
          setOnCloseConfirmationPopupHandler()
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setupdateIsloading(false);
          formik.resetForm();

        });

  },
});
const switchValidation = (value) => {
  switch (value) {
    case 'VALIDATED':
      return 'Valideé';
    case 'PENDING':
      return 'En cours';
    case 'NOTVALIDATED':
      return 'En attente';
    default:
      // Handle other cases or invalid values
      return 'En attente';
  }
};
const valider = (paramss,id)=> {

  setmissionsPendingLoading(true)
  const data = {status:paramss}
  missionService.updateMissionStatus( id,data).then((data) => {
    setmissionsPending(data);
    setmissionsPendingLoading(false)

    setinfoPersoById([])
    fetchinfoPersoById()
  }).catch((err) => {
    setmissionsPendingLoading(false)
  })
  .finally(() => {

    setmissionsPendingLoading(false)
    fetchinfoPersoById()
  })

}

const [infoIsloading, setinfoIsloading] = useState(false)

  const fetchinfoPersoById = async () => {
  setinfoIsloading(true)

   rhServices.getConsultantInfoWithMissionById(params.id).then((data) => {
    setmission([])
    console.log("zied++++++++++++++++++++++++++++++++++++++++++++++++++++",data?.AllMission)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    setinfoPersoById(data)
    // setmission(
    //    data?.AllMission?.map((item) => ({
    //      id: item?._id,
    //      status: item?.status,
    //      client: item?.finalClient?.value,
    //      metier: item?.profession?.value,
    //      secteur: item?.industrySector?.value,
    //      date: `${months[new Date(item?.startDate.value).getMonth()]} ${new Date(item?.startDate.value).getDate()}`,
    //    }))
    //  )
    setmission(
      data?.AllMission
    )
    console.warning("infoPersoById",mission)
    setinfoIsloading(false)
  }
  )
  .catch(err=> {
    setinfoIsloading(false)
    console.log(err)
  }).finally(()=> {
    setinfoIsloading(false)
  }
  )
}

useEffect(() => {
  fetchinfoPersoById()
}, [])
const actionsConsult = [
  // {
  //   name: "valider",
  //   icon: "heroicons:pencil-square",
  //   redirect:"VALID"
  // },
  // {
  //   name: "rejeter",
  //   icon: "heroicons-outline:eye",
  //   redirect:"REJECTED"
  // },
  // {
  //   name: "rejeter",
  //   icon: "heroicons-outline:eye",
  //   redirect:"COMPLETED"
  // },

  {
    name: "voir details",
    icon: "heroicons:pencil-square",
    redirect:"/admin/missionsDetails/"
  },
  {
    name: "Process De Validation",
    icon: "heroicons:pencil-square",
    redirect:"/admin/validationMission2/"
  },
  {
    name: "CRA",
    icon: "heroicons:pencil-square",
    redirect:"/admin/CRA/"
  },
];


const COLUMNS = [
  {
    Header: "Status",
    accessor: "Status",
    Cell: (row) => {
      console?.log("++++132",row)
      // setmission(
      //   data?.AllMission?.map((item)=>( {

      //     id:"1",
      //     status: item?.status,
      //     client: item?.finalClient?.value,
      //     metier: item?.profession?.value,
      //     secteur: item?.industrySector?.value,
      //     date : `${months[new Date(item?.startDate.value).getMonth()]} ${new Date(item?.startDate.value).getDate()}`,


      //   }))
      // )
      console.log(row?.cell?.row?.original)
      return (
        <span className={`text-[${row?.cell?.row?.original?.status === "PENDING" ? '#FCE9A4' : row?.cell?.row?.original?.status === "VALID" ? '#187111' : '#BF6F25'}] dark:text-slate-400`}>
  <span className={`block text-[${row?.cell?.row?.original?.status === "PENDING" ? '#BF6F25' : row?.cell?.row?.original?.status === "VALID" ? '#FFFFFF' : '#FF0000'}] bg-[${row?.cell?.row?.original?.status === "PENDING" ? row?.cell?.row?.original?.status === "VALID" ? '#187111' : '#FCE9A4' : '#FF0000'}] text-base px-3 py-2 border rounded-[12px] dark:text-slate-300`}>
    {row?.cell?.row?.original?.status === "REJECTED" ?
      "rejected"
      :
      row?.cell?.row?.original?.status === "VALID" ?
      "Valid" :
      row?.cell?.row?.original?.status === "WAITINGCONTRACT" ?
      "WAITINGCONTRACT":

      "Nouvelle"

    }
  </span>
</span>

      );
    },
  },
  {
    Header: "ID",
    accessor: "id",
    Cell: (row) => {
      console.log("166+++++++++++++++++", row?.cell?.row?.original)
       // setmission(
      //   data?.AllMission?.map((item)=>( {

      //     id:"1",
      //     status: item?.status,
      //     client: item?.finalClient?.value,
      //     metier: item?.profession?.value,
      //     secteur: item?.industrySector?.value,
      //     date : `${months[new Date(item?.startDate.value).getMonth()]} ${new Date(item?.startDate.value).getDate()}`,


      //   }))
      // )
      return (
        <span className="text-slate-500 dark:text-slate-400">
       {'#'+row?.cell?.row?.original?._id.slice(0, 5)
        }

        </span>
      );
    },
  },
  {
    Header: "Client",
    accessor: "Client",
    Cell: (row) => {
       // setmission(
      //   data?.AllMission?.map((item)=>( {

      //     id:"1",
      //     status: item?.status,
      //     client: item?.finalClient?.value,
      //     metier: item?.profession?.value,
      //     secteur: item?.industrySector?.value,
      //     date : `${months[new Date(item?.startDate.value).getMonth()]} ${new Date(item?.startDate.value).getDate()}`,


      //   }))
      // )
      return (
        <span className="text-slate-500 dark:text-slate-400">
         {row?.cell?.row?.original?.clientInfo?.clientContact?.firstName?.value}

        </span>
      );
    },
  },
  {
    Header: "Métier",
    accessor: "Métier",
    Cell: (row) => {
      console.log("**********************", row?.cell?.row?.original)
       // setmission(
      //   data?.AllMission?.map((item)=>( {

      //     id:"1",
      //     status: item?.status,
      //     client: item?.finalClient?.value,
      //     metier: item?.profession?.value,
      //     secteur: item?.industrySector?.value,
      //     date : `${months[new Date(item?.startDate.value).getMonth()]} ${new Date(item?.startDate.value).getDate()}`,


      //   }))
      // )
      return (
        <span className="text-slate-500 dark:text-slate-400">
          <span className="block text-slate-600 dark:text-slate-300">
          {row?.cell?.row?.original?.missionInfo?.profession?.value}
          </span>

        </span>
      );
    },
  },

  {
    Header: "Secteur",
    accessor: "Secteur",
    Cell: (row) => {
       // setmission(
      //   data?.AllMission?.map((item)=>( {

      //     id:"1",
      //     status: item?.status,
      //     client: item?.finalClient?.value,
      //     metier: item?.profession?.value,
      //     secteur: item?.industrySector?.value,
      //     date : `${months[new Date(item?.startDate.value).getMonth()]} ${new Date(item?.startDate.value).getDate()}`,


      //   }))
      // )
      return (
        <span className="text-slate-500 dark:text-slate-400">
          <span className="block text-slate-900 bg-slate-100 text-base px-3 py-2 border rounded-xl	 dark:text-slate-300">

          {row?.cell?.row?.original?.missionInfo?.industrySector?.value}
          </span>

        </span>
      );
    },
  },
  {
    Header: "Date",
    accessor: "date",
    Cell: (row) => {
       // setmission(
      //   data?.AllMission?.map((item)=>( {

      //     id:"1",
      //     status: item?.status,
      //     client: item?.finalClient?.value,
      //     metier: item?.profession?.value,
      //     secteur: item?.industrySector?.value,
      //     date : `${months[new Date(item?.startDate.value).getMonth()]} ${new Date(item?.startDate.value).getDate()}`,


      //   }))
      // )
      console.log('+++++++++++++++++++++++++++---------------------------', row?.cell?.row?.original)
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return (
        <span className="text-slate-500 dark:text-slate-400">
          <span className="block text-slate-900 bg-slate-100 text-base px-3 py-2 border rounded-xl	 dark:text-slate-300">
          {
            `${months[new Date(row?.cell?.row?.original?.missionInfo?.startDate?.value).getMonth()]} ${new Date(row?.cell?.row?.original?.missionInfo?.startDate?.value).getDate()}`
          }

          </span>

        </span>
      );
    },
  },
  {
    Header: "action",
    accessor: "action",
    Cell: (row) => {
      return (
        <div className=" text-center">
          <Dropdown
            classMenuItems="right-0 w-[140px] bottom-[40%] z-1000  "
            label={
              <span className="text-xl text-center block w-full">
                <Icon icon="heroicons-outline:dots-vertical" />
              </span>
            }
          >
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {actionsConsult.map((item, i) => (
                <Menu.Item key={i}>
                {/* <button
                onClick={()=>{

                  valider(item.redirect,  row?.cell?.row?.original?._id
)
                }
                }
                >
                  <div
                    className={`

                  ${
                    item.redirect === "REJECTED"
                      ? "bg-danger-500 text-danger-500 bg-opacity-30   hover:bg-opacity-100 hover:text-white"
                      :
                      "hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
                  }
                   w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer
                   first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `}
                  >
                    <span className="text-base">
                      <Icon icon={item.icon} />
                    </span>
                    <span>{item.name}</span>
                  </div>
                  </button> */}
                  <Link href={`${item.redirect}/${row.cell?.row?.original?._id}`}>
                  <div
                    className={`

                  ${
                    item.name === "delete"
                      ? "bg-danger-500 text-danger-500 bg-opacity-30   hover:bg-opacity-100 hover:text-white"
                      :
                      "hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
                  }
                   w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer
                   first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `}
                  >
                    <span className="text-base">
                      <Icon icon={item.icon} />
                    </span>
                    <span>{item.name}</span>
                  </div>
                  </Link>
                </Menu.Item>
              ))}
            </div>
          </Dropdown>
        </div>
      );
    },
  },

];
console.log("mision-------------------", mission)
  // useEffect(() => {
  //   dispatch(handleFetchConsultants())

  // }, [])

  console.log(infoPersoById)
  console.log(infoPersoById?.AllMission)
  const personalInfo = infoPersoById
  console.log("personal info",personalInfo )

  const onchange = (status, step)=> {
    console.log("selectedééééééééééééééééééééééééééé", stepSelected)
    const data = {
      status:status, step:step
    }
    console.log("3333333333333333333333",data)
    setisloading(true)
    // missionService.updateContractStatus(id, data).then((data) => {

    //   setisloading(false)
    //   console.log(data)
    // }
    // )
    // .catch(err=> {

    //   setisloading(false)
    //   console.log(err)
    // }).finally(()=> {

    //   setisloading(false)
    // }
    // )
  }

  return (
    <>
      <Modal
        title="..."
        labelclassName="btn-outline-dark"
        activeModal={showConfirmationPopup}
        onClose={setOnCloseConfirmationPopupHandler}
      >
      <form onSubmit={formik.handleSubmit} dir="ltr">
          <div className="flex flex-col items-center justify-between gap-5">
            <p className="text-bold text-[32px] text-black-500">
              Confirmez Vos Informations
            </p>
            <div className="flex flex-row gap-2 items-center justify-center text-center w-[350px] text-[18px] text-[#1E1E1E]">
              <p>
              <Textinput
                id="montant"
                name="montant"
                placeholder="montant"
                value={formik.values.montant}
                onChange={formik.handleChange}
                error={
                  formik.touched.montant && Boolean(formik.errors.montant)
                }
                helperText={formik.touched.montant && formik.errors.montant}
              />
                   <Dropdown  label={ProfileLabel(stepSelected,"white" )} classMenuItems={`w-[211px] top-[50px] ${"black"} `} class={` ${"black"}`}>

<Menu.Item key={1} className="bg-slate-100">
{({ active }) => (
    <div
       onClick={(e) => {
        setstepSelected(e.target.innerText)
        onchange(e.target.innerText)
        console.log("Step: ",e.target.innerText, "abc :")}}
      className={`${
        active
          ? " ${bgColor} text-slate-900 dark:bg-slate-600 dark:text-slate-300 dark:bg-opacity-50"
          : "text-slate-600 dark:text-slate-300 "
      } block     ${
        true
          ? "border-t border-slate-100 dark:border-slate-700"
          : ""
      }`}
    >
      <div className={`block cursor-pointer px-4 py-2`}>
        <div className="flex items-center">
          <span className="block text-xl ltr:mr-3 rtl:ml-3">
            {/* <Icon icon={item.icon} /> */}
          </span>
          <span className="block text-sm">Participation</span>
        </div>
      </div>
    </div>
  )}
</Menu.Item>
<Menu.Item key={2} className="bg-slate-100">
{({ active }) => (
    <div
      onClick={(e) => {
        setstepSelected(e.target.innerText)
        onchange(e.target.innerText)
        console.log(e.target.innerText)}}
      className={`${
        active
          ? " ${bgColor} text-slate-900 dark:bg-slate-600 dark:text-slate-300 dark:bg-opacity-50"
          : "text-slate-600 dark:text-slate-300"
      } block     ${
        true
          ? "border-t border-slate-100 dark:border-slate-700"
          : ""
      }`}
    >
      <div className={`block cursor-pointer px-4 py-2`}>
        <div className="flex items-center">
          <span className="block text-xl ltr:mr-3 rtl:ml-3">
            {/* <Icon icon={item.icon} /> */}
          </span>
          <span className="block text-sm">Cooptation</span>
        </div>
      </div>
    </div>
  )}
</Menu.Item>

</Dropdown>
              </p>

            </div>
            <div className="flex gap-4">
              <Button
                text="Annuler"
                className="bg-[#1E1E1E] w-[168px] h-[49px] text-white"
                onClick={setOnCloseConfirmationPopupHandler}
              />

              <Button
              type="submit"

                text={
                  updateIsloading ? (
                    <div className="flex items-center gap-2">
                      <span>En cours...</span>
                      <div className="animate-spin w-5 h-5 border-t-2 border-b-2 border-[#1E1E1E] rounded-full"></div>
                    </div>
                  ) : (
                    "Confirmer"
                  )
                }

                className="bg-[#C9E2C4] w-[168px] h-[49px] text-[#1E1E1E]"
                onClick={()=> {
                  // update()
                }}
                disabled={updateIsloading}
              />
            </div>
          </div>
          </form>
          </Modal>
    {
      infoIsloading ?
      <Loading />:

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
                     {infoPersoById?.consultant?.preRegister?.personalInfo?.firstName?.value} {infoPersoById?.consultant?.preRegister?.personalInfo?.lastName?.value}
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
                <div
                onClick={()=>setConfirmationPopup(true)}
                 className="flex items-center justify-between bg-[#F7F5EF] px-3 rounded-[6px] gap-2 min-w-[127px] h-[36px] cursor-pointer">
                  <Image src="/assets/icons/plus.svg" className="w-4 h-4" />
                  <p className="text-[#503515] text-[14px]">Nv Virement</p>
                  <Image
                    src="/assets/icons/arrow-down.svg"
                    className="w-4 h-4"
                  />
                </div>
              </div>

              <div className="flex items-start flex-col gap-2 py-4  border-b-2 border-dotted  border-[#EFEBE1]">
                <Contact icon="/assets/icons/alt.svg" text={infoPersoById?.consultant?.email} />
                <Contact icon="/assets/icons/phone.svg" text={infoPersoById?.consultant?.preRegister?.personalInfo?.phoneNumber?.value} />
                <Contact
                  icon="/assets/icons/office.svg"
                  text={infoPersoById?.consultant?.preRegister?.personalInfo?.location?.value + ", " + infoPersoById?.consultant?.preRegister?.personalInfo?.nationality?.value}
                />
              </div>
              <div className="flex items-start flex-col gap-2 py-4  border-b-2 border-dotted  border-[#EFEBE1]">
                <Contact label="Nationalité" text={infoPersoById?.consultant?.preRegister?.personalInfo?.nationality?.value} isBadge={true} />
                <Contact label="RIB" text={infoPersoById?.consultant?.preRegister?.personalInfo?.rib?.value} />
                <Contact label="N° Sécurité " text={infoPersoById?.consultant?.preRegister?.personalInfo?.socialSecurityNumber?.value} />
              </div>
              <div className="flex items-start flex-col gap-2 py-4  ">
                <Contact label="Documents Assocciés" text="05" />
                <div className="flex flex-col gap-2">
                  <Document
                    title="Fichier Simulation"
                    icon="/assets/icons/document.svg"
                    date="May 29, 2022"
                    bgColor="bg-[#DD6E42]/20"
                    url={infoPersoById?.consultant?.preRegister?.missionInfo?.isSimulationValidated?.value}
                  />
                   {
                    infoPersoById?.consultant?.preRegister?.personalInfo?.carInfo?.hasCar?.value &&
                  <Document
                    title="Permis de Conduire"
                    icon="/assets/icons/document.svg"
                    date=" Feb 13, 2022"
                    bgColor="bg-[#A67DB8]/20"
                    url={infoPersoById?.consultant?.preRegister?.personalInfo?.carInfo?.drivingLicense?.value
}
                  />
                   }
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
          {
            infoIsloading ?
      <Loading />:

            <CustomTable
              title={`test`}
              columns={COLUMNS}
              data={mission}
              tableLoading={infoIsloading}
            />
          }
            {/* <MissionConsultantTable consultants={infoPersoById?.AllMission   } /> */}
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
    }
    </>
  );
};

export default ProjectPage;
