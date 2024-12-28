import React, { useCallback, useMemo, useState } from "react";
import { useLang } from "../../context/LangContext";
import { Input } from "../../components/Input";
import { SecondaryBtn } from "../../components/Btns";
import { Link } from "react-router-dom";
import MainLayout from "../../Layout/MainLayout";
import { HandlePhoneLogin } from "../../lib/LoginReq";
import { preload } from "react-dom";
import { MdOutlineErrorOutline } from "react-icons/md";
import { Form, Formik } from "formik";
import * as Yup from "yup";

export const PhoneLogin = () => {
  preload("/assets/icon11.svg", {
    as: "image",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { lang } = useLang();
  // Handle text based on language
  const getText = useMemo(
    () => (enText, arText) => lang === "en" || !lang ? enText : arText,
    [lang]
  );
  const LoginSchema = Yup.object().shape({
    phone: Yup.number().required(
      getText("phone no is requied", "رقم الهاتف مطلوب")
    ),
  });
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
          src="/assets/icon11.svg"
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
        <Formik
          initialValues={{ phone: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values) =>
            HandlePhoneLogin({
              getText,
              setLoading,
              values,
              setError,
            })
          }
        >
          {({ values, setFieldValue }) => (
            <Form className="w-full flex flex-col items-center gap-4">
              <div className="flex w-full items-center gap-1 flex-col justify-center">
                {error && (
                  <div className="flex items-center rounded-xl gap-3 text-error ">
                    <MdOutlineErrorOutline size={20} />
                    <span>{error}</span>
                  </div>
                )}
                <Input
                  setFieldValue={setFieldValue}
                  value={values.phone}
                  name="phone"
                  containerStyle={`sm:!w-5/6 lg:!w-3/6 ${
                    error && "!outline-red-300 !outline"
                  } `}
                  type="phone"
                />
              </div>
              <SecondaryBtn
                text={getText("Send Code", "ارسل رمز تحقق")}
                type="submit"
                loading={loading}
                disabled={loading}
              />
              <div className="flex flex-col items-center justify-center gap-4 ">
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
            </Form>
          )}
        </Formik>
      </section>
    </MainLayout>
  );
};
