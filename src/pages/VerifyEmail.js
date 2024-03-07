import React, { useContext, useState } from "react";
import logo from "../assest/logo/mainLogo.png";
import { useCookies } from "react-cookie";
import { MdMarkEmailUnread } from "react-icons/md";
import PulseLoader from "react-spinners/PulseLoader";
import { LanguageCon } from "../Context";
import { HandleVerifySubmit } from "../functions/Verify&ResetReq";

export default function Verify() {
  const [cookies] = useCookies(["user_token"]);
  const user = cookies.user_token;
  const [sending, setSending] = useState(false);
  const [verified, setVerified] = useState(false);
  const { lang } = useContext(LanguageCon);

  return (
    <div className="section-h w-full flex justify-center items-center">
      {verified ? (
        <div
          className=" bg-darkGrey sm:w-11/12 xl:w-8/12 h-5/6 py-2 rounded-lg flex
        flex-col items-center gap-10 px-4 justify-center text-white "
        >
          <div
            className={`${
              lang === "ar" && "flex-row-reverse"
            } title flex gap-2 items-center`}
          >
            <MdMarkEmailUnread size={35} />
            <h2 className="sm:text-xl lg:text-3xl capitalize font-semibold">
              {lang === "ar"
                ? "تحقق من بريدك الالكتروني"
                : "  Check your email"}
            </h2>
          </div>
          <h3 className="sm:text-base lg:text-xl text-center font-light">
            {lang === "ar"
              ? "   لقد أرسلنا إليك رسالة تأكيد عبر البريد الإلكتروني تفيد بأنه أنت، ستصلك الرسالة خلال بضع دقائق"
              : "  We sent you a confirmation email that it is you, The message will be delivered within"}
            <br /> {lang === "ar" ? null : "10 minutes"}
          </h3>
          <div
            className={`${
              lang === "ar" ? "md:flex-row-reverse" : " md:flex-row"
            } flex items-center sm:gap-6 lg:gap-2 sm:flex-col`}
          >
            <span className="text-lg font-thin text-center">
              {lang === "ar"
                ? "إذا لم تتلق رسالة"
                : "If you do not receive a message"}
            </span>
            <span className="lg:w-10 lg:h-[2px] sm:hidden lg:block bg-white"></span>
            <button
              onClick={(e) => {
                e.preventDefault();
                HandleVerifySubmit({ setSending, user, setVerified });
              }}
              className="bg-white py-2 px-6 text-lg text-color1 rounded-lg capitalize font-semibold"
            >
              {sending ? (
                <div
                  className={`${
                    lang === "ar" && "flex-row-reverse"
                  } flex items-center justify-center gap-2`}
                >
                  {lang === "ar" ? "جاري الارسال" : "Sending"}
                  {<PulseLoader color="rgb(204 140 59)" size={7} />}
                </div>
              ) : lang === "ar" ? (
                "اعادة الارسال"
              ) : (
                "Resend verifictaion link"
              )}
            </button>
          </div>
        </div>
      ) : (
        <div
          className="bg-darkGrey sm:w-11/12 h-5/6 py-2 rounded-lg flex
            flex-col items-center gap-10 justify-center"
        >
          <img
            src={logo}
            alt="logo"
            className="sm:w-[180px] md:w[200px] lg:w-[220px]"
          />
          <h2 className="sm:text-xl lg:text-4xl font-light text-white ">
            {lang === "ar"
              ? "تحقق من عنوان بريدك الإلكتروني"
              : "Verify your email address"}
          </h2>
          <div className="text flex flex-col items-center gap-4 font-thin text-white">
            <p className="sm:text-sm md:text-lg lg:text-xl text-center ">
              {lang === "ar"
                ? "يرجى تأكيد رغبتك في استخدام هذا كعنوان بريد إلكتروني لحسابك المكبر"
                : "Please confirm that you want to use this as your magnify account email address"}{" "}
              <br />
              <div
                className={`flex ${
                  lang === "ar" && "flex-row-reverse"
                } gap-1 justify-center`}
              >
                {lang === "ar" ? ":بريدك الالكتروني" : "your email:"}
                <span className=" text-color2 ml-2 underline">
                  {user.email}
                </span>
              </div>
            </p>
            <span className="sm:text-sm md:text-lg lg:text-xl  text-center capitalize font-thin">
              {lang === "ar"
                ? "للمتابعة انقر فوق إرسال رابط التحقق"
                : "to continue click send verifictaion link"}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              HandleVerifySubmit({ setSending, user, setVerified });
            }}
            className="bg-white py-2 px-6 text-lg text-color1 rounded-lg capitalize font-semibold"
          >
            {sending ? (
              <div
                className={`${
                  lang === "ar" && "flex-row-reverse"
                } flex items-center justify-center gap-2`}
              >
                {lang === "ar" ? "جاري الارسال" : "Sending"}
                {<PulseLoader color="rgb(204 140 59)" size={7} />}
              </div>
            ) : lang === "ar" ? (
              "إرسال رمز التحقق"
            ) : (
              "send verifictaion code"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
