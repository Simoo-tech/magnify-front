import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LangContext";

export const FooterLinks = () => {
  const { lang } = useLang();

  const getText = (enText, arText) =>
    lang === "en" || !lang ? enText : arText;

  const links = [
    {
      id: "about-us",
      url: "https://magnify-vt.com/",
      text: getText("About Magnify", "عن Magnify"),
    },
    {
      id: "privacy-terms",
      url: "https://magnify-vt.com/privacy-policy/",
      text: getText("Privacy Terms", "شروط الخصوصية"),
    },
    {
      id: "contact-us",
      url: "https://magnify-vt.com/contact/",
      text: getText("Contact Us", "تواصل معنا"),
    },
  ];
  return (
    <footer
      id="bottom-links"
      className="footer flex flex-row justify-between w-full bg-transparent gap-2 mb-2 container max-w-full h-fit"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {links.map((link) => (
        <Link
          key={link.id}
          id={link.id}
          to={link.url}
          className="text-center text-primary-color2 font-semibold w-fit lg:text-base md:text-sm sm:text-[12px]
        hover:text-primary-color1 "
        >
          {link.text}
        </Link>
      ))}
    </footer>
  );
};
