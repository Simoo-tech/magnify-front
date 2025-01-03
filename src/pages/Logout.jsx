import React from "react";
import { Line } from "../components/Line";
import { useLang } from "../context/LangContext";
import MainLayout from "../Layout/MainLayout";
import LogoutReq from "../lib/LogoutReq";
import { preload } from "react-dom";

export default function Logout() {
  preload("/assets/logo/mainLogo2.svg", {
    as: "image",
  });

  const { lang } = useLang();

  LogoutReq();

  return (
    <MainLayout type="logout" logoStyle="hidden">
      <section
        id="logout"
        className="flex flex-col justify-center h-full items-center gap-20 container max-w-full"
      >
        <img
          src="/assets/logo/mainLogo2.svg"
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
    </MainLayout>
  );
}
