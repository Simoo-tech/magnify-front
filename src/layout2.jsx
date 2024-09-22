import React from "react";
import BackgroundImg3 from "/assest/background3.svg";
import BackgroundImg2 from "/assest/background2.svg";
import BackgroundImg4 from "/assest/background4.svg";
import BackgroundImg5 from "/assest/background5.svg";
import { Nav2 } from "./component/Nav2";
import { ContactUsLink } from "./component/contactUsLink";

export default function Layout2({ children, type }) {
  return (
    <div
      style={{
        backgroundImage: `url("${
          (type === "reset-password" && BackgroundImg2) ||
          (type === "check-email" && BackgroundImg4) ||
          (type === "create-password" && BackgroundImg5) ||
          (type === "verify-email" && BackgroundImg3)
        }")`,
      }}
      className="bg-contain bg-no-repeat bg-origin-border bg-bottom w-full relative bg-white
      h-full container max-w-full flex flex-col justify-between items-center py-3"
    >
      <Nav2 />
      {children}
      <ContactUsLink />
    </div>
  );
}
