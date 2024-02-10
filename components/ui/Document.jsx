import React from "react";
import Image from "./Image";

const Document = ({ icon, title, date, bgColor }) => {
  return (
    <div className="flex items-center justify-between min-w-[440px] min-h-[68px] border border-[#EFEBE1] rounded-[4px] p-6 shadow-sm shadow-[#EFEBE1]">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 ${bgColor} rounded-full flex items-center justify-center`}
        >
          <Image src={icon} className="w-4 h-4" />
        </div>
        <div className="flex flex-col items-start">
          <p className="text-[17px] font-semibold text-[#323842]">{title}</p>
          <span className="text-[13px] text-[#9095A0]">
            Invoice date: {date}
          </span>
        </div>
      </div>

      <div className="flex gap-1 items-center justify-center w-[100px] h-[24px] bg-[#379ae624] rounded-[12px] cursor-pointer">
        <p className="text-[10px] text-[#379AE6]">Télécharger</p>
        <Image src="/assets/icons/download.svg" className="w-3 h-3" />
      </div>
    </div>
  );
};

export default Document;
