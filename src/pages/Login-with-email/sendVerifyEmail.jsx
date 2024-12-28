import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useLang } from "../../context/LangContext";
/////// layout
import MainLayout from "../../Layout/MainLayout";
/////// icons
/////// functions
import { HandleSendVerify } from "../../lib/Verify&ResetReq";
/////// components
import { Loading } from "../../components/Loading";
import { NotFound } from "../../pages/NotFound";
import { SecondaryBtn } from "../../components/Btns";
import { preload } from "react-dom";

const serverPath = import.meta.env.VITE_APP_API_BASE;

export default function SendVerifyEmail() {
  preload("/assets/icon4.svg", {
    as: "image",
  });

  const { id } = useParams();
  const { lang } = useLang();
  const [sending, setSending] = useState(false);

  const {
    isLoading,
    error,
    data: user,
  } = useQuery("fetchVerifyEmail", () =>
    axios.get(`${serverPath}user/fetchUser/${id}`).then((res) => res.data)
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <NotFound />;
  }
  const { email } = user;

  return (
    <MainLayout type={"verify-email"}>
      <section
        id="check-email"
        className=" flex flex-col items-center justify-center h-full container max-w-[1000px]
        lg:w-3/6 
        md:w-4/6 md:gap-14 
        sm:w-full sm:gap-8 "
      >
        {/* text */}
        <div id="text" className="flex flex-col items-center gap-5 w-full">
          <img
            src="/assets/icon4.svg"
            alt="check-email-icon"
            className="sm:w-[100px] md:w-[120px] lg:w-[120px] xl:w-[140px]"
          />
          <h1
            className="font-semibold text-primary-color1 truncate
              xl:text-2xl
              lg:text-xl
              sm:text-base"
          >
            {lang === "ar"
              ? "تحقق من بريدك الإلكتروني"
              : "Verify your email address"}
          </h1>
        </div>
        <div
          dir="ltr"
          className="text-primary-color1 font-normal text-center w-full
          xl:text-lg
          lg:text-base
          md:text-sm
          sm:text-xs "
        >
          <span>
            {lang === "ar"
              ? ` :بريدك الإلكتروني Magnify يرجى التأكيد على أنك تريد استخدام هذا كعنوان بريد إلكتروني لحسابك في `
              : `Please confirm that you want to use this as your magnify account email address. your email:`}
          </span>
          <span className="mx-1 font-semibold">{email}</span>
        </div>
        {/* button */}
        <div
          id="buttons"
          className={`${
            lang === "ar" && "flex-row-reverse"
          } flex w-full items-center justify-between 
            xl:flex-row xl:gap-0
            sm:flex-col sm:gap-4`}
        >
          <span
            className="text-primary-color1 truncate
            lg:text-base
            md:text-md
            sm:text-xs "
          >
            {lang === "ar"
              ? "للمتابعة انقر على إرسال رابط التحقق"
              : "To Continue Click Send Verifictaion Link"}
          </span>
          <SecondaryBtn
            type={"button"}
            style="md:min-w-[310px] md:w-fit
              sm:min-w-[250px] sm:w-full"
            action={(e) => {
              e.preventDefault();
              HandleSendVerify({
                setSending,
                email,
              });
            }}
            loading={sending}
            text={lang === "ar" ? "إرسال رمز التحقق" : "Send verification Link"}
          />
        </div>
      </section>
    </MainLayout>
  );
}
