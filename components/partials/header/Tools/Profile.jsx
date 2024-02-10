import React from "react";
import Dropdown from "@/components/ui/Dropdown";
import Icon from "@/components/ui/Icon";
import { Menu, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "@/components/partials/auth/store";
import { useRouter } from "next/navigation";

const ProfileLabel = () => {
  return (
    <div className="flex items-center justify-between gap-3 p-4 w-[211px] h-[50px] bg-[#FEFCF1] border-[1.5px] border-[#EAE3D5] rounded-[13px]">
      <div className="flex gap-2">
        <div className="">
          <div className="relative lg:h-8 lg:w-8 h-7 w-7 rounded-full">
            <img
              src="/assets/images/all-img/user.png"
              alt=""
              className="block w-full h-full object-cover rounded-full"
            />
            <span className="absolute bottom-0.5 left-7 w-[6px] h-[6px] bg-[#00C97B] rounded-[50%]"></span>
          </div>
        </div>
        <div className="flex-none text-slate-600 dark:text-white text-sm font-normal items-center lg:flex hidden overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="overflow-hidden text-ellipsis whitespace-nowrap w-[85px] block font-semibold">
            Albert Flores
          </span>
        </div>
      </div>
      <span className="text-base inline-block ltr:ml-[10px] rtl:mr-[10px]">
        <Icon icon="heroicons-outline:chevron-down"></Icon>
      </span>
    </div>
  );
};

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const ProfileMenu = [
    {
      label: "Profile",
      icon: "heroicons-outline:user",

      action: () => {
        router.push("/profile");
      },
    },
    {
      label: "Chat",
      icon: "heroicons-outline:chat",
      action: () => {
        router.push("/chat");
      },
    },
    {
      label: "Email",
      icon: "heroicons-outline:mail",
      action: () => {
        router.push("email");
      },
    },
    {
      label: "Todo",
      icon: "heroicons-outline:clipboard-check",
      action: () => {
        router.push("/todo");
      },
    },
    {
      label: "Settings",
      icon: "heroicons-outline:cog",
      action: () => {
        router.push("/settings");
      },
    },
    {
      label: "Price",
      icon: "heroicons-outline:credit-card",
      action: () => {
        router.push("/pricing");
      },
    },
    {
      label: "Faq",
      icon: "heroicons-outline:information-circle",
      action: () => {
        router.push("/faq");
      },
    },
    {
      label: "Logout",
      icon: "heroicons-outline:login",
      action: () => {
        dispatch(handleLogout(false));
      },
    },
  ];

  return (
    <Dropdown label={ProfileLabel()} classMenuItems="w-[211px] top-[50px] ">
      {ProfileMenu.map((item, index) => (
        <Menu.Item key={index} className="">
          {({ active }) => (
            <div
              onClick={() => item.action()}
              className={`${
                active
                  ? "bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-300 dark:bg-opacity-50"
                  : "text-slate-600 dark:text-slate-300"
              } block     ${
                item.hasDivider
                  ? "border-t border-slate-100 dark:border-slate-700"
                  : ""
              }`}
            >
              <div className={`block cursor-pointer px-4 py-2`}>
                <div className="flex items-center">
                  <span className="block text-xl ltr:mr-3 rtl:ml-3">
                    <Icon icon={item.icon} />
                  </span>
                  <span className="block text-sm">{item.label}</span>
                </div>
              </div>
            </div>
          )}
        </Menu.Item>
      ))}
    </Dropdown>
  );
};

export default Profile;
