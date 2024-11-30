import React from "react";
import logo from "/assets/logo/mainLogo2.svg";
import LogoutReq from "../lib/LogoutReq";
import Layout1 from "../Layout1";
import { Line } from "../components/Line";
import { Navigate } from "react-router-dom";
import { useLang } from "../context/LangContext";

import cookie from "react-cookies";
export default function Logout() {
  const [lang] = useLang();

  const user_cookies = cookie.load("user_token");
  LogoutReq();

  return !user_cookies ? (
    <Navigate to="/" replace />
  ) : (
    <Layout1 logoStyle="hidden">
      <section
        id="logout"
        className="flex flex-col justify-center h-full items-center gap-20 container max-w-full"
      >
        <img
          src={logo}
          className="sm:w-[100%] sm:max-w-[300px] md:max-w-full md:w-[350px] lg:w-[450px] xl:w-[550px]"
          alt="logo-logout"
        />
        <Line w="100%" h="2px" />
        <div className="flex flex-col gap-3 justify-center text-center items-center">
          <h1
            className="text-primary-color1 font-semibold truncate
          sm:text-base
          md:text-2xl
          lg:text-3xl"
          >
            {lang === "ar"
              ? "magnify شكرا لاستخدامك "
              : "Thanks you for using magnify"}
          </h1>
          <h2
            className="text-primary-color1 font-normal
            sm:text-base
          md:text-lg
          lg:text-xl"
          >
            {lang === "ar" ? "نراك قريبا" : "See you soon"}
          </h2>
        </div>
      </section>
    </Layout1>
  );
}
