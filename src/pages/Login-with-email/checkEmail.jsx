import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { useLang } from "../../context/LangContext";
/////// functions
import { HandleSendReset, HandleSendVerify } from "../../lib/Verify&ResetReq";
/////// components
import { Loading } from "../../components/Loading";
import { NotFound } from "../../pages/NotFound";
import { SecondaryBtn } from "../../components/Btns";
import { Line } from "../../components/Line";
/////// layout
import MainLayout from "../../Layout/MainLayout";
/////// icons
import icon1 from "/assets/icon1.svg";

const serverPath = import.meta.env.VITE_APP_API_BASE;

export default function CheckEmail() {
  const { id } = useParams();
  const { lang } = useLang();
  const [sending, setSending] = useState(false);

  const {
    isLoading,
    error,
    data: user,
  } = useQuery(
    "fetchCheckEmail",
    () => axios.get(`${serverPath}user/verify/${id}`).then((res) => res.data),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <NotFound />;
  }
  const { email, verified } = user;

  return (
    <MainLayout type={"check-email"}>
      <section
        id="check-email"
        className="flex flex-col items-center justify-center h-full container max-w-full
        lg:w-6/12
        md:w-4/6 md:gap-14
        sm:w-11/12 sm:gap-8 "
      >
        {/* text */}
        <div id="text" className="flex flex-col items-center gap-10">
          <img
            src={icon1}
            alt="check-email-icon"
            className="sm:w-[100px] md:w-[130px] lg:w-[120px] xl:w-[140px]"
          />
          <h1
            id="section-heading"
            className="font-semibold text-primary-color1
              xl:text-2xl
              md:text-xl
              sm:text-lg"
          >
            {lang === "ar" ? "تحقق من بريدك الإلكتروني" : "Check your email"}
          </h1>
        </div>
        <p
          className="text-primary-color1 font-normal text-center
          lg:text-base
          md:text-sm
          sm:text-xs"
        >
          {lang === "ar"
            ? "لقد أرسلنا لك رسالة تأكيد بالبريد الإلكتروني تفيد بأنك أنت، وسيتم تسليم الرسالة خلال 10 دقائق"
            : "We sent you a confirmation email that it is you, The message will be delivered within 10 minutes"}
        </p>
        {/* line */}
        <Line w="100%" h="2px" />
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
            className="text-base text-primary-color1 truncate
            sm:text-xs 
            md:text-base"
          >
            {lang === "ar"
              ? "إذا لم تتلق رسالة"
              : "If you do not receive a message"}
          </span>
          <SecondaryBtn
            type={"button"}
            action={
              !verified
                ? (e) => {
                    e.preventDefault();
                    HandleSendVerify({
                      setSending,
                      email,
                    });
                  }
                : (e) => {
                    e.preventDefault();
                    HandleSendReset({
                      setSending,
                      email,
                    });
                  }
            }
            loading={sending}
            text={lang === "ar" ? "اعداة الارسال" : "Resend Verifictaion Link"}
          />
        </div>
      </section>
    </MainLayout>
  );
}
