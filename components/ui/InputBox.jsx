import React, { useState } from "react";
import Switch from "./Switch";
import Image from "./Image";

const InputBox = ({
  label,
  value = "",
  placeholder = "",
  isSwitched = false,
  imageSrc = "",
  additionalClasses = "",
  readOnly = false,
  name=""
}) => {
  const [inputValue, setInputValue] = useState("");
  const [switchValue, setSwitchValue] = useState(false);
  const [comment, setcomment] = useState({

  })
  const onchange = (e) => {
    setcomment({ ...comment, [e.target.name]: e.target.value });
    console.log("comment", comment)
  }


  return (
    <div>
      {label ? (
        <label htmlFor={label} className="font-bold text-[14px] text-[#6E7787]">
          {label} <span className="text-[#D8CCB2]">*</span>
        </label>
      ) : null}
      <div className="flex gap-2 items-center">
        {!imageSrc ? (
          <div>
            <input
              id={label}
              readOnly={readOnly}
              type="text"
              value={inputValue || value}
              placeholder={placeholder}
              onChange={() => {}}
              className={`bg-[#F2F2F2] w-[276px] h-[46px] text-[12px] pl-4 rounded-md border border-[#EAE3D5] outline-none ${additionalClasses}`}
            />
            {!switchValue && (
              <>

              <label
                htmlFor={label}
                className="text-[12px] text-[#FF0000] font-bold"
              >
              Commentaire
              </label>

             <input
              id={label}
              readOnly={readOnly}
              type="text"
              value={
                comment?.commentaire
              }
              placeholder={placeholder}
              name={name}
              onChange={(e) => {
                onchange(e)
              }}
              className={`bg-[#F2F2F2] w-[276px] h-[46px] text-[12px] pl-4 rounded-md border border-[#EAE3D5] outline-none ${additionalClasses}`}
            />
              </>
            )}
          </div>
        ) : (
          <Image src={imageSrc} alt="image" className="w-44 h-24" />
        )}
        {isSwitched ? (
          <Switch
            value={switchValue}
            onChange={() => setSwitchValue((curr) => !curr)}
            activeClass="bg-[#2CE254]"
          />
        ) : null}
      </div>
    </div>
  );
};

export default InputBox;
