import React from "react";
import { GrLanguage } from "react-icons/gr";
import { useLang } from "../context/LangContext";
import logo from "/assest/logo/mainLogo2.svg";

export const Nav2 = ({ logoStyle }) => {
  // handle change languagepng
  const [lang, setLang] = useLang();
  const handleChangeLang = () => {
    if (lang === "ar") {
      setLang("en");
      window.localStorage.setItem("lang", "en");
    } else {
      setLang("ar");
      window.localStorage.setItem("lang", "ar");
    }
  };

  // languages container style
  const langDir = lang === "ar" && "rtl";

  return (
    <div
      dir={langDir ? langDir : undefined}
      className={`flex ${
        logoStyle ? "justify-end" : "justify-between"
      } items-center w-full`}
    >
      <img
        src={logo}
        alt="magnify-logo"
        width={"110px"}
        className={logoStyle}
      />
      <button
        onClick={handleChangeLang}
        className="uppercase flex gap-2 items-center text-primary-color1 font-bold 
        md:text-base
        sm:text-sm"
      >
        <GrLanguage className="sm:text-[20px] md:text-[25px] " />
        {lang === "ar" ? "en" : "ar"}
      </button>
    </div>
  );
};
