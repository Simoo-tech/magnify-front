import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { PopUp } from "../components/PopUp";
import icon3 from "/assets/icon3.svg";
import { useLang } from "../context/LangContext";
import { ContactUsLink } from "../components/contactUsLink";
import { FooterLinks } from "../components/FooterLinks";
import { preload } from "react-dom";
import { CopyRight } from "../components/CopyRight";

function MainLayout({ children, overFlow, type }) {
  const [popUp, setPopUp] = useState(false);
  const { lang } = useLang();
  const langDir = lang === "ar" ? "rtl" : "ltr";

  preload("/assets/background1.svg", {
    as: "image",
  });
  preload("/assets/background2.svg", {
    as: "image",
  });
  preload("/assets/background3.svg", {
    as: "image",
  });
  preload("/assets/background4.svg", {
    as: "image",
  });
  preload("/assets/background5.svg", {
    as: "image",
  });
  preload("/assets/background1-res.svg", {
    as: "image",
  });
  preload("/assets/background2-res.svg", {
    as: "image",
  });
  preload("/assets/background3-res.svg", {
    as: "image",
  });
  preload("/assets/background4-res.svg", {
    as: "image",
  });
  preload("/assets/background5-res.svg", {
    as: "image",
  });
  if (type === "login" || type === "logout") {
    return (
      <section
        id="layout"
        dir={lang === "ar" ? "rtl" : "ltr"}
        className={`w-full relative bg-white grid max-w-full gap-4 content-between items-center
    h-dvh overflow-hidden bg-no-repeat bg-origin-border
    ${
      (type === "login" || type === "logout") &&
      `bg-cover bg-center bg-[url('/assets/background1.svg')]`
    } `}
      >
        <Navbar type={type} logoStyle={false} />
        <div
          style={{ overflowY: overFlow }}
          className=" w-full h-full flex flex-col justify-center items-center"
          id="content"
          dir={langDir}
        >
          {children}
        </div>
        {type === "login" && <FooterLinks />}
      </section>
    );
  } else if (
    type === "user-projects" ||
    type === "dashboard" ||
    type === "create-user"
  ) {
    return (
      <section
        id="layout"
        dir={lang === "ar" ? "rtl" : "ltr"}
        className={`w-full relative bg-white grid max-w-full  content-between items-center
      h-dvh overflow-hidden bg-no-repeat bg-origin-border
          ${
            type === "user-projects" &&
            ` bg-[url('/assets/background6.svg')] bg-top bg-cover `
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
          className=" w-full h-full flex flex-col justify-between items-center pt-5 overflow-y-auto"
          id="section-h"
          dir={langDir}
        >
          {children}
          <CopyRight />
        </div>
      </section>
    );
  } else if (
    type !== "login" ||
    type !== "user-projects" ||
    type !== "dashboard" ||
    type !== "create-user"
  ) {
    return (
      <section
        id="layout"
        dir={lang === "ar" ? "rtl" : "ltr"}
        className={`w-full relative bg-white grid max-w-full gap-4 content-between items-center grid-rows
    h-dvh overflow-hidden bg-no-repeat bg-origin-border
    ${
      type === "not-found" &&
      `bg-cover bg-center bg-[url('/assets/background1.svg')]`
    }  ${
          type === "upload-files" &&
          `sm:!bg-[url('/assets/background5-res.svg')] sm:bg-[length:50%] sm:bg-right-bottom
      md:!bg-[url('/assets/background5.svg')] md:bg-contain`
        }
      ${
        (type === "reset-password" ||
          type === "forgot-password" ||
          type === "verify-otp") &&
        `sm:!bg-[url('/assets/background4-res.svg')] sm:bg-[length:50%] sm:bg-left-bottom 
      md:!bg-[url('/assets/background2.svg')] md:bg-contain`
      }  ${
          type === "check-email" &&
          `sm:!bg-[url('/assets/background2-res.svg')] sm:bg-[length:50%] sm:bg-right-bottom 
      md:!bg-[url('/assets/background4.svg')] md:bg-contain`
        }
    ${
      type === "create-password" &&
      `sm:!bg-[url('/assets/background1-res.svg')] sm:bg-[length:50%] sm:bg-right-bottom 
      md:!bg-[url('/assets/background5.svg')] md:bg-contain`
    } 
      ${
        (type === "verify-email" || type === "phone-login") &&
        `sm:!bg-[url('/assets/background3-res.svg')] sm:bg-[length:50%] sm:bg-right-bottom 
      md:!bg-[url('/assets/background3.svg')] md:bg-contain`
      } 
        ${
          type === "user-projects" &&
          ` bg-[url('/assets/background6.svg')] bg-top bg-cover `
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
          className=" w-full h-full flex flex-col justify-center items-center "
          dir={langDir}
        >
          {children}
        </div>
        <ContactUsLink
          Margin={
            (type === "upload-files" && "20") ||
            (type === "verify-email" && "20") ||
            (type === "forgot-password" && "24") ||
            (type === "phone-login" && "16") ||
            (type === "verify-otp" && "24") ||
            (type === "check-email" && "20") ||
            (type === "create-password" && "20")
          }
        />
      </section>
    );
  }
}

export default MainLayout;
