// "use client";
// import dynamic from "next/dynamic";
"use client";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import ImageBlock1 from "@/components/partials/widget/block/image-block-1";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import Loading from "@/app/loading";
import CustomTable from "@/components/partials/table/custom-table";
import { consultantService } from "@/_services/consultant.service";
import { format } from "date-fns";
import MissionChart from "@/components/partials/chart/consultant/mission-chart";
import AddNewMission from "@/components/ui/modals/pages/consultant-home/addNewMission";
import Dropdown from "@/components/ui/Dropdown";
import Link from "next/link";
import AddCRA from "@/components/ui/modals/pages/consultant-home/addCRA";
import UpdateTJM from "@/components/ui/modals/pages/consultant-home/updateTJM";
import { adminServices } from "@/_services/admin.service";
// import Dropdown from "@/components/ui/Dropdown";
import { rhServices } from "@/_services/rh.service";
import { Menu } from "@headlessui/react";
import AddNewRh from "@/components/ui/modals/pages/admin-home/addnewRhAccount";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
const MostSales = dynamic(
  () => import("@/components/partials/widget/most-sales"),
  {
    ssr: false,
  }
);


const members = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [allMissions, setAllRhUsers] = useState([]);
  const [pendingMissions, setPendingMissions] = useState([]);
  const [waitingContractMissions, setWaitingContractMissions] = useState([]);
  const [validatedMissions, setValidatedMissions] = useState([]);
  const [lastMission, setLastMission] = useState({});
  const [closesEndDateMission, setClosesEndDateMission] = useState({});
  const [consultant, setConsultant]= useState([])
  const userAuth = useSelector((state) => state.userAuth);
  const [showConfirmationPopup, setConfirmationPopup] = useState(false);
  const [updateIsloading, setupdateIsloading] = useState(false)
  const setOnCloseConfirmationPopupHandler = () => setConfirmationPopup(false);
  const [selectedId, setselectedId] = useState(null)
  const COLUMNS =[
    {
      Header: "name",
      accessor: "name",
      Cell: (row) => {

        return (
          <div>
            <span className="inline-flex items-center">
              <span className="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none bg-slate-600">
                {/* <img
                  src={row?.cell?.row?.original?.image}
                  alt=""
                  className="object-cover w-full h-full rounded-full"
                /> */}
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-300 capitalize font-medium">
                {/* {row?.cell?.value.name} */}
                {row?.cell?.row?.original?.name}
              </span>
            </span>
          </div>
        );
      },
    },
    {
      Header: "Email",
      accessor: "Email",
      Cell: (row) => {
        return (
          <span className="text-slate-500 dark:text-slate-400">
          {row?.cell?.row?.original?.Email
  }

          </span>
        );
      },
    },
    {
      Header: "Téléphone",
      accessor: "téléphone",
      Cell: (row) => {
        return (
          <span className="text-slate-500 dark:text-slate-400">
            <span className="block text-slate-600 dark:text-slate-300">
            {row?.cell?.row?.original?.téléphone
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
              // classMenuItems="right-[120] w-[140px] bottom-[0%]  z-1000  "
              classMenuItems="right-0  w-[140px] bottom-[-220%] z-1000  "
              label={
                <span className="text-xl text-center block w-full">
                  <Icon icon="heroicons-outline:dots-vertical" />
                </span>
              }
            >
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {actions.map((item, i) => (
                  <Menu.Item key={row?.cell?.row?.original?._id}>

                    <div
                    onClick={()=> {
                      console.log(row?.cell?.row?.original)
                      // setConfirmationPopup(true)
                      setselectedId(row?.cell?.row?.original?.id)
                      setConfirmationPopup(true)
                      console.log("yes")
                    }}

                      className={`

                    ${
                      item.name === "supprimer"
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

                  </Menu.Item>
                ))}
              </div>
            </Dropdown>
          </div>
        );
      },
    },
  ]

  const actions = [
    {
      name: "supprimer",
      icon: "heroicons-outline:trash",
      redirect:"/admin/infoPerso"
    },

    // {
    //   name: "delete",
    //   icon: "heroicons-outline:trash",
    //   redirect:"/"
    // },
  ];
  const COLUMNSConsultant = [
    {
      Header: "name",
      accessor: "name",
      Cell: (row) => {

        return (
          <div>
            <span className="inline-flex items-center">
              <span className="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none bg-slate-600">
                {/* <img
                  src={row?.cell?.row?.original?.image}
                  alt=""
                  className="object-cover w-full h-full rounded-full"
                /> */}
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-300 capitalize font-medium">
                {/* {row?.cell?.value.name} */}
                {row?.cell?.row?.original?.name}
              </span>
            </span>
          </div>
        );
      },
    },
    {
      Header: "Email",
      accessor: "Email",
      Cell: (row) => {
        return (
          <span className="text-slate-500 dark:text-slate-400">
          {row?.cell?.row?.original?.Email
  }

          </span>
        );
      },
    },
    {
      Header: "Téléphone",
      accessor: "téléphone",
      Cell: (row) => {
        return (
          <span className="text-slate-500 dark:text-slate-400">
            <span className="block text-slate-600 dark:text-slate-300">
            {row?.cell?.row?.original?.téléphone
  }
            </span>

          </span>
        );
      },
    },

    {
      Header: "Nationalité",
      accessor: "nationalite",
      Cell: (row) => {

        return (
          <span className="text-slate-500 dark:text-slate-400">
            <span className="block text-slate-900 bg-slate-100 text-base px-3 py-2 border rounded-xl	 dark:text-slate-300">
            {row?.cell?.row?.original?.nationalite
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
              // classMenuItems="right-[120] w-[140px] bottom-[0%]  z-1000  "
              classMenuItems="right-0  w-[140px] bottom-[-220%] z-1000  "
              label={
                <span className="text-xl text-center block w-full">
                  <Icon icon="heroicons-outline:dots-vertical" />
                </span>
              }
            >
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {actionsConsult.map((item, i) => (
                  <Menu.Item key={row?.cell?.row?.original?._id}>
                  <Link href={`${item.redirect}/${item?.name=="Valider l'inscription"?row?.cell?.row?.original?.preregister:  row?.cell?.row?.original?.id}`}>
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

  const actionsConsult = [
    {
      name: "Valider l'inscription",
      icon: "heroicons:pencil-square",
      redirect:"/admin/infoPerso"
    },
    // {
    //   name: "Process de validation",
    //   icon: "heroicons:pencil-square",
    //   redirect:"/admin/validationMission"
    // },
    {
      name: "Voir mission",
      icon: "heroicons-outline:eye",
      redirect:"/admin/consultant"
    },
    // {
    //   name: "delete",
    //   icon: "heroicons-outline:trash",
    //   redirect:"/"
    // },
  ];
  const getAllRhUsers = () => {
    return adminServices.getAllConsultant(userAuth.id)
      .then((res) => {
        setAllRhUsers(
            res.map((item)=> ({
                id:item?._id,
                name: item?.personalInfo?.firstName + " " +item?.personalInfo?.lastName ,
                Email: item?.email,
                téléphone: item?.personalInfo?.phoneNumber,
                nationalite: item?.nationality,
                preregister:item?.preRegister?._id



              }))
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };
  const getAllConsultant = () => {
    // setIsConsultLoading(true);
    rhServices.getAllConsultant().then((data) => {

    //   setIsConsultLoading(false);
    //   setconsultantV2(data);
      setConsultant(
        data.map((item)=> ({
        id:item?._id,
        name: item?.preRegister?.personalInfo?.firstName?.value + " " + item?.preRegister?.personalInfo?.lastName?.value,
        Email: item?.preRegister?.personalInfo?.email?.value,
        téléphone: item?.preRegister?.personalInfo?.phoneNumber?.value,
        nationalite: item?.preRegister?.personalInfo?.nationality?.value,
        preregister:item?.preRegister?._id



      })))


    }

    ).catch((err) => {

    })
    .finally(() => {
    //   setIsConsultLoading(false);
    });


  }
  const groupAsyncFunctions = () => {
    setIsLoading(true);
    Promise.all([
        getAllRhUsers(),
        getAllConsultant()

    ])
      .then((_) => {})
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };



  useEffect(() => {
    groupAsyncFunctions();
  }, []);
  const updatePreregistrationClientInfo= async () => {
    console.log(selectedId, "selectedId")
  setupdateIsloading(true)
  adminServices.DeleteRhAccount(selectedId).then(() => {
    setupdateIsloading(false)
    setConfirmationPopup(false)


  }
  )
  .catch(err=> {
    setupdateIsloading(false)
    setConfirmationPopup(false)

  }).finally(()=> {
    setupdateIsloading(false)
    setConfirmationPopup(false)
    getAllRhUsers()

  }
  )

}




  console.log(allMissions, "allMissions")

  return (
    <>
      <Modal
        title="..."
        labelclassName="btn-outline-dark"
        activeModal={showConfirmationPopup}
        onClose={setOnCloseConfirmationPopupHandler}
      >
          <div className="flex flex-col items-center justify-between gap-5">
          <p className="text-bold text-[32px] text-black-500">
    Confirmer la Suppression du Compte RH
</p>
<div className="flex flex-col gap-2 text-center w-[350px] text-[18px] text-[#1E1E1E]">
    <p>
        Êtes-vous sûr de vouloir confirmer la suppression de votre compte Ressources Humaines ?
    </p>
    <p className="text-[14px] text-[#1E1E1E]/50 px-6">
        Veuillez vérifier que toutes les données saisies sont correctes et à jour.
    </p>
</div>
            <div className="flex gap-4">
              <Button
                text="Annuler"
                className="bg-[#1E1E1E] w-[168px] h-[49px] text-white"
                onClick={setOnCloseConfirmationPopupHandler}
              />

              <Button
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
                  updatePreregistrationClientInfo()
                }}
                disabled={updateIsloading}
              />
            </div>
          </div>
          </Modal>
      {
        <div className="lg:col-span-8 col-span-12 space-y-5">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex gap-6 items-center">
                  <Icon icon="solar:document-outline" width={35} />
                  <h1 className="font-bold text-4xl">Membres de l'équipe</h1>
                </div>
                <AddNewRh refresh={groupAsyncFunctions} />
              </div>
              {/* </Card> */}



              <div>
                <CustomTable
                  title={`RH utilisateurs (${allMissions?.length})`}
                  columns={COLUMNS}
                  data={allMissions}
                  tableLoading={isLoading}
                />
                <CustomTable
                  title={`consultant utilisateurs (${consultant?.length})`}
                  columns={COLUMNSConsultant}
                  data={consultant}
                  tableLoading={isLoading}
                />

              </div>
            </>
          )}
        </div>
      }

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
    </>
  );
};

export default members;
