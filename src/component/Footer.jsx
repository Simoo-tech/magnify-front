import React from "react";
import { useLang } from "../context/LangContext";
export const Footer = () => {
  const [lang] = useLang();
  return (
    <div
      className="w-full flex bg-primary-color3 py-4 justify-center items-center text-white 
    lg:text-xs
    md:text-[13px]
    sm:text-[11px]"
    >
      {lang === "ar"
        ? "Copyrights@2024 magnify جميع الحقوق محفوظة   ."
        : "Copyrights@2024 magnify. All rights reserved"}
    </div>
  );
};
