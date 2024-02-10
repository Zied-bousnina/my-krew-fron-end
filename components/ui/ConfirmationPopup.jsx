import React from "react";
import Card from "./Card";

const ConfirmationPopup = ({ children }) => {
  return (
    <div className="absolute left-0 top-0 w-screen min-h-screen bg-black-500/40 flex items-center justify-center z-10">
      <div className="w-[587px]">
        <Card>{children}</Card>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
