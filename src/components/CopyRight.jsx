import React from "react";
import { useLang } from "../context/LangContext";
export const CopyRight = () => {
  const [lang] = useLang();
  return (
    <footer
      className="footer-center footer bg-primary-color3 py-4 text-white 
    lg:text-md
    md:text-sm
    sm:text-xs"
    >
      {lang === "ar"
        ? "Copyrights@2024 magnify جميع الحقوق محفوظة   ."
        : "Copyrights@2024 magnify All rights reserved ."}
    </footer>
  );
};
