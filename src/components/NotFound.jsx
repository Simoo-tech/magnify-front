import React from "react";
import Layout1 from "../Layout1";
import image from "/assets/not-found.svg";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import cookie from "react-cookies";
import { Loading } from "./Loading";
import { useLang } from "../context/LangContext";

const user_cookies = cookie.load("user_token");
const serverPath = import.meta.env.VITE_APP_API_BASE;

export function NotFound() {
  const [lang] = useLang();

  const { isLoading } = useQuery(
    "fetchHome",
    () => {
      return axios.get(`${serverPath}user/${user_cookies}`);
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Layout1 footer={true}>
      <section
        id="page-not-found"
        className="h-full w-full flex justify-center items-center flex-col gap-5 "
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
          <Link
            className="underline text-primary-color1 capitalize font-medium
              sm:text-sm
            md:text-base
            lg:text-lg "
            to="/"
          >
            {lang === "ar" ? "الرجوع إلى الصفحة الرئيسية" : "Go to home page"}
          </Link>
        </div>
      </section>
    </Layout1>
  );
}
