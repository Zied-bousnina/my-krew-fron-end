import React from "react";
import Image from "./Image";

const StatisticBox = ({
  icon,
  title,
  numberOfNotifications,
  isSelected = false,
}) => {
  return (
    <div
      className={`w-full p-3 cursor-pointer flex items-center justify-between text-[#68461F] ${
        isSelected ? "bg-[#E9E2CF]  rounded-[4px]" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <Image src={icon} className="w-5 h-5" />
        <p className="text-[14px] font-bold">{title}</p>
      </div>
      <span className="text-[14px] font-extrabold">
        {numberOfNotifications}
      </span>
    </div>
  );
};

export default StatisticBox;
