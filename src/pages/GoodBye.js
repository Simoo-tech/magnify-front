import React from "react";
import { MdWavingHand } from "react-icons/md";
import Logout from "../functions/LogoutReq";

export const GoodBye = () => {
  Logout();
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div
        className=" sm:w-full lg:w-4/6 h-5/6 bg-darkGrey rounded-lg py-10 px-5 flex flex-col
        gap-5 justify-center items-center text-white "
      >
        <h1
          id="page-not-found-title"
          className="sm:text-4xl md:text-5xl lg:text-5xl uppercase font-semibold text-center gap-2 flex items-center "
        >
          Bye!
          <MdWavingHand size={50} color="#f7ca46" />
        </h1>
        <p className="sm:text-lg lg:text-2xl capitalize font-medium text-center">
          thank's for being one of our team
        </p>
        <span className="sm:text-sm lg:text-xl capitalize font-normal text-center">
          see you soon
        </span>
      </div>
    </div>
  );
};
