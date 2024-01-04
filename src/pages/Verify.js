import React, { useEffect, useState } from "react";
import logo from "../assest/logo/mainLogo.png";
import { useCookies } from "react-cookie";
import axios from "axios";

export const Verify = () => {
  const [cookies] = useCookies(["user_token"]);
  const user = cookies.user_token.email;

  const [verified, setVerified] = useState(false);
  // handle submit
  const HandleSubmit = (e) => {
    e.preventDefault();
    setVerified(true);
  };
  return (
    <div className="section-h bg-color1 flex justify-center items-center">
      {verified ? (
        <div className="container"></div>
      ) : (
        <div
          className="container bg-darkGrey sm:9/12 xl:w-8/12 h-5/6 py-2 rounded-lg  flex
      flex-col items-center gap-5 justify-evenly text-white "
        >
          <img src={logo} alt="logo" className="w-[220px]" />
          <h2 className="lg:text-4xl font-bold ">Verify your email address</h2>
          <div className="text flex flex-col items-center gap-4">
            <p className="lg:text-lg text-center ">
              Please confirm that you want to use this as your magnify account
              email address <br />
              your email:
              <span className=" text-color2 ml-2 underline">{user}</span>
            </p>
            <span className="lg:text-lg text-center capitalize">
              to continue click send verifictaion code
            </span>
          </div>
          <button
            onClick={HandleSubmit}
            className="bg-white py-2 px-6 text-lg text-color1 rounded-lg capitalize font-semibold"
          >
            send verifictaion code
          </button>
        </div>
      )}
    </div>
  );
};

export const Verified=()=>{
  useEffect(()=>{})
}