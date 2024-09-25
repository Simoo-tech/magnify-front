import React from "react";
import { Nav2 } from "./component/Nav2";
import { ContactUsLink } from "./component/contactUsLink";

export default function Layout2({ children, type }) {
  return (
    <div
      className={`bg-no-repeat bg-origin-border bg-bottom w-full relative bg-white
      h-full container max-w-full flex flex-col items-center py-3 justify-between
      sm:gap-5
      md:gap-10
      ${
        type === "upload-files" &&
        `sm:!bg-[url('../public/assest/background5-res.svg')] sm:bg-[length:70%] sm:bg-right-bottom 
        md:!bg-[url('../public/assest/background5.svg')] md:bg-contain`
      }
        ${
          type === "reset-password" &&
          `sm:!bg-[url('../public/assest/background4-res.svg')] sm:bg-[length:70%] sm:bg-left-bottom 
        md:!bg-[url('../public/assest/background2.svg')] md:bg-contain`
        }  ${
        type === "check-email" &&
        `sm:!bg-[url('../public/assest/background2-res.svg')] sm:bg-[length:85%] sm:bg-right-bottom 
        md:!bg-[url('../public/assest/background4.svg')] md:bg-contain`
      }
      ${
        type === "create-password" &&
        `sm:!bg-[url('../public/assest/background1-res.svg')] sm:bg-[length:85%] sm:bg-right-bottom 
        md:!bg-[url('../public/assest/background5.svg')] md:bg-contain`
      } 
        ${
          type === "verify-email" &&
          `sm:!bg-[url('../public/assest/background3-res.svg')] sm:bg-[length:85%] sm:bg-right-bottom 
        md:!bg-[url('../public/assest/background3.svg')] md:bg-contain`
        } `}
    >
      <Nav2 />
      <div
        className="flex h-full flex-col items-center w-full gap-10
      sm:justify-evenly 
      md:justify-between"
      >
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
      </div>
    </div>
  );
}
