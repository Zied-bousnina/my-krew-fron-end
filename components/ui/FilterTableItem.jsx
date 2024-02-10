import React from "react";
import Image from "./Image";

const FilterTableItem = ({
  icon,
  text,
  alt,
  additionalClasses = "",
  onClick,
}) => {
  return (
    <div
      className={`min-w-[39px] h-[38px] rounded-[10px] border border-[#EAE3D5] flex items-center gap-2 p-2 bg-white cursor-pointer ${additionalClasses}`}
      onClick={onClick}
    >
      {icon ? (
        <Image
          src={icon}
          alt={alt}
          width={20}
          height={20}
          className="w-5 h-5"
        />
      ) : null}
      {text ? <p className="text-[13px]">{text}</p> : null}
    </div>
  );
};

export default FilterTableItem;
