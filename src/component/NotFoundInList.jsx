import React from "react";
import { MdOutlineSearchOff } from "react-icons/md";

export const NotFoundInList = ({ textStyle, text, color, height, border }) => {
  return (
    <div
      className={`${height} ${
        border && " border-b-2 border-x-2 border-primary-color2"
      }  
      w-full flex self-center flex-col justify-center items-center gap-5`}
    >
      <MdOutlineSearchOff
        color={color}
        className="lg:text-8xl md:text-5xl sm:text-4xl"
      />
      <p
        className={`${textStyle} capitalize lg:text-xl md:text-lg sm:text-base`}
      >
        {text}
      </p>
    </div>
  );
};
