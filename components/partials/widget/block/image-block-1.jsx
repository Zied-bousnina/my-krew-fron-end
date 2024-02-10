import Image from "@/components/ui/Image";
import React from "react";

const ImageBlock1 = ({
  title,
  amount,
  amountColor = "text-[#FEFCF1]",
  growth,
  bgColor = "bg-[#1E1E1E]",
  border = "",
}) => {
  return (
    <div
      className={`bg-no-repeat bg-cover bg-center p-5 rounded-[6px] relative ${bgColor} ${border}`}
    >
      <Image
        src="/assets/icons/dots.svg"
        width={1}
        height={1}
        alt="dots"
        className="w-4 h-4 absolute top-[-10px] right-[-10px] cursor-pointer"
      />
      <div className="max-w-[169px]">
        <div className="text-[18px] font-bold text-[#CDC7B9] mb-2">{title}</div>
        <p className={`text-[27px] font-extrabold ${amountColor}`}>{amount}</p>
      </div>
      {growth ? (
        <div className="py-2 px-5 absolute top-10 right-2 h-4 w-10 bg-transparent border-[2px] border-white text-white rounded-lg text-[10px] font-medium flex flex-col items-center justify-center">
          <div className="flex items-center justify-center w-full h-full">
            <Image
              src="/assets/icons/up-arrow.svg"
              width={10}
              height={10}
              alt="arrow-up"
              className="w-5 h-4"
            />
            <p className="flex items-center">
              <span>{growth}</span>
              <span>%</span>
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ImageBlock1;
