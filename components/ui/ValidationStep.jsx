import React, {useState} from "react";
import InputBox from "./InputBox";
import Image from "./Image";
import { Menu, Transition } from "@headlessui/react";
import Dropdown from "@/components/ui/Dropdown";
import Icon from "@/components/ui/Icon";
import { rhServices } from "@/_services/rh.service";
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

const ValidationStep = ({ stepNumber, step, state, id }) => {
  const [stepSelected, setstepSelected] = useState(state)
  const [isloading, setisloading] = useState(false)


    const onchange = (status, step)=> {
      const data = {
        status:status, step:step
      }
      console.log("3333333333333333333333",data)
      setisloading(true)
      rhServices.updatePreregistrationStatus(id, data).then((data) => {
        // setinfoPersoById(data)
        // setinfoIsloading(false)
        setisloading(false)
        console.log(data)
      }
      )
      .catch(err=> {
        // setinfoIsloading(false)
        setisloading(false)
        console.log(err)
      }).finally(()=> {
        // setinfoIsloading(false)
        setisloading(false)
      }
      )
    }




  const bgColor =
  stepSelected.toLowerCase() === "valideé"
      ? "bg-[#C9E2C4]"
      : state.toLowerCase() === "en cours"
      ? "bg-[#FCE9A4]"
      : "bg-[#EDEDED]";
  return (
    <div className="w-full flex items-center justify-between">
      <p className="text-[14px] text-[#6E7787]">Etape : {stepNumber}</p>
      <InputBox placeholder={step} readOnly={true} />


      <Dropdown  label={ProfileLabel(stepSelected,bgColor )} classMenuItems={`w-[211px] top-[50px]  ${bgColor} `} class={` ${bgColor}`}>

        <Menu.Item key={1} className="">
        {({ active }) => (
            <div
               onClick={(e) => {
                setstepSelected(e.target.innerText)
                onchange(e.target.innerText, step)
                console.log("Step: ",e.target.innerText, "abc :", step)}}
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
              onClick={(e) => {
                setstepSelected(e.target.innerText)
                onchange(e.target.innerText, step)
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
                  <span className="block text-sm">En cours</span>
                </div>
              </div>
            </div>
          )}
        </Menu.Item>
        <Menu.Item key={3} className="">
        {({ active }) => (
            <div
              onClick={(e) => {
                setstepSelected(e.target.innerText)
                onchange(e.target.innerText, step)
                console.log(e.target.innerText)}}
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
    {
  isloading &&  <div className="flex items-center gap-2">

                      <div className="animate-spin w-5 h-5 border-t-2 border-b-2 border-[#1E1E1E] rounded-full"></div>
                    </div>

}
    </div>
  );
};

export default ValidationStep;
