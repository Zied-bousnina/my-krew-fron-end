import React from "react";
import InputBox from "./InputBox";
import Image from "./Image";
import { Menu, Transition } from "@headlessui/react";
import Dropdown from "@/components/ui/Dropdown";
import Icon from "@/components/ui/Icon";
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

const ValidationStep = ({ stepNumber, step, state }) => {
  const bgColor =
    state.toLowerCase() === "valideé"
      ? "bg-[#C9E2C4]"
      : state.toLowerCase() === "en cours"
      ? "bg-[#FCE9A4]"
      : "bg-[#EDEDED]";
  return (
    <div className="w-full flex items-center justify-between">
      <p className="text-[14px] text-[#6E7787]">Etape : {stepNumber}</p>
      <InputBox placeholder={step} readOnly={true} />


      <Dropdown label={ProfileLabel(state,bgColor )} classMenuItems={`w-[211px] top-[50px]  ${bgColor} `} class={` ${bgColor}`}>

        <Menu.Item key={1} className="">
        {({ active }) => (
            <div
               onClick={(e) => console.log(e.target.innerText, step)}
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
                  <span className="block text-sm">Validée</span>
                </div>
              </div>
            </div>
          )}
        </Menu.Item>
        <Menu.Item key={2} className="">
        {({ active }) => (
            <div
              onClick={(e) => console.log(e.target.innerText)}
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
                  <span className="block text-sm">En cours</span>
                </div>
              </div>
            </div>
          )}
        </Menu.Item>
        <Menu.Item key={3} className="">
        {({ active }) => (
            <div
              onClick={(e) => console.log(e.target.innerText)}
              value="En attente"
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
                  <span className="block text-sm">En attente</span>
                </div>
              </div>
            </div>
          )}
        </Menu.Item>
    </Dropdown>
    </div>
  );
};

export default ValidationStep;
