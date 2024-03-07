import React from "react";
import { FaCheckCircle } from "react-icons/fa";
export const Message = ({ active, text, success }) => {
  return (
    active && (
      <div className=" gap-5 flex items-center justify-center w-full">
        {success && (
          <FaCheckCircle color="green" size={23} className="text-white" />
        )}
        <p className="capitalize text-lg font-semibold text-black">{text}</p>
      </div>
    )
  );
};
