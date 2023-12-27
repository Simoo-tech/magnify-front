import React from "react";
import logo from "../assest/logo/mainLogo.png";
export const Verify = () => {
  return (
    <div className="section-h bg-darkGrey flex justify-center items-center">
      <div
        className="container bg-color1 sm:9/12 xl:w-8/12 h-5/6 py-2 rounded-lg  flex
      flex-col items-center gap-5 justify-evenly text-white "
      >
        <img src={logo} alt="logo" className="w-[220px]" />
        <h2 className="lg:text-4xl font-bold ">Verify your email address</h2>
        <div className="text flex flex-col items-center gap-4">
          <p className="lg:text-lg text-center ">
            Please confirm that you want to use this as your magnify account
            email address <br />
            your email:
            <span className=" text-blue-600 ml-2 font-semibold underline">
              {"school12p@gmail.com"}
            </span>
          </p>
          <span className="lg:text-lg text-center capitalize">
            to continue click in send verifictaion code
          </span>
        </div>
        <button className="bg-white py-2 px-6 text-lg text-color1 rounded-lg capitalize font-semibold">
          send verifictaion code
        </button>
      </div>
    </div>
  );
};
