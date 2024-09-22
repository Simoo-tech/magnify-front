import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useLang } from "../context/LangContext";
/////// layout
import Layout2 from "../layout2";
/////// icons
import icon4 from "/assest/icon4.svg";
/////// functions
import { HandleSendVerify } from "../lib/Verify&ResetReq";
/////// components
import { Loading } from "../component/Loading";
import { NotFound } from "../component/NotFound";
import { SecondaryBtn } from "../component/Btns";

const serverPath = import.meta.env.VITE_APP_API_BASE;

export default function SendVerifyEmail() {
  const { id } = useParams();
  const [lang] = useLang();
  const [sending, setSending] = useState(false);

  const { isLoading, error, data } = useQuery("fetchVerifyEmail", () => {
    return axios.get(`${serverPath}user/${id}`);
  });

  if (isLoading) {
    return <Loading />;
  }

  const { email, verified } = data.data;

  if (error || verified) {
    return <NotFound />;
  }

  return (
    <Layout2 type={"verify-email"}>
      <section
        id="check-email"
        className="h-full flex flex-col items-center justify-between
        lg:w-3/6 
        md:w-4/6 
        sm:w-5/6"
      >
        {/*top container  */}
        <div
          className="flex w-full flex-col items-center justify-around text-center h-5/6
        lg:gap-10 xl:gap-0"
        >
          {/* text */}
          <div id="text" className="flex flex-col items-center gap-5">
            <img
              src={icon4}
              alt="check-email-icon"
              className="sm:w-[80px] md:w-[130px] lg:w-[150px] xl:w-[170px]"
            />
            <h1
              className="font-semibold text-primary-color1 truncate
              xl:text-2xl
              lg:text-xl
              md:text-xl
              sm:text-[22px]"
            >
              {lang === "ar"
                ? "تحقق من بريدك الإلكتروني"
                : "Verify your email address"}
            </h1>
          </div>
          <p
            className="text-primary-color1 font-normal 
          xl:text-[21px]
          lg:text-[18px]
          md:text-base
          sm:text-xs"
          >
            {lang === "ar"
              ? ` :بريدك الإلكتروني Magnify يرجى التأكيد على أنك تريد استخدام هذا كعنوان بريد إلكتروني لحسابك في `
              : `Please confirm that you want to use this as your magnify account email address. your email:`}
            <b className="mx-1">{email}</b>
          </p>
          {/* button */}
          <div
            id="buttons"
            className={`${
              lang === "ar" && "flex-row-reverse"
            } flex w-full items-center justify-between 
            xl:flex-row xl:gap-0
            sm:flex-col sm:gap-2`}
          >
            <span
              className="text-primary-color1 truncate
            sm:text-xs 
            md:text-base"
            >
              {lang === "ar"
                ? "للمتابعة انقر على إرسال رابط التحقق"
                : "To Continue Click Send Verifictaion Link"}
            </span>
            <SecondaryBtn
              type={"button"}
              style="lg:text-base !py-2
              md:text-sm md:min-w-[310px]
              sm:text-xs sm:min-w-[250px]"
              action={(e) => {
                e.preventDefault();
                HandleSendVerify({
                  setSending,
                  email,
                });
              }}
              loading={sending}
              text={
                lang === "ar" ? "إرسال رمز التحقق" : "Send verification Link"
              }
            />
          </div>
        </div>
      </section>
    </Layout2>
  );
}
