import React from "react";
import Layout1 from "../Layout1";
import image from "/assest/not-found.svg";
import { ContactUsLink } from "./contactUsLink";
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

  const { isLoading, data } = useQuery(
    "fetchHome",
    () => {
      return axios.get(`${serverPath}user/${user_cookies}`);
    },
    {
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Layout1>
      <section
        id="page-not-found"
        className="h-full w-full flex justify-between items-center flex-col "
      >
        <div className="flex flex-col justify-center items-center h-full">
          {/* image */}
          <img
            loading="lazy"
            src={image}
            className="sm:w-[150px] md:w-[200px] lg:w-[250px]"
            alt="not-found-image"
          />
          {/* text */}
          <div className="flex flex-col justify-center items-center gap-5">
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
              className="underline text-primary-color1 capitalize mt-5
              sm:text-sm 
              md:text-base "
              to={
                user_cookies
                  ? data.data.isAdmin
                    ? `/${user_cookies}/dashboard`
                    : `/${user_cookies}/tour-projects`
                  : "/"
              }
            >
              {lang === "ar" ? "الرجوع إلى الصفحة الرئيسية" : "Go to home page"}
            </Link>
          </div>
        </div>
        {/* contact us link */}
        <ContactUsLink />
      </section>
    </Layout1>
  );
}
