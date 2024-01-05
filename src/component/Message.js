import React from "react";
import { FaCheckCircle } from "react-icons/fa";
export const Message = ({ active, text, success }) => {
  return (
    active && (
      <div
        className="fixed text-2xl left-0 top-0 w-full h-full z-30 flex items-center justify-center
before:w-full before:h-full before:bg-black before:opacity-60 before:absolute before:top-0 before:left-0"
      >
        <div className=" flex gap-3 items-center bg-white z-50 py-3 px-9 rounded-lg">
          {success ? (
            <FaCheckCircle color="green" size={28} className="text-white" />
          ) : (
            ""
          )}
          <p className="capitalize text-2xl font-semibold">{text}</p>
        </div>
      </div>
    )
  );
};
