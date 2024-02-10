import React, { useState } from "react";
import Icon from "@/components/ui/Icon";
import Notification from "./header/Tools/Notification";
import Profile from "./header/Tools/Profile";
const HomeBredCurbs = ({
  title,
  notification = true,
  subTitle = "",
  variant = "",
}) => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <div className="flex justify-between flex-wrap items-center mb-6">
      <div className="flex flex-col gao-1 items-start">
        <h1 className="text-[36px] font-semibold text-3xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
          {title}
        </h1>
        {subTitle ? (
          <p className="text-[36px] font-semibold">
            <span>{subTitle}</span>
            <span className="text-[23px] text-[#68461F] italic">{variant}</span>
          </p>
        ) : null}
      </div>
      <div className="flex sm:space-x-4 space-x-2 sm:justify-end items-center rtl:space-x-reverse">
        {notification ? <Notification /> : false}
        <Profile />
      </div>
    </div>
  );
};

export default HomeBredCurbs;
