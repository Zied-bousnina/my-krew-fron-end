"use client";
import MessageList from "@/components/partials/widget/message-list";
import TaskLists from "@/components/partials/widget/task-list";
import Card from "@/components/ui/Card";
import { Icon } from "@iconify/react";

export default function ConsultantLayout({ children }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-12 gap-5">
        {children}
        <div className="lg:col-span-4 col-span-12 space-y-5 bg-[#f7f5ef] max-h-[1000px] p-6 rounded-lg">
          <div>
            <div className="flex items-end justify-between px-2 py-4">
              <div className="flex items-center gap-2">
                <Icon icon="lets-icons:pin" className="text-2xl" />
                <p className="text-xl">Messages Importants</p>
              </div>
              <Icon icon="heroicons:ellipsis-horizontal" className="text-2xl" />
            </div>
            <Card
              bodyClass="px-6 pb-6"
              className="shadow-none bg-white relative"
            >
              <MessageList />
            </Card>
          </div>
          <div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
