import React, { useCallback, useMemo, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { HandleSubmit } from "../lib/LoginReq";
import { useLang } from "../context/LangContext";
import { Loading } from "../components/Loading";
import { MdErrorOutline } from "react-icons/md";
import { PrimaryBtn } from "../components/Btns";
import Layout1 from "../Layout1";
import logo from "/assets/logo/mainLogo.svg";
import { Input } from "../components/Input";
import { useQuery } from "react-query";
import axios from "axios";
import { NotFound } from "../components/NotFound";
import cookie from "react-cookies";

const serverPath = import.meta.env.VITE_APP_API_BASE;

const Login = () => {
  const [lang] = useLang();
  const [QREmail, setQREmail] = useState(null);
  const userCookies = cookie.load("user_token");
  const userEmail = window.location.href.split("/")[3];

  // Check if the user is already logged in
  if (userCookies) {
    const { isLoading, data } = useQuery(
      "checkUserLogged",
      () => axios.get(`${serverPath}user/${userCookies}`),
      {
        refetchOnMount: false,
        retry: false,
        staleTime: 1000 * 60 * 60 * 24, // Cache for 24 hours
      }
    );

    if (isLoading) return <Loading />;

    if (data?.data?.isAdmin) {
      return <Navigate to={`/${userCookies}/dashboard`} replace />;
    } else {
      return <Navigate to={`/${userCookies}/tour-projects`} replace />;
    }
  }

  // Fetch QR login email if available
  if (userEmail) {
    const { isLoading, error } = useQuery(
      "emailLogin",
      () => axios.get(`${serverPath}user/${userEmail}`),
      {
        onSuccess: (res) => setQREmail(res?.data?.email),
      }
    );

    if (isLoading) return <Loading />;
    if (error) return <NotFound />;
  }

  return (
    <Layout1 logoStyle="hidden">
      <Form lang={lang} QREmail={QREmail} />
      <FooterLinks lang={lang} />
    </Layout1>
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
      HandleSubmit({ setLoading, authData, setError, navigate });
    },
    [authData, navigate]
  );

  return (
    <form
      onSubmit={handleSubmit}
      id="login-form"
      className="w-full row-span-11 flex flex-col items-center justify-center"
    >
      <div
        className="gap-8 bg-darkGreen flex flex-col rounded-3xl items-center justify-between 
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
          <span
            className={`${
              error ? "visible" : "invisible"
            } text-center text-white flex items-center gap-3 justify-center w-full bg-red-500 py-2 rounded-lg
            sm:text-xs
            md:text-sm`}
          >
            <MdErrorOutline size={18} />
            {error}
          </span>
        </div>
        {/* Input fields */}
        <div className="w-full flex flex-col sm:gap-6 md:gap-7 ">
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
        {/* Submit Button */}
        <PrimaryBtn
          text={getText("Log in", "تسجيل")}
          loading={loading}
          type="submit"
        />
      </div>
    </form>
  );
};

const FooterLinks = ({ lang }) => {
  const getText = (enText, arText) =>
    lang === "en" || !lang ? enText : arText;

  const links = [
    {
      id: "about-us",
      url: "https://magnify-vt.com/",
      text: getText("About Magnify", "عن Magnify"),
    },
    {
      id: "privacy-terms",
      url: "https://magnify-vt.com/privacy-policy/",
      text: getText("Privacy Terms", "شروط الخصوصية"),
    },
    {
      id: "contact-us",
      url: "https://magnify-vt.com/contact/",
      text: getText("Contact Us", "تواصل معنا"),
    },
  ];

  return (
    <footer
      id="bottom-links"
      className="footer flex flex-row justify-between w-full bg-transparent gap-2 "
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {links.map((link) => (
        <Link
          key={link.id}
          id={link.id}
          to={link.url}
          className="text-center text-primary-color2 font-semibold w-fit lg:text-base md:text-sm sm:text-[12px]
    hover:text-primary-color1 "
        >
          {link.text}
        </Link>
      ))}
    </footer>
  );
};

export default Login;
