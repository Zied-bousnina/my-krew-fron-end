import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  const onChange = (e) => {
    setValue(e.target.value);
    setFilter(e.target.value || undefined);
  };
  return (
    <div>
      <Textinput
        className="h-[53px] border rounded-xl border-[#EAE3D5] focus:border-[#EAE3D5]"
        value={value || ""}
        onChange={onChange}
        placeholder="Rechercher ..."
      />
    </div>
  );
};

export default GlobalFilter;
