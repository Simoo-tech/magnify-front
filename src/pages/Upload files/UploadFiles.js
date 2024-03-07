import React, { useEffect, useState } from "react";
import imgae from "../../assest/sessionData.webp";
import { Link, Outlet } from "react-router-dom";

export default function UploadFiles() {
  const [uploadType, setUploadType] = useState();
  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);
  return (
    <div
      id="upload-files"
      className="section-h w-full items-center flex justify-center relative"
    >
      <div
        id="choose-upload-Type"
        className={`${
          uploadType && "hidden"
        }  w-full h-full flex bg-white bg-no-repeat bg-cover bg-center relative
        before:absolute before:top-0 before:left-0 before:bg-black before:w-full 
        before:h-full before:opacity-70`}
        style={{ backgroundImage: `url(${imgae})` }}
      >
        <div className="sm:text-xl lg:text-3xl w-full h-full sm:flex-col md:flex-row flex justify-between items-center z-20">
          <Link
            to={"session-data"}
            className="SessionData sm:w-full md:w-6/12 group h-full flex justify-center items-center"
          >
            <h2 className=" capitalize font-light text-white group-hover:scale-125 duration-150">
              photo session data
            </h2>
          </Link>
          <span
            className={`sm:w-[97%] sm:h-[1px] md:w-[1px] md:h-[97%] rounded-xl bg-color1`}
          ></span>
          <Link
            to={"missing-photo"}
            className="MissingPhoto sm:w-full md:w-6/12 group h-full flex justify-center items-center"
          >
            <h2 className=" capitalize font-light text-white group-hover:scale-125 duration-150">
              Missing Photo
            </h2>
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
