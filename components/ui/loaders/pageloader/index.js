import React from "react";
import "./styles.css";
const PageLoader = () => {
  return (
    <div className="fixed left-0 top-0 z-[10000] h-full w-full flex items-center justify-center bg-slate-700 bg-opacity-30">
      <div className="loader"></div>
    </div>
  );
};

export default PageLoader;
