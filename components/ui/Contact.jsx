import React from "react";
import Image from "./Image";

const Contact = ({
  icon = "",
  label = "",
  text,
  isBadge = false,
  bgColor = "",
  textColor = "",
  badgeIcon = "",
  children,
}) => {
  return (
    <div className="flex items-center gap-4 mt-4 cursor-pointer">
      {icon ? <Image src={icon} className="w-4 h-4 text-[#565E6C]" /> : null}
      {label ? <p className={`text-[16px] text-[#6E7787]`}>{label}</p> : null}
      <p
        className={`text-[15px] text-[#323842] font-normal ${
          isBadge
            ? `px-4  flex items-center justify-center text-[9px] font-semibold min-w-[58px] h-[24px] rounded-[4px] ${
                badgeIcon ? bgColor : "bg-[#F7F5EF] "
              }`
            : ""
        }
            `}
      >
        {text ? (
          <div
            className={`flex items-center gap-1 ${badgeIcon ? textColor : ""}`}
          >
            {text}
            {badgeIcon ? <Image src={badgeIcon} className="w-2 h-2" /> : null}
          </div>
        ) : (
          children
        )}
      </p>
    </div>
  );
};

export default Contact;
