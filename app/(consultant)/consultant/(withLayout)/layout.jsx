"use client";
import MessageList from "@/components/partials/widget/message-list";
import TaskLists from "@/components/partials/widget/task-list";
import Card from "@/components/ui/Card";
import { Icon } from "@iconify/react";
import { logServices } from "@/_services/log.service";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
export default function ConsultantLayout({ children }) {
  const [logsPending, setlogsPending] = useState(false)
  const [resentsActivity, setresentsActivity] = useState([]);
const getAlllogs = () => {
  setlogsPending(true)
  logServices.getlogs(5).then((data) => {

    setlogsPending(false)

    const convertDate = (date) => {
      const d = new Date(date);
      return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }
console.log('"**********Logs***************"', data?.data)
setresentsActivity(data?.data.map((item)=>({
      id: item?._id,
   action: item?.action,
   details: item?.details,
   createdAt: item?.createdAt
    })))
  }).catch((err) => {
    setlogsPending(false)
  })
  .finally(() => {
    setlogsPending(false)
  })
}
useEffect(() => {
  getAlllogs()
}, [])

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-12 gap-5">
        {children}
        <div className="lg:col-span-4 col-span-12 space-y-5 bg-[#f7f5ef] max-h-[1000px] p-6 rounded-lg">
          <div>
            <div className="flex items-end justify-between px-2 py-4">
              <div className="flex items-center gap-2">
                <Icon icon="lets-icons:pin" className="text-2xl" />
                <p className="text-xl">Activités Récentes</p>
              </div>
              <Icon icon="heroicons:ellipsis-horizontal" className="text-2xl" />
            </div>
            <Card
              bodyClass="px-6 pb-6"
              className="shadow-none bg-white relative"
            >
                 {
              logsPending ?
              <Loading />
              :

<>
              <span className="absolute top-7 right-4 text-[13px] font-semibold text-[#D8CCB2] cursor-pointer hover:border-b hover:border-[#D8CCB2]">
                Voir tout {">"}
              </span>
              <MessageList
resentsActivity={resentsActivity}
               />
               </>
            }
            </Card>
          </div>
          {/* <div>
            <div className="flex items-end justify-between px-2 py-4">
              <div className="flex items-center gap-2">
                <Icon icon="heroicons-outline:speakerphone" className="text-2xl" />
                <p className="text-xl">Activités Récentes</p>
              </div>
              <Icon icon="heroicons:ellipsis-horizontal" className="text-2xl" />
            </div>
            <Card
              bodyClass="px-6 pb-6"
              className="shadow-none bg-white relative"
            >
              <TaskLists />
            </Card>
          </div> */}
        </div>
      </div>
    </div>
  );
}
