import React, { useContext } from "react";
import LanguageCon from "../Context";
import sublogo from "../assest/logo/logo-darkGreen.png";

export const Header = () => {
  const { english, setEnglish } = useContext(LanguageCon);

  const ChangeeLang = () => {
    setEnglish(!english);
    window.localStorage.setItem("english", english);
  };
  
  return (
    <div className="logo py-2 w-full flex justify-center h-fit bg-[#647d6866]">
      <div className="container flex justify-between items-center w-full">
        <img src={sublogo} alt="logo" className="w-[30px]" />
        <button
          className="button capitalize text-lg border-2 border-darkGrey text-darkGray py-1 px-3 "
          onClick={ChangeeLang}
        >
          {english ? "ar" : "en"}
        </button>
      </div>
    </div>
  );
};
