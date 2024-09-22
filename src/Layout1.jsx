import React from "react";
import BackgroundImg from "/assest/background1.svg";
import { Nav2 } from "./component/Nav2";

export default function Layout1({ children, logoStyle }) {
  return (
    <div
      style={{ backgroundImage: `url("${BackgroundImg}")` }}
      className="bg-cover bg-fixed bg-origin-border	bg-center w-full h-full
      container max-w-full flex flex-col justify-between items-center py-3"
    >
      <Nav2 logoStyle={logoStyle} />
      {children}
    </div>
  );
}
