import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { PopUp } from "../components/PopUp";
import icon3 from "/assets/icon3.svg";
import { useLang } from "../context/LangContext";
import { ContactUsLink } from "../components/contactUsLink";
import { FooterLinks } from "../components/FooterLinks";

function MainLayout({ children, overFlow, type }) {
  const [popUp, setPopUp] = useState(false);
  const { lang } = useLang();
  const langDir = lang === "ar" ? "rtl" : "ltr";

  return (
    <section
      id="layout"
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`w-full relative bg-white grid grid-rows-12 max-w-full
      h-full overflow-hidden bg-no-repeat bg-origin-border
      ${
        (type === "login" || type === "not-found" || type === "logout") &&
        `bg-cover bg-center bg-[url('../public/assets/background1.svg')]`
      }  ${
        type === "upload-files" &&
        `sm:!bg-[url('../public/assets/background5-res.svg')] sm:bg-[length:50%] sm:bg-right-bottom 
        md:!bg-[url('../public/assets/background5.svg')] md:bg-contain`
      }
        ${
          (type === "reset-password" ||
            type === "forgot-password" ||
            type === "verify-otp") &&
          `sm:!bg-[url('../public/assets/background4-res.svg')] sm:bg-[length:50%] sm:bg-left-bottom 
        md:!bg-[url('../public/assets/background2.svg')] md:bg-contain`
        }  ${
        type === "check-email" &&
        `sm:!bg-[url('../public/assets/background2-res.svg')] sm:bg-[length:50%] sm:bg-right-bottom 
        md:!bg-[url('../public/assets/background4.svg')] md:bg-contain`
      }
      ${
        type === "create-password" &&
        `sm:!bg-[url('../public/assets/background1-res.svg')] sm:bg-[length:50%] sm:bg-right-bottom 
        md:!bg-[url('../public/assets/background5.svg')] md:bg-contain`
      } 
        ${
          (type === "verify-email" || type === "phone-login") &&
          `sm:!bg-[url('../public/assets/background3-res.svg')] sm:bg-[length:50%] sm:bg-right-bottom 
        md:!bg-[url('../public/assets/background3.svg')] md:bg-contain`
        } 
          ${
            type === "user-projects" &&
            ` bg-[url('../public/assets/background6.svg')] bg-top bg-cover bg-scroll `
          }  `}
    >
      <Navbar
        type={type}
        setPopUp={setPopUp}
        logoStyle={type === "login" || type === "logout" ? false : true}
      />
      {popUp && (
        <PopUp
          setPopUp={setPopUp}
          iconImage={icon3}
          text={
            lang === "ar"
              ? " هل أنت متأكد أنك تريد تسجيل الخروج من magnify portal  "
              : "Are you sure you want to log out from magnify portal?"
          }
          type="yes-no"
          noAction={() => setPopUp(!popUp)}
          yesAction={() => {
            window.location.replace("/logout");
          }}
        />
      )}

      <div
        style={{ overflowY: overFlow }}
        className=" w-full row-span-11 flex flex-col  justify-between items-center"
        id="content"
        dir={langDir}
      >
        {children}
      </div>
      {type === "login" && <FooterLinks />}
      <ContactUsLink
        visible={
          type === "reset-password" ||
          type === "check-email" ||
          type === "create-password" ||
          type === "verify-email" ||
          type === "forgot-password" ||
          type === "phone-login" ||
          type === "verify-otp" ||
          type === "upload-files"
        }
      />
    </section>
  );
}

export default MainLayout;
