import React from "react";
import { useLang } from "../context/LangContext";
import cookie from "react-cookies";

export const CopyRight = () => {
  const user = cookie.load("user_token");

  const { lang } = useLang();

  return (
    user && (
      <footer
        className="footer-center footer bg-primary-color3 py-3 text-white h-fit
    
    md:text-sm
    sm:text-xs"
      >
        {lang === "ar"
          ? "Copyrights@2024 magnify جميع الحقوق محفوظة   ."
          : "Copyrights@2024 magnify All rights reserved ."}
      </footer>
    )
  );
};
