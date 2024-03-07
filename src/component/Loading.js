import React from "react";
import { Oval } from "react-loader-spinner";

export const Loading = () => {
  return (
    <div className="absolute w-full h-full bg-color1 flex justify-center items-center">
      <Oval />
    </div>
  );
};
