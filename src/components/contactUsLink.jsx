import React from "react";
import { useLang } from "../context/LangContext";
import { Link } from "react-router-dom";

export const ContactUsLink = ({ visible }) => {
  const [lang] = useLang();

  return (
    <footer
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`${
        !visible && "sm:invisible"
      } footer flex justify-center items-center text-primary-color1 gap-1
    sm:mb-28 sm:text-sm
    md:text-base md:mb-0`}
    >
      <span id="need-help">
        {lang === "ar" ? "هل تحتاج مساعدة؟" : "Do You Need Help?"}
      </span>
      <Link
        className="font-bold hover:text-primary-color3"
        to={"https://magnify-vt.com/contact/"}
      >
        {lang === "ar" ? "تواصل معنا" : "Contact Us"}
      </Link>
    </footer>
  );
};
