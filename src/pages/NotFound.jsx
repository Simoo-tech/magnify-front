import React from "react";
import image from "/assets/not-found.svg";
import { useLang } from "../context/LangContext";
import MainLayout from "../Layout/MainLayout";
import { useNavigate } from "react-router-dom";

export function NotFound() {
  const { lang } = useLang();
  const navigate = useNavigate();
  return (
    <MainLayout type="not-found">
      <section
        id="page-not-found"
        className="h-full w-full flex justify-center items-center flex-col gap-5 container max-w-full"
      >
        {/* image */}
        <img
          src={image}
          className="sm:w-[180px] md:w-[200px] lg:w-[250px]"
          alt="not-found-image"
        />
        {/* text */}
        <div className="flex flex-col justify-center items-center gap-8">
          <h5
            id="page-not-found-title"
            className="text-primary-color1 capitalizefont-semibold text-center
              sm:text-[65px]
              md:text-[85px]
              lg:text-[100px] "
          >
            404
          </h5>
          <div
            className="text-center flex flex-col text-primary-color1 gap-1
            sm:text-sm
            md:text-base
            lg:text-lg"
          >
            {lang === "ar"
              ? "لم يتم العثور على هذه الصفحة أو سيتم العثور عليها قريبًا."
              : "That page can't be found or it will be Soon."}
            <span className="text-center">
              {lang === "ar"
                ? "يبدو أنه لم يتم العثور على أي شيء في هذا الموقع"
                : "It looks like nothing was found at this location"}
            </span>
          </div>
          <button
            className="underline text-primary-color1 capitalize font-medium
              sm:text-sm
            md:text-base
            lg:text-lg "
            onClick={() => navigate("/")}
          >
            {lang === "ar" ? "الرجوع إلى الصفحة الرئيسية" : "Go to home page"}
          </button>
        </div>
      </section>
    </MainLayout>
  );
}
