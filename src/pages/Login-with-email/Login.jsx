import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HandleSubmit } from "../../lib/LoginReq";
import { useLang } from "../../context/LangContext";
import { Loading } from "../../components/Loading";
import { PrimaryBtn } from "../../components/Btns";
import logo from "/assets/logo/mainLogo.svg";
import { Input } from "../../components/Input";
import { useQuery } from "react-query";
import axios from "axios";
import { NotFound } from "../../pages/NotFound";
import MainLayout from "../../Layout/MainLayout";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
      <Form lang={lang} QREmail={QREmail} />
    </MainLayout>
  );
};

const Form = ({ lang, QREmail }) => {
  const navigate = useNavigate();
  const [authData, setAuthData] = useState({
    email: QREmail || "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle text based on language
  const getText = useMemo(
    () => (enText, arText) => lang === "en" || !lang ? enText : arText,
    [lang]
  );

  // Input change handler
  const handleChange = useCallback((e) => {
    setAuthData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    setError(""); // Reset error on input change
  }, []);

  // Form submission handler
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      HandleSubmit({
        setLoading,
        authData,
        setError,
        navigate,
        path: "email-login",
      });
    },
    [authData, navigate]
  );

  return (
    <form
      onSubmit={handleSubmit}
      id="login-form"
      className="w-full h-full flex flex-col items-center justify-center container max-w-full"
    >
      <div
        className="gap-6 bg-darkGreen flex flex-col rounded-3xl items-center justify-between 
        md:w-[400px] md:py-10 md:px-8 
        sm:w-full sm:max-w-[85%] sm:py-10 sm:px-4"
      >
        {/* Top form group */}
        <div className="w-full h-full flex flex-col gap-3 items-center">
          <img
            src={logo}
            alt="Company logo"
            className="sm:w-[150px] md:w-[250px] lg:w-[200px]"
          />
          <h2
            className="capitalize w-full font-light text-lightGreen text-center 
            xl:text-2xl lg:text-xl md:text-2xl sm:text-lg"
          >
            {getText("Log in", "تسجيل الدخول")}
          </h2>
          {error && (
            <span
              className={`text-center text-white flex items-center gap-3 justify-center w-full bg-red-500 p-2 rounded-lg
            sm:text-xs
            md:text-sm`}
            >
              {error}
            </span>
          )}
        </div>
        {/* Input fields */}
        <div className="w-full flex flex-col gap-5 ">
          <Input
            name="email"
            text={getText("E-mail", "البريد الالكتروني")}
            value={authData.email}
            placeholder={getText(
              "Enter your email address...",
              "ادخل البريد الالكتروني..."
            )}
            onChangeHandle={(e) =>
              setAuthData((prevData) => ({
                ...prevData,
                email: e.target.value.toLowerCase(),
              }))
            }
            type="email"
            autoFocus
            require={true}
          />
          <Input
            name="password"
            text={getText("Password", "كلمة المرور")}
            value={authData.password}
            placeholder={getText(
              "Enter your password...",
              "ادخل كلمة المرور..."
            )}
            onChangeHandle={handleChange}
            type="password"
            required
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
      </div>
    </form>
  );
};

export default Login;
