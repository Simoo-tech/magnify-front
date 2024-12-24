import React, { useMemo } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import icon7 from "/assets/icon7.svg";
import icon8 from "/assets/icon8.svg";
import { SecondaryBtn } from "../../components/Btns";
import MainLayout from "../../Layout/MainLayout";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { useLang } from "../../context/LangContext";

export default function Upload() {
  const navigate = useNavigate();
  const { lang } = useLang();
  const langDir = lang === "ar" ? "rtl" : "ltr";

  // Handle text based on language
  const getText = useMemo(
    () => (enText, arText) => lang === "en" || !lang ? enText : arText,
    [lang]
  );

  return (
    <MainLayout type="upload-files">
      <section
        dir={langDir}
        id="upload-files"
        className=" h-full w-full items-center flex flex-col justify-between container max-w-full"
      >
        <div
          id="choose-upload-Type"
          className="flex justify-between items-center h-full w-full
          sm:flex-col
          md:flex-row"
        >
          <div
            id="session-data-btn"
            className="SessionData group h-full flex flex-col gap-5 justify-center items-center
            sm:w-full
            md:w-6/12"
          >
            <LazyLoadImage
              src={icon8}
              alt="photo-session-data"
              className="sm:w-[50px] md:w-[80px] lg:w-[99px]"
            />
            <SecondaryBtn
              action={() => navigate("session-data")}
              text="photo session data"
              style="truncate"
            />
          </div>
          {/* line */}
          <div
            className="sm:w-[80%] sm:h-1 md:w-1 md:h-[80%] bg-primary-color1 text-center 
          flex justify-center items-center relative rounded-2xl
          before:w-16 before:h-16 before:border before:border-primary-color1 before:rounded-full before:absolute before:top-[50%] before:translate-y-[-50%] before:z-0 before:bg-white"
          >
            <span className="text-primary-color1 relative capitalize text-2xl font-semibold">
              {getText("or", "او")}
            </span>
          </div>
          {/* end line */}
          <div
            id="missing-photo-btn"
            className="SessionData group h-full flex flex-col gap-5 justify-center items-center
            sm:w-full
            md:w-6/12"
          >
            <LazyLoadImage
              src={icon7}
              alt="Missing-Photo"
              className="sm:w-[90px] md:w-[160px] lg:w-[200px]"
            />
            <SecondaryBtn
              action={() => navigate("missing-photo")}
              text="Missing Photo"
              style="truncate"
            />
          </div>
        </div>
      </section>
      <Outlet />
    </MainLayout>
  );
}
