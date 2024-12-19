import React, { useCallback, useMemo, useState } from "react";
import { useLang } from "../../context/LangContext";
import Layout2 from "../../layout2";
import phoneIcon from "/assets/icon11.svg";
import { Input } from "../../components/Input";
import { SecondaryBtn } from "../../components/Btns";
import { useNavigate } from "react-router-dom";

export const PhoneLogin = () => {
  const navigate = useNavigate();
  const [lang] = useLang();
  // Handle text based on language
  const getText = useMemo(
    () => (enText, arText) => lang === "en" || !lang ? enText : arText,
    [lang]
  );
  const [number, setNumber] = useState("");
  const handleChange = useCallback(
    (e) => {
      setNumber(e.value);
    },
    [setNumber]
  );
  return (
    <Layout2 type="verify-email">
      <section
        id="phone-login"
        className="h-dvh flex flex-col items-center text-center justify-center
        lg:w-3/6 
        md:w-4/6 md:gap-7 
        sm:w-full sm:gap-4"
      >
        <img
          src={phoneIcon}
          alt="phone-icon"
          className="sm:w-[110px] md:w-[170px] lg:w-[180] max-w-[180px]"
        />
        <h1 className="text-primary-color1 sm:text-base md:text-lg lg:text-2xl font-semibold ">
          {getText("Log In With Phone Number", "التسجيل من خلال رقم الهاتف")}
        </h1>
        <p className="text-primary-color1 sm:text-sm md:text-md lg:text-base ">
          {getText(
            "Please enter your phone number to send you verification message",
            "الرجاء إدخال رقم هاتفك لإرسال رسالة التحقق إليك"
          )}
        </p>
        <Input
          onChangeHandle={(e) => handleChange(e)}
          value={number}
          containerStyle="sm:!w-5/6 lg:!w-3/6"
          type="phone"
        />
        <SecondaryBtn
          text={getText("Send Code", "ارسل رمز تحقق")}
          action={() => navigate("assdqad")}
        />
      </section>
    </Layout2>
  );
};
