import React from "react";
import { GoDotFill } from "react-icons/go";

export const Line = ({ w, h, color }) => {
  return (
    <div
      id="line"
      className="relative bg-primary-color2 rounded-xl "
      style={{ height: h, width: w }}
    >
      <GoDotFill
        size={25}
        color={color ? color : "#2B5540"}
        className="absolute border-[4px] rounded-full bg-white border-white z-30
              top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] "
      />
    </div>
  );
};
