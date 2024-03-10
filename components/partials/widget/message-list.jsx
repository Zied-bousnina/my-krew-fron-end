import React from "react";

import Link from "next/link";
import { message } from "@/constant/data";
import { formatDistanceToNow } from 'date-fns';
const MessageList = ({resentsActivity}) => {
  const newMessage = resentsActivity.slice(0, 5);
  return (
    <div>
      <ul className="divide-y divide-slate-100 dark:divide-slate-700 -mx-6 -mb-6">
        {newMessage?.map((item, i) => (
          <li key={i}>

              <div className="flex ltr:text-left rtl:text-right">
                <div className="flex-none ltr:mr-3 rtl:ml-3">
                  <div className="h-8 w-8 bg-white dark:bg-slate-700 rounded-full relative">
                    <span
                      className={`${
                        item.active ? "bg-secondary-500" : "bg-success-500"
                      } w-[10px] h-[10px] rounded-full border border-white dark:border-slate-700  inline-block absolute right-0 top-0`}
                    ></span>

                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-slate-800 dark:text-slate-300 text-sm font-medium mb-1`">
                    {item.action}
                  </div>
                  <div className="text-xs hover:text-[#68768A] font-normal text-slate-600 dark:text-slate-300">
                    {item.details}
                  </div>
                  <div className="text-slate-400 dark:text-slate-400 text-xs mt-1">
                  {formatDistanceToNow(new Date(item?.createdAt), { addSuffix: true })}
                  </div>
                </div>

              </div>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
