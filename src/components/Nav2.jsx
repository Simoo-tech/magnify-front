import React, { useCallback } from "react";
import { GrLanguage } from "react-icons/gr";
import { useLang } from "../context/LangContext";
import logo from "/assets/logo/mainLogo2.svg";

const Nav2 = ({ logoStyle }) => {
  // handle change languagepng
  const [lang, setLang] = useLang();

  const handleChangeLang = useCallback(() => {
    const newLang = lang === "ar" ? "en" : "ar";
    window.localStorage.setItem("lang", newLang);
    window.location.reload();
  }, [setLang, lang]);

  // languages container style
  const langDir = lang === "ar" ? "rtl" : "ltr";

  return (
    <nav
      dir={langDir}
      className={`flex navbar ${
        logoStyle ? "justify-end" : "justify-between"
      } items-center w-full `}
    >
      <img
        src={logo}
        alt="magnify-logo"
        className={`${logoStyle} sm:w-[90px] md:w-[110px] lg:w-[130px]`}
      />
      <button
        onClick={handleChangeLang}
        className="btn bg-transparent flex gap-1 items-center text-primary-color1 font-medium
        hover:bg-primary-color1 hover:text-white 
        
        md:text-base
        sm:text-sm"
      >
        <GrLanguage className="sm:text-sm md:text-base" />
        <span> {lang === "ar" ? "EN" : "AR"}</span>
      </button>
    </nav>
  );
};

export default React.memo(Nav2);
