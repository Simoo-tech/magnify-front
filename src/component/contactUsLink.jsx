import React from "react";
import { useLang } from "../context/LangContext";
import { Link } from "react-router-dom";

export const ContactUsLink = ({ visible }) => {
  const [lang] = useLang();

  return (
    <span
      id="need-help"
      className={`${
        !visible && "sm:invisible"
      } sm:text-xs md:text-sm text-primary-color1 `}
    >
      {lang === "ar" ? "هل تحتاج مساعدة؟" : "Do You Need Help?"}
      <Link
        className="font-bold mx-[1px]"
        to={"https://magnify-vt.com/contact/"}
      >
        {lang === "ar" ? "تواصل معنا" : "  Contact Us"}
      </Link>
    </span>
  );
};
