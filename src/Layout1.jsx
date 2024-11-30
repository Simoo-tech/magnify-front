import React from "react";
import BackgroundImg from "/assets/background1.svg";
import Nav2 from "./components/Nav2";
import { ContactUsLink } from "./components/contactUsLink";

export default function Layout1({ children, logoStyle, footer }) {
  return (
    <section
      style={{ backgroundImage: `url("${BackgroundImg}")` }}
      className="bg-cover bg-local bg-origin-border	bg-center w-full h-dvh overflow-y-auto container max-w-full 
      flex flex-col items-center justify-between gap-5 pb-3"
    >
      <Nav2 logoStyle={logoStyle} />
      {children}
      {/* contact us link */}
      {footer && <ContactUsLink />}
    </section>
  );
}
