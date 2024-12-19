import React from "react";
import Nav2 from "./components/Nav2";
import { ContactUsLink } from "./components/contactUsLink";

export default function Layout2({ children, type }) {
  return (
    <section
      className={`bg-no-repeat bg-cover bg-origin-border w-full relative bg-white
      h-dvh flex flex-col items-center justify-start container max-w-full max-h-dvh overflow-y-auto gap-5 pb-3
      ${
        type === "upload-files" &&
        `sm:!bg-[url('../public/assets/background5-res.svg')] sm:bg-[length:50%] sm:bg-right-bottom 
        md:!bg-[url('../public/assets/background5.svg')] md:bg-contain`
      }
        ${
          type === "reset-password" &&
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
          type === "verify-email" &&
          `sm:!bg-[url('../public/assets/background3-res.svg')] sm:bg-[length:50%] sm:bg-right-bottom 
        md:!bg-[url('../public/assets/background3.svg')] md:bg-contain`
        } `}
    >
      <Nav2 />
      {children}
      <ContactUsLink
        visible={
          type === "reset-password" ||
          type === "check-email" ||
          type === "create-password" ||
          type === "verify-email" ||
          type === "forgot-password"
        }
      />
    </section>
  );
}
