// "use client";
// import dynamic from "next/dynamic";
"use client";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import BasicArea from "@/components/partials/chart/appex-chart/BasicArea";
import ImageBlock1 from "@/components/partials/widget/block/image-block-1";
import Button from "@/components/ui/Button";
import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import Loading from "@/app/loading";
import CustomTable from "@/components/partials/table/custom-table";
import { consultantService } from "@/_services/consultant.service";
import { format } from "date-fns";
import MissionChart from "@/components/partials/chart/consultant/mission-chart";

const MostSales = dynamic(
  () => import("@/components/partials/widget/most-sales"),
  {
    ssr: false,
  }
);
const COLUMNS = [
  {
    Header: "Status",
    accessor: "status",
    Cell: (row) => {
      return (
        <div>
          <span className="text-slate-600 dark:text-slate-400 lowercase px-4 py-2 text-[#e0d6c3] bg-[#fefcf1]">
            {row?.cell?.value}
          </span>
        </div>
      );
    },
  },
  {
    Header: "ID",
    accessor: "id",
    Cell: (row) => {
      return (
        <span className="text-slate-600 dark:text-slate-400">
          {row?.cell?.value}
        </span>
      );
    },
  },
  {
    Header: "Métier",
    accessor: "metier",
    Cell: (row) => {
      return (
        <span className="text-slate-600 dark:text-slate-400">
          {row?.cell?.value}
        </span>
      );
    },
  },

  {
    Header: "Client",
    accessor: "client",
    Cell: (row) => {
      return (
        <span className="text-slate-600 dark:text-slate-400">
          {row?.cell?.value}
        </span>
      );
    },
  },
  {
    Header: "Secteur",
    accessor: "secteur",
    Cell: (row) => {
      return (
        <span className="text-slate-600 dark:text-slate-400">
          {row?.cell?.value}
        </span>
      );
    },
  },
  {
    Header: "TJM",
    accessor: "tjm",
    Cell: (row) => {
      return (
        <span className="text-slate-600 dark:text-slate-400">
          {row?.cell?.value}
        </span>
      );
    },
  },
  {
    Header: "Début",
    accessor: "debut",
    Cell: (row) => {
      return (
        <span className="text-slate-600 dark:text-slate-400">
          {row?.cell?.value}
        </span>
      );
    },
  },
  {
    Header: "Fin",
    accessor: "fin",
    Cell: (row) => {
      return (
        <span className="text-slate-600 dark:text-slate-400">
          {row?.cell?.value}
        </span>
      );
    },
  },

  // {
  //   Header: "action",
  //   accessor: "action",
  //   // Cell: (row) => {
  //   //   return (
  //   //     <div className=" text-center">
  //   //       <Dropdown
  //   //         classMenuItems="right-0 w-[140px] bottom-[40%] z-1000  "
  //   //         label={
  //   //           <span className="text-xl text-center block w-full">
  //   //             <Icon icon="heroicons-outline:dots-vertical" />
  //   //           </span>
  //   //         }
  //   //       >
  //   //         <div className="divide-y divide-slate-100 dark:divide-slate-800">
  //   //           {actions.map((item, i) => (
  //   //             <Menu.Item key={i}>
  //   //               <Link
  //   //                 href={`${item.redirect}/${row?.cell?.row?.original?._id}`}
  //   //               >
  //   //                 <div
  //   //                   className={`

  //   //               ${
  //   //                 item.name === "delete"
  //   //                   ? "bg-danger-500 text-danger-500 bg-opacity-30   hover:bg-opacity-100 hover:text-white"
  //   //                   : "hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
  //   //               }
  //   //                w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer
  //   //                first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `}
  //   //                 >
  //   //                   <span className="text-base">
  //   //                     <Icon icon={item.icon} />
  //   //                   </span>
  //   //                   <span>{item.name}</span>
  //   //                 </div>
  //   //               </Link>
  //   //             </Menu.Item>
  //   //           ))}
  //   //         </div>
  //   //       </Dropdown>
  //   //     </div>
  //   //   );
  //   // },
  // },
];
const ConsultantDashboard = () => {
  const [statistiques, setstatistiques] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [allMissions, setAllMissions] = useState([]);
  const [pendingMissions, setPendingMissions] = useState([]);
  const [waitingContractMissions, setWaitingContractMissions] = useState([]);
  const [validatedMissions, setValidatedMissions] = useState([]);
  const [lastMission, setLastMission] = useState({});

  const userAuth = useSelector((state) => state.userAuth);

  const getConsultantAllMissions = () => {
    consultantService
      .getConsultantMissions(userAuth.id)
      .then((res) => {
        setAllMissions(
          res.data.map((item) => ({
            status: item?.missionInfo?.status,
            id: item._id,
            metier: item?.missionInfo?.profession?.value,
            client:
              item?.clientInfo?.clientContact?.firstName?.value ||
              "" + " " + item?.clientInfo?.clientContact?.lastName?.value ||
              "",
            secteur: item?.missionInfo?.industrySector?.value,
            tjm: item?.missionInfo?.dailyRate?.value,
            createdAt: item?.addedDate,
            debut: format(item?.missionInfo?.startDate?.value, "MMM d"),
            fin: format(item?.missionInfo?.endDate?.value, "MMM d"),
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };
  const getConsultantMissionsPending = () => {
    consultantService
      .getConsultantMissionsPending(userAuth.id)
      .then((res) => {
        setPendingMissions(
          res.data.map((item) => ({
            status: item?.missionInfo?.status,
            id: item._id,
            metier: item?.missionInfo?.profession?.value,
            client:
              item?.clientInfo?.clientContact?.firstName?.value ||
              "" + " " + item?.clientInfo?.clientContact?.lastName?.value ||
              "",
            secteur: item?.missionInfo?.industrySector?.value,
            tjm: item?.missionInfo?.dailyRate?.value,
            debut: format(item?.missionInfo?.startDate?.value, "MMM d"),
            fin: format(item?.missionInfo?.endDate?.value, "MMM d"),
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };
  const getConsultantMissionsWaitingContract = () => {
    consultantService
      .getConsultantMissionsWaitingContract(userAuth.id)
      .then((res) => {
        setWaitingContractMissions(
          res.data.map((item) => ({
            status: item?.missionInfo?.status,
            id: item._id,
            metier: item?.missionInfo?.profession?.value,
            client:
              item?.clientInfo?.clientContact?.firstName?.value ||
              "" + " " + item?.clientInfo?.clientContact?.lastName?.value ||
              "",
            secteur: item?.missionInfo?.industrySector?.value,
            tjm: item?.missionInfo?.dailyRate?.value,
            debut: format(item?.missionInfo?.startDate?.value, "MMM d"),
            fin: format(item?.missionInfo?.endDate?.value, "MMM d"),
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };
  const getConsultantMissionsValidated = () => {
    consultantService
      .getConsultantMissionsValidated(userAuth.id)
      .then((res) => {
        setValidatedMissions(
          res.data.map((item) => ({
            status: item?.missionInfo?.status,
            id: item._id,
            metier: item?.missionInfo?.profession?.value,
            client:
              item?.clientInfo?.clientContact?.firstName?.value ||
              "" + " " + item?.clientInfo?.clientContact?.lastName?.value ||
              "",
            secteur: item?.missionInfo?.industrySector?.value,
            tjm: item?.missionInfo?.dailyRate?.value,
            debut: format(item?.missionInfo?.startDate?.value, "MMM d"),
            fin: format(item?.missionInfo?.endDate?.value, "MMM d"),
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  const getLastMission = () => {
    consultantService
      .getConsultantLastMission(userAuth.id)
      .then((res) => {
        console.log("lastmission", res.data);
        setLastMission(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      getConsultantAllMissions(),
      getConsultantMissionsPending(),
      getConsultantMissionsWaitingContract(),
      getLastMission(),
      getConsultantMissionsValidated(),
    ])
      .then((_) => {})
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="lg:col-span-8 col-span-12 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex gap-6 items-center">
            <Icon icon="solar:document-outline" width={35} />
            <h1 className="font-bold text-4xl">Mes Missions</h1>
          </div>
          <Button
            text="Déclarer une nouvelle mission"
            className=" bg-black-500 text-white text-[14px] font-semibold  h-[35px] flex items-center justify-center rounded-[10px]"
          />
        </div>
        {/* </Card> */}
        <Card>
          <MissionChart data={allMissions} height={240} />
        </Card>
        <Card>
          <div className="grid grid-cols-9 gap-5">
            <div className="2xl:col-span-3 lg:col-span-4 col-span-12">
              <ImageBlock1
                isLoading={isLoading}
                title="Info Missions"
                amount={lastMission?.missionInfo?.status}
                subtitle1={lastMission?.missionInfo?.finalClient?.value}
                subtitle2={lastMission?.missionInfo?.dailyRate?.value}
              />
            </div>
            <div className="2xl:col-span-3 lg:col-span-4 col-span-12">
              <ImageBlock1
                title="TJM Moyen"
                amount={lastMission?.missionInfo?.dailyRate?.value}
                isLoading={isLoading}
                amountColor="text-[#1E1E1E]"
                bgColor="bg-[#FEFCF1]"
                border="border border-[#EAE3D5]"
                isMoney={true}
              />
            </div>
            <div className="2xl:col-span-3 lg:col-span-4 col-span-12">
              <ImageBlock1
                title="Date de fin de Mission"
                isLoading={isLoading}
                amount={lastMission?.missionInfo?.endDate?.value}
                isDate={true}
                amountColor="text-[#1E1E1E]"
                bgColor="bg-[#FEFCF1]"
                border="border border-[#EAE3D5]"
              />
            </div>
          </div>
        </Card>

        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <CustomTable
              title={`En attente (${pendingMissions?.length})`}
              columns={COLUMNS}
              data={pendingMissions}
              tableLoading={isLoading}
            />
            <CustomTable
              title={`En cours (${waitingContractMissions?.length})`}
              columns={COLUMNS}
              data={waitingContractMissions}
              tableLoading={isLoading}
            />
            <CustomTable
              title={`Validées (${validatedMissions?.length})`}
              columns={COLUMNS}
              data={validatedMissions}
              tableLoading={isLoading}
            />
          </div>
        )}
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
    </>
  );
};

export default ConsultantDashboard;
