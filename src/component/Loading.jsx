import React from "react";
import video1 from "/assest/logo animation.mp4";

export const Loading = () => {
  return (
    <div className="flex justify-center top-0 fixed items-center w-full h-full bg-white">
      <video
        className="sm:w-[90%] md:w-[60%] lg:w-[30%]"
        autoPlay
        playsInline
        muted
        loop
      >
        <source src={video1} type="video/mp4" />
      </video>
    </div>
  );
};
