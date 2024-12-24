import React, { useCallback, useMemo, useState } from "react";
import { useLang } from "../../context/LangContext";
import phoneIcon from "/assets/icon11.svg";
import { Input } from "../../components/Input";
import { SecondaryBtn } from "../../components/Btns";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../../Layout/MainLayout";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { HandleSubmit } from "../../lib/LoginReq";

export const PhoneLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authData, setAuthData] = useState({
    phone: "",
  });
  const { lang } = useLang();
  // Handle text based on language
  const getText = useMemo(
    () => (enText, arText) => lang === "en" || !lang ? enText : arText,
    [lang]
  );

  const handleChange = useCallback(
    (e) => {
      setError(null);
      const onChange = { ...authData };
      onChange.phone = e;
      setAuthData(onChange);
    },
    [authData]
  );

  // Form submission handler
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      HandleSubmit({
        setLoading,
        authData,
        setError,
        navigate,
        path: "phone-login",
      });
    },
    [authData, navigate]
  );

  return (
    <MainLayout type="phone-login">
      <section
        id="phone-login"
        className="h-full flex flex-col items-center text-center justify-center gap-5 container max-w-full
        lg:w-3/6 
        md:w-4/6 
        sm:w-full "
      >
        <img
          src={phoneIcon}
          alt="phone-icon"
          className="sm:w-[140px] md:w-[170px] lg:w-[170px] max-w-[170px]"
        />
        <h1 className="text-primary-color1 sm:text-lg md:text-xl lg:text-2xl font-semibold ">
          {getText("Log In With Phone Number", "التسجيل من خلال رقم الهاتف")}
        </h1>
        <p className="text-primary-color1 sm:text-sm md:text-md lg:text-base ">
          {getText(
            "Please enter your phone number to send you verification message",
            "الرجاء إدخال رقم هاتفك لإرسال رسالة التحقق إليك"
          )}
        </p>
        <form
          className="w-full flex flex-col items-center gap-4"
          onSubmit={handleSubmit}
        >
          {error && (
            <span
              className={`text-center text-white flex items-center gap-3 justify-center w-fit bg-red-500 py-2 px-6  rounded-lg 
            sm:text-sm
            md:text-md
            lg:text-base`}
            >
              {error}
            </span>
          )}
          <Input
            onChangeHandle={(e) => {
              handleChange(e);
            }}
            value={authData.phone}
            name="phone"
            containerStyle={`sm:!w-5/6 lg:!w-3/6 ${
              error && "!outline-red-300 !outline"
            } `}
            type="phone"
          />
          <SecondaryBtn
            text={getText("Send Code", "ارسل رمز تحقق")}
            type="submit"
            loading={loading}
            disabled={loading}
          />
          <div className="flex flex-col items-center justify-center ">
            <span
              className="text-primary-color1 font-medium capitalize
          sm:text-xs md:text-md lg:text-base"
            >
              {getText("or", "او")}
            </span>
            <p
              className="text-primary-color1 capitalize
          sm:text-xs md:text-md lg:text-base"
            >
              {getText("Sign Up With", "التسجيل عبر")}
              <Link
                to="/"
                className="underline font-semibold hover:text-primary-color1 duration-200 mx-1"
              >
                {getText("Email", "الايميل")}
              </Link>
            </p>
          </div>
        </form>
      </section>
    </MainLayout>
  );
};
