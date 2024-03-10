import React from "react";
import Dropdown from "@/components/ui/Dropdown";
import Icon from "@/components/ui/Icon";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import { notifications } from "@/constant/data";
import { NotificationServices } from "@/_services/notification.service";
import { useEffect, useMemo, useState } from "react";
import { formatDistanceToNow } from 'date-fns';
import { usePathname } from 'next/navigation'
const notifyLabel = (notifsCount) => {
  return (
    // relative lg:h-[32px] lg:w-[32px] lg:bg-slate-100 text-slate-900 lg:dark:bg-slate-900 dark:text-white cursor-pointer rounded-full text-[20px] flex flex-col items-center justify-center
    <span className="h-[50px] w-[211px] cursor-pointer flex items-center gap-3 bg-[#FEFCF1] border-[1.5px] border-[#EAE3D5] rounded-[13px] text-black-500 p-4">
      <div className="relative">
        <Icon icon="heroicons-outline:bell" className="animate-tada" />
        <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 text-[8px] font-semibold flex flex-col items-center justify-center rounded-full text-white z-[99]"></span>
      </div>
      <div className="flex flex-col items-start">
        <p className="text-[13px] font-semibold">Toutes les demandes</p>
        <span className="text-[11px] text-black-500/50">{notifsCount} Demandes</span>
      </div>
    </span>
  );
};

const Notification = () => {

  const [notifPending, setNotifPending] = useState(false)
  const [notifs, setnotifs] = useState([]);
  const [notifsCount, setnotifsCount] = useState(0);
  const pathname = usePathname()


  // Get the first segment of the path

  const pathSegments = pathname.split('/').filter(Boolean);

  // Get the first segment of the path
  const firstSegment = pathSegments[0];
  console.log("********************** path name*************", pathname.split('/')[1], "Type:", typeof pathname);

const getAllNotif = () => {
  setNotifPending(true)
  NotificationServices.getNotification(5).then((data) => {

    setNotifPending(false)

    const convertDate = (date) => {
      const d = new Date(date);
      return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }
console.log('"**********Notif***************"', data)
setnotifsCount(data?.count)
setnotifs(data?.data.map((item)=>({
      id: item?._id,
   action: item?.action,
   details: item?.details,
   pathurl:item?.pathurl,
   idToPath:item?.idToPath,

   createdAt: item?.createdAt
    })))
  }).catch((err) => {
    setNotifPending(false)
  })
  .finally(() => {
    setNotifPending(false)
  })
}
const deleteNotif = (id) => {
  console.log(id)
  setNotifPending(true)
  NotificationServices.deleteNotification(id).then((data) => {
    getAllNotif()
  }).catch((err) => {
    setNotifPending(false)
  })
  .finally(() => {
    setNotifPending(false)
  })
}

useEffect(() => {
  getAllNotif()

}, [])

  return (
    <Dropdown classMenuItems="md:w-[300px] top-[58px]" label={notifyLabel(notifsCount)}>
      <div className="bg-white rounded-xl border border-slate-400 overflow-hidden">
        <div className="flex justify-between px-4 py-4 border-b border-slate-100 dark:border-slate-600">
          <div className="text-sm text-slate-800 dark:text-slate-200 font-medium leading-6">
            Notifications
          </div>
          <div className="text-slate-800 dark:text-slate-200 text-xs md:text-right">
            <Link href="/notifications" className="underline">
              View all
            </Link>
          </div>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {notifs?.map((item, i) => (
            <Menu.Item key={i}>
              {({ active }) => (
                <Link href={`/${pathname.split('/')[1]}/${item.pathurl}`} className="underline">
                <div
                onClick={() => deleteNotif(item?.id)}
                  className={`${
                    active
                      ? "bg-slate-100 dark:bg-slate-700 dark:bg-opacity-70 text-slate-800"
                      : "text-slate-600 dark:text-slate-300"
                  } block w-full px-4 py-2 text-sm  cursor-pointer`}
                >
                  <div className="flex ltr:text-left rtl:text-right">
                    <div className="flex-none ltr:mr-3 rtl:ml-3">
                      <div className="h-8 w-8 bg-white rounded-full">

                      </div>
                    </div>
                    <div className="flex-1">
                      <div
                        className={`${
                          active
                            ? "text-slate-600 dark:text-slate-300"
                            : " text-slate-600 dark:text-slate-300"
                        } text-sm`}
                      >
                        {item.action}
                      </div>
                      <div
                        className={`${
                          active
                            ? "text-slate-500 dark:text-slate-200"
                            : " text-slate-600 dark:text-slate-300"
                        } text-xs leading-4`}
                      >
                        {item.details}
                      </div>
                      <div className="text-slate-400 dark:text-slate-400 text-xs mt-1">
                      {formatDistanceToNow(new Date(item?.createdAt), { addSuffix: true })}
                      </div>
                    </div>
                    {item.unread && (
                      <div className="flex-0">
                        <span className="h-[10px] w-[10px] bg-danger-500 border border-white dark:border-slate-400 rounded-full inline-block"></span>
                      </div>
                    )}
                  </div>
                </div>
                </Link>
              )}
            </Menu.Item>
          ))}
        </div>
      </div>
    </Dropdown>
  );
};

export default Notification;
