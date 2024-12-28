import React, { useMemo } from "react";
import { useLang } from "../context/LangContext";
import { Link } from "react-router-dom";

export const ContactUsLink = ({ type }) => {
  const { lang } = useLang();
  const langDir = lang === "ar" ? "rtl" : "ltr";

  const getText = useMemo(
    () => (enText, arText) => lang === "en" || !lang ? enText : arText,
    [lang]
  );

  return (
    <footer
      dir={langDir}
      className={`footer flex justify-center items-start text-primary-color1 gap-1 
${
  (type === "upload-files" && "sm:mb-20") ||
  (type === "verify-email" && "sm:mb-20") ||
  (type === "forgot-password" && "sm:mb-24") ||
  (type === "phone-login" && "sm:mb-16") ||
  (type === "verify-otp" && "sm:mb-24") ||
  (type === "check-email" && "sm:mb-20") ||
  (type === "create-password" && "sm:mb-20")
} sm:text-sm
md:text-base md:mb-3`}
    >
      <span id="need-help">
        {getText("Do You Need Help?", "هل تحتاج مساعدة؟")}
      </span>
      <Link
        className="font-bold hover:text-primary-color3"
        to={"https://magnify-vt.com/contact/"}
      >
        {getText("Contact Us", "تواصل معنا")}
      </Link>
    </footer>
  );
};
