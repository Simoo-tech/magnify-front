import React from "react";
import { GoDotFill } from "react-icons/go";

export const Line = ({ w, h }) => {
  return (
    <div id="line" className="relative w-full">
      <hr
        style={{ height: h, width: w }}
        className="rounded-xl bg-primary-color2 relative"
      />
      <GoDotFill
        size={25}
        color="#2B5540"
        className="absolute border-[4px] rounded-full bg-white border-white
              top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] "
      />
    </div>
  );
};
