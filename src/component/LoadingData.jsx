import React from "react";
import { Oval } from "react-loader-spinner";

export const LoadingData = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Oval width={60} color="#497B62" />
    </div>
  );
};
