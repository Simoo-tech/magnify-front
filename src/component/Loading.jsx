import React from "react";
import video1 from "/assest/logo animation.mp4";

export const Loading = () => {
  return (
    <div className="flex justify-center items-center w-full h-full bg-white">
      {/* <img src={video} alt="" width={500} className=" bg-white" /> */}
      <video width="30%" height="30%" autoPlay playsInline muted loop>
        <source src={video1} type="video/mp4" />
      </video>
    </div>
  );
};
