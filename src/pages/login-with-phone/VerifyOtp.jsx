import React, { useMemo, useState } from "react";
import Layout2 from "../../layout2";
import verifyOtpIcon from "/assets/icon12.svg";
import { Link, useNavigate } from "react-router-dom";
import { useLang } from "../../context/LangContext";
import { SecondaryBtn } from "../../components/Btns";

export const VerifyOtp = () => {
  const navigate = useNavigate();
  const [lang] = useLang();
  // Handle text based on language
  const getText = useMemo(
    () => (enText, arText) => lang === "en" || !lang ? enText : arText,
    [lang]
  );
  const [otp, setOtp] = useState(Array(6).fill(""));

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return; // Only allow numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input if value is entered
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      // Move to the previous input on backspace
      if (index > 0 && !otp[index]) {
        document.getElementById(`otp-${index - 1}`).focus();
      }
    }
  };

  const handlePaste = (e) => {
    const data = e.clipboardData.getData("Text").slice(0, 6);
    const newOtp = [...otp];
    data.split("").forEach((char, i) => {
      if (/^[0-9]$/.test(char) && i < newOtp.length) {
        newOtp[i] = char;
      }
    });
    setOtp(newOtp);
    document.getElementById(`otp-${data.length - 1}`).focus();
  };

  return (
    <Layout2 type="reset-password">
      <section
        id="verify-otp"
        className="h-dvh flex flex-col items-center text-center justify-center
        lg:w-3/6 
        md:w-4/6 md:gap-8
        sm:w-full sm:gap-4 text-primary-color1 "
      >
        <img
          src={verifyOtpIcon}
          alt="phone-icon"
          className="sm:w-[110px] md:w-[170px] lg:w-[180] max-w-[180px]"
        />
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
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={value}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center bg-lightGreen rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color1"
            />
          ))}
        </div>
        <div className="flex-col gap-4 items-center w-full flex">
          <SecondaryBtn
            disabled={otp.includes("")}
            text={getText("Enter", "دخول")}
            action={() => navigate("assdqad")}
          />
          <p
            className="capitalize
          sm:text-xs md:text-md lg:text-base"
          >
            {getText("Didn’t receive code?", "لم تستلم الرمز؟ ")}
            <Link
              to="/phone-login"
              className="font-semibold hover:text-primary-color2 duration-200 mx-1"
            >
              {getText("Resend message", "أعد إرسال الرسالة")}
            </Link>
          </p>
        </div>
      </section>
    </Layout2>
  );
};
