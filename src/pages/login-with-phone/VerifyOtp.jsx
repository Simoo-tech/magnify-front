import React, { useEffect, useMemo, useState } from "react";
import verifyOtpIcon from "/assets/icon12.svg";
import { useParams } from "react-router-dom";
import { useLang } from "../../context/LangContext";
import { SecondaryBtn } from "../../components/Btns";
import MainLayout from "../../Layout/MainLayout";
import { useQuery } from "react-query";
import { NotFound } from "../NotFound";
import { Loading } from "../../components/Loading";
import axios from "axios";
import { HandleResendOtp, HandleSubmitOtp } from "../../lib/LoginReq";
import { MdErrorOutline } from "react-icons/md";

const serverPath = import.meta.env.VITE_APP_API_BASE;

export const VerifyOtp = () => {
  const { lang } = useLang();
  const { id } = useParams();
  const [correctOtp, setCorrectOtp] = useState(null);
  const [errorOtp, setErrorOtp] = useState(null);
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);
  const [resloading, setResLoading] = useState(false);
  const [otpCheck, setOtpCheck] = useState(Array(6).fill(""));

  const {
    isLoading,
    error,
    data: user,
  } = useQuery("fetchVerifyEmail", () =>
    axios.get(`${serverPath}user/verify/${id}`).then((res) => res.data)
  );

  // Handle text based on language
  const getText = useMemo(
    () => (enText, arText) => lang === "en" || !lang ? enText : arText,
    [lang]
  );

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return; // Only allow numbers
    const newOtp = [...otpCheck];
    newOtp[index] = value;
    setOtpCheck(newOtp);
    // Move to the next input if value is entered
    if (value && index < otpCheck.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otpCheck];
      newOtp[index] = "";
      setOtpCheck(newOtp);
      setErrorOtp();
      // Move to the previous input on backspace
      if (index > 0 && !otpCheck[index]) {
        document.getElementById(`otp-${index - 1}`).focus();
      }
    }
  };

  const handlePaste = (e) => {
    setErrorOtp();
    const data = e.clipboardData.getData("Text").slice(0, 6);
    const newOtp = [...otpCheck];
    data.split("").forEach((char, i) => {
      if (/^[0-9]$/.test(char) && i < newOtp.length) {
        newOtp[i] = char;
      }
    });
    setOtpCheck(newOtp);
    document.getElementById(`otp-${data.length - 1}`).focus();
  };

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <NotFound />;
  }
  const { isAdmin, phone } = user;

  const otpVal = otpCheck.join("");
  const phoneNumber = phone.toString();

  return (
    <MainLayout type="verify-otp">
      <section
        id="verify-otp"
        className="h-full flex flex-col items-center text-center justify-center container max-w-full
        lg:w-3/6 
        md:w-4/6 md:gap-8
        sm:w-full sm:gap-4 text-primary-color1 "
      >
        <img
          src={verifyOtpIcon}
          alt="phone-icon"
          className="sm:w-[110px] md:w-[170px] lg:w-[180] max-w-[180px]"
        />

        {errorOtp && (
          <span
            className={`4 text-center duration-300 text-red-400 flex items-center gap-3 justify-center w-fit border-2 border-red-400 py-2 px-6 rounded-lg font-medium
            sm:text-sm
            md:text-md
            lg:text-base`}
          >
            <MdErrorOutline size={20} />

            {errorOtp}
          </span>
        )}
        <h1 className=" sm:text-base md:text-lg lg:text-2xl font-semibold ">
          {getText("Verify Your Phone Number", "التحقق من رقم هاتفك")}
        </h1>
        <p className=" sm:text-sm md:text-md lg:text-base ">
          {getText(
            " Please enter OTP code sent to your phone number",
            "الرجاء إدخال رمز OTP المرسل إلى رقم هاتفك"
          )}
        </p>
        <div id="inputs" className="flex space-x-2" onPaste={handlePaste}>
          {otpCheck.map((value, index) => (
            <input
              autoFocus={index === 0}
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={value}
              onChange={(e) => {
                setErrorOtp(null);
                handleChange(e.target.value, index);
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center bg-lightGreen rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color1"
            />
          ))}
        </div>
        <div className="flex-col gap-4 items-center w-full flex">
          <SecondaryBtn
            disabled={
              otpCheck.includes("") || errorOtp || correctOtp || loading
            }
            text={
              correctOtp
                ? getText("Verified", "تم التحقق")
                : getText("Enter", "دخول")
            }
            action={() =>
              HandleSubmitOtp({
                phoneNumber,
                otpVal,
                isAdmin,
                setCorrectOtp,
                setErrorOtp,
                setLoading,
              })
            }
            name={correctOtp && "verified"}
            loading={loading}
          />
          {resloading ? (
            <span className="flex items-center gap-3 text-sm">
              {getText("Sending please wait", "جاري الارسال برجاء الانتظار")}
              <span className="loading loading-dots" />
            </span>
          ) : (
            <p
              className="capitalize
          sm:text-xs md:text-md lg:text-base"
            >
              {getText("Didn’t receive code?", "لم تستلم الرمز؟ ")}
              <button
                onClick={() => {
                  HandleResendOtp({ phoneNumber, setResLoading });
                  setErrorOtp();
                  setOtpCheck(Array(6).fill(""));
                }}
                className="font-semibold hover:text-primary-color2 duration-200 mx-1"
              >
                {getText("Resend message", "أعد إرسال الرسالة")}
              </button>
            </p>
          )}
        </div>
      </section>
    </MainLayout>
  );
};
