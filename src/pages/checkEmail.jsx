import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { useLang } from "../context/LangContext";
/////// functions
import { HandleSendReset, HandleSendVerify } from "../lib/Verify&ResetReq";
/////// components
import { Loading } from "../component/Loading";
import { NotFound } from "../component/NotFound";
import { SecondaryBtn } from "../component/Btns";
import { Line } from "../component/Line";
/////// layout
import Layout2 from "../layout2";
/////// icons
import icon1 from "/assest/icon1.svg";

const serverPath = import.meta.env.VITE_APP_API_BASE;

export default function CheckEmail() {
  const { id } = useParams();
  const [lang] = useLang();
  const [sending, setSending] = useState(false);

  const { isLoading, error, data } = useQuery(
    "fetchCheckEmail",
    () => {
      return axios.get(`${serverPath}user/verify/${id}`);
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
  if (error) {
    return <NotFound />;
  }
  const { email, verified } = data.data;

  return (
    <Layout2 type={"check-email"}>
      <section
        id="check-email"
        className="flex flex-col items-center justify-center h-full
        lg:w-3/6
        md:w-4/6 md:gap-14
        sm:w-full sm:gap-8 "
      >
        {/* text */}
        <div id="text" className="flex flex-col items-center gap-5">
          <img
            loading="eager"
            src={icon1}
            alt="check-email-icon"
            className="sm:w-[100px] md:w-[130px] lg:w-[120px] xl:w-[140px]"
          />
          <h1
            id="section-heading"
            className="font-semibold text-primary-color1
              xl:text-2xl
              md:text-xl
              sm:text-[24px]"
          >
            {lang === "ar" ? "تحقق من بريدك الإلكتروني" : "Check your email"}
          </h1>
        </div>
        <p
          className="text-primary-color1 font-normal text-center
          lg:text-[18px]
          md:text-base
          sm:text-sm"
        >
          {lang === "ar"
            ? "لقد أرسلنا لك رسالة تأكيد بالبريد الإلكتروني تفيد بأنك أنت، وسيتم تسليم الرسالة خلال 10 دقائق"
            : "We sent you a confirmation email that it is you, The message will be delivered within 10 minutes"}
        </p>
        {/* line */}
        <Line w="full" h="2px" />
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
            style="lg:text-base !py-2 truncate
              md:text-sm md:min-w-[310px] md:w-fit
              sm:text-xs sm:min-w-[250px] sm:w-full"
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
    </Layout2>
  );
}
