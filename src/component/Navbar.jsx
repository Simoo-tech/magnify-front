import React from "react";
import { useLang } from "../context/LangContext";
import cookie from "react-cookies";
/////// assest
import logo from "/assest/logo/mainLogo.svg";
/////// icons
import { GrLanguage } from "react-icons/gr";
import { LuLogOut } from "react-icons/lu";

export const Navbar = ({ setPopUp }) => {
  const [lang, setLang] = useLang();

  // user cookies
  const user = cookie.load("user_token");
  // handle logout
  const Logout = () => {
    setPopUp(true);
  };
  // handle change languagepng
  const handleChangeLang = () => {
    if (lang === "ar") {
      setLang("en");
      window.localStorage.setItem("lang", "en");
    } else {
      setLang("ar");
      window.localStorage.setItem("lang", "ar");
    }
  };

  const langDir = lang === "ar" && "rtl";

  return (
    <nav
      dir={langDir ? langDir : undefined}
      className="logo py-3 max-w-full container flex justify-between h-fit top-0 bg-primary-color1 sticky z-50 "
    >
      <img
        loading="eager"
        src={logo}
        alt="magnify-logo"
        className="sm:w-[85px] md:w-[110px]"
      />
      {user ? (
        <div
          className=" flex items-center
        md:gap-5
        sm:gap-2"
          dir={langDir}
        >
          <button
            id="focus-btn"
            dir={langDir}
            onClick={Logout}
            className="text-primary-color1 font-normal bg-lightGreen/70 py-1 px-3 rounded-2xl flex items-center gap-1
            hover:bg-lightGreen duration-200
            md:text-sm
            sm:text-xs"
          >
            <LuLogOut />
            <span>{lang === "ar" ? "تسجيل خروج" : "Log out"}</span>
          </button>
          {/* language */}
          <button
            id="focus-btn"
            onClick={handleChangeLang}
            className="uppercase flex gap-2 items-center text-lightGreen font-normal
              md:text-sm
            sm:text-xs"
          >
            <GrLanguage size={20} />
            {lang === "ar" ? "en" : "ar"}
          </button>
        </div>
      ) : null}
    </nav>
  );
};
