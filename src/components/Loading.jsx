import React from "react";

export const Loading = () => {
  return (
    <div className="flex justify-center top-0 fixed z-50 items-center w-full h-full bg-white">
      <video
        className="sm:w-[90%] md:w-[60%] lg:w-[30%]"
        autoPlay
        playsInline
        muted
        loop
      >
        <source src="/assets/logo animation.mp4" type="video/mp4" />
      </video>
    </div>
  );
};
