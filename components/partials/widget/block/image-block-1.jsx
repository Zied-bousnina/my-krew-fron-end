import Image from "@/components/ui/Image";
import { format } from "date-fns";
import React from "react";
import Skeleton from "react-loading-skeleton";

const ImageBlock1 = ({
  title,
  amount,
  amountColor = "text-[#FEFCF1]",
  growth = null,
  bgColor = "bg-[#1E1E1E]",
  border = "",
  isLoading = false,
  subtitle1 = "",
  subtitle2 = "",
  isDate = false,
  isMoney = false,
}) => {
  return (
    <div
      className={`bg-no-repeat min-h-[140px] max-h-[140px] bg-cover bg-center p-5 rounded-[16px] relative ${bgColor} ${border}`}
    >
      <Image
        src="/assets/icons/dots.svg"
        width={1}
        height={1}
        alt="dots"
        className="w-4 h-4 absolute top-[-10px] right-[-10px] cursor-pointer"
      />
      {isLoading && !amount ? (
        <Skeleton count={4} /> // Five-line loading skeleton
      ) : (
        !!amount && (
          <div>
            <div className="max-w-[169px]">
              <div className="text-[18px] font-bold text-[#CDC7B9] mb-2">
                {title}
              </div>
              <p className={`text-[27px] font-extrabold ${amountColor}`}>
                {isDate ? format(new Date(amount), "dd/MM/yyyy") : amount}
                {isMoney ? "€" : ""}
              </p>
              {subtitle1 !== "" && subtitle2 !== "" && (
                <div className="flex items-center justify-between">
                  <p className="italic text-sm font-extralight text-[#CDC7B9]">
                    Client: {subtitle1}
                  </p>
                  <p className="italic text-sm font-extralight text-[#CDC7B9]">
                    TJM: {subtitle2}€
                  </p>
                </div>
              )}
            </div>
            {!!growth ? (
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
        )
      )}
    </div>
  );
};

export default ImageBlock1;
