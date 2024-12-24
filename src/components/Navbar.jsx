import React, { useCallback } from "react";
import { useLang } from "../context/LangContext";
import cookie from "react-cookies";
/////// assets
import mainlogo from "/assets/logo/mainLogo2.svg";
import logo from "/assets/logo/mainLogo.svg";
/////// icons
import { GrLanguage } from "react-icons/gr";
import { LuLogOut } from "react-icons/lu";

const Navbar = ({ setPopUp, logoStyle, type }) => {
  const { lang, setLang } = useLang();

  // user cookies
  const user = cookie.load("user_token");
  // handle logout
  const Logout = () => {
    setPopUp(true);
  };
  // handle change languagepng
  const handleChangeLang = useCallback(() => {
    const newLang = lang === "ar" ? "en" : "ar";
    window.localStorage.setItem("lang", newLang);
    setLang(newLang);
  }, [setLang, lang]);

  const langDir = lang === "ar" ? "rtl" : "ltr";

  return !user || type === "not-found" ? (
    <nav
      dir={langDir}
      className={`flex container max-w-full ${
        logoStyle ? "justify-between" : "justify-end"
      } items-center w-full `}
    >
      {logoStyle && (
        <img
          src={mainlogo}
          alt="magnify-logo"
          className={` sm:w-[90px] md:w-[110px] lg:w-[130px]`}
        />
      )}
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
  ) : (
    <nav className=" items-center flex justify-between bg-primary-color1 container max-w-full py-3 row-span-1 static top-0 h-fit">
      <img src={logo} alt="magnify-logo" className="sm:w-[90px] md:w-[110px]" />
      <div
        className="flex justify-center items-center   
      md:gap-5
      sm:gap-2"
        dir={langDir}
      >
        <button
          id="focus-btn"
          dir={langDir}
          onClick={Logout}
          className="text-primary-color1 font-normal btn btn-sm border-none bg-lightGreen/70 flex items-center gap-1
          hover:bg-lightGreen duration-200"
        >
          <LuLogOut />
          <span>{lang === "ar" ? "تسجيل خروج" : "Log out"}</span>
        </button>
        {/* language */}
        <button
          id="focus-btn"
          onClick={handleChangeLang}
          className="uppercase flex gap-2 items-center btn-ghost btn btn-sm text-lightGreen font-normal"
        >
          <GrLanguage size={20} />
          {lang === "ar" ? "en" : "ar"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
