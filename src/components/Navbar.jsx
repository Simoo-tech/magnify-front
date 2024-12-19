import React, { useCallback } from "react";
import { useLang } from "../context/LangContext";
import cookie from "react-cookies";
/////// assets
import logo from "/assets/logo/mainLogo.svg";
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
  const handleChangeLang = useCallback(() => {
    const newLang = lang === "ar" ? "en" : "ar";
    window.localStorage.setItem("lang", newLang);
    window.location.reload();
  }, [setLang, lang]);

  const langDir = lang === "ar" ? "rtl" : "ltr";

  return (
    <nav className="py-3 items-center flex justify-between bg-primary-color1 container max-w-full ">
      <img src={logo} alt="magnify-logo" className="sm:w-[90px] md:w-[100px]" />
      {user ? (
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
      ) : null}
    </nav>
  );
};
