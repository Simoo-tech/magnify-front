import React, { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HandleEmailLogin } from "../../lib/LoginReq";
import { useLang } from "../../context/LangContext";
import { Loading } from "../../components/Loading";
import { PrimaryBtn } from "../../components/Btns";
import { Input } from "../../components/Input";
import { useQuery } from "react-query";
import axios from "axios";
import { NotFound } from "../../pages/NotFound";
import MainLayout from "../../Layout/MainLayout";
import * as Yup from "yup";
import { Formik, Form } from "formik";

const serverPath = import.meta.env.VITE_APP_API_BASE;

const Login = () => {
  const { lang } = useLang();
  const { email } = useParams();

  // Fetch QR login email if available

  const {
    isLoading,
    error,
    data: QREmail,
  } = useQuery(
    "emailLogin",
    () => {
      if (email) {
        return axios
          .get(`${serverPath}user/fetchUser/${email}`)
          .then((res) => res.data.email);
      }
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  if (email && isLoading) return <Loading />;
  if (email && error) return <NotFound />;

  return (
    <MainLayout type="login" logoStyle="hidden">
      <FormContainer lang={lang} QREmail={QREmail} />
    </MainLayout>
  );
};

const FormContainer = ({ lang, QREmail }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle text based on language
  const getText = useMemo(
    () => (enText, arText) => lang === "en" || !lang ? enText : arText,
    [lang]
  );
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(getText("Invalid E-mail", "بريد الكتروني غير صالح"))
      .required(getText("E-mail is required", "البريد الإلكتروني مطلوب"))
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        getText("Enter a valid e-mail", "أدخل بريد إلكتروني صالح")
      )
      .trim(),
    password: Yup.string()
      .required(getText("Password is required", "كلمة المرور مطلوبة"))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d[\]{};:=<>_+^#$@!%*?&]/,
        getText("Enter a valid password", "أدخل كلمة مرور صالحة")
      )
      .min(
        8,
        getText(
          "Password must be at least 8 characters",
          "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل"
        )
      )
      .max(
        16,
        getText(
          "Password must be 16 characters only",
          "يجب أن تتكون كلمة المرور من 16 حرفًا فقط"
        )
      ),
  });

  return (
    <section
      id="login"
      className=" bg-darkGreen flex flex-col h-fit  rounded-3xl items-center justify-center gap-5
      md:w-[400px] md:px-8
      sm:w-full sm:max-w-[85%] sm:py-7 sm:px-4"
    >
      <Formik
        initialValues={{
          email: QREmail ? QREmail : "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={(values) =>
          HandleEmailLogin({
            getText,
            setLoading,
            values,
            setError,
          })
        }
      >
        {({ errors, touched, values, handleChange }) => (
          <Form className="w-full h-full flex flex-col justify-between items-center gap-5">
            {/* Top form group */}
            <div className="w-full flex flex-col gap-3 items-center">
              <img
                loading="eager"
                src="/assets/logo/mainLogo.svg"
                alt="magnify logo"
                className="sm:w-[150px] md:w-[250px] lg:w-[250px]"
              />
              <h2
                className="capitalize w-full font-light text-lightGreen text-center
          xl:text-2xl lg:text-xl md:text-2xl sm:text-lg"
              >
                {getText("Log in", "تسجيل الدخول")}
              </h2>
              {error && (
                <span
                  className={`text-center text-white flex items-center gap-3 justify-center w-full bg-red-500 px-3 py-2 rounded-lg
          sm:text-xs
          md:text-sm`}
                >
                  {error}
                </span>
              )}
            </div>
            {/* Input fields */}
            <div className="w-full flex flex-col gap-4 ">
              <Input
                onChangeHandle={(e) => {
                  handleChange(e);
                  setError();
                }}
                value={values.email}
                errors={errors.email}
                touched={touched.email}
                name="email"
                text={getText("E-mail", "البريد الالكتروني")}
                placeholder={getText(
                  "Enter your email address...",
                  "ادخل البريد الالكتروني..."
                )}
                type="email"
              />
              <Input
                onChangeHandle={(e) => {
                  handleChange(e);
                  setError();
                }}
                value={values.password}
                name="password"
                text={getText("Password", "كلمة المرور")}
                placeholder={getText(
                  "Enter your password...",
                  "ادخل كلمة المرور..."
                )}
                errors={errors.password}
                touched={touched.password}
                type="password"
              />
              {/* Remember Me and Forgot Password */}
              <div className="flex justify-between px-2">
                <label
                  htmlFor="remember-me"
                  className="cursor-pointer text-textColor2 capitalize flex items-center gap-1 sm:text-xs md:text-sm "
                >
                  <input
                    type="checkbox"
                    id="remember-me"
                    className="appearance-none w-3 h-3 peer relative bg-lightGreen text-primary-color1"
                  />
                  {getText("Remember me", "تذكرني")}
                  <svg
                    className="stroke-primary-color1 absolute w-3 h-3 peer-checked:block hidden"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-textColor2 hover:text-primary-color4 duration-300 sm:text-xs md:text-sm  "
                >
                  {getText("Forgot password?", "نسيت كلمة المرور؟")}
                </Link>
              </div>
            </div>
            <div id="btns" className="flex flex-col items-center gap-3">
              {/* Submit Button */}
              <PrimaryBtn
                text={getText("Log in", "تسجيل")}
                loading={loading}
                type="submit"
              />
              <span
                className="text-lightGreen capitalize
        sm:text-xs md:text-md lg:text-base"
              >
                {getText("or", "او")}
              </span>
              <p
                className="text-lightGreen capitalize
        sm:text-xs md:text-md lg:text-base"
              >
                {getText("Sign Up With", "التسجيل عبر")}
                <Link
                  to="/phone-login"
                  className="underline font-semibold hover:text-primary-color1 duration-200 mx-1"
                >
                  {getText("Phone Number", "رقم الهاتف")}
                </Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Login;
