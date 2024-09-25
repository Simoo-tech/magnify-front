import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
// components
import { HandleSubmit, UserLoged } from "../lib/LoginReq";
import { useLang } from "../context/LangContext";
import { Loading } from "../component/Loading";
// icons
import { MdErrorOutline } from "react-icons/md";
import { PrimaryBtn } from "../component/Btns";
import Layout1 from "../Layout1";
// assest
import logo from "/assest/logo/mainLogo.svg";
import { Input } from "../component/Input";
import { useQuery } from "react-query";
import axios from "axios";
import { NotFound } from "../component/NotFound";
import cookie from "react-cookies";

const serverPath = import.meta.env.VITE_APP_API_BASE;

export default function Login() {
  // login user with qr code
  const url = window.location.href.split("/");
  const id = url[3];
  const [QREmail, setQREmail] = useState(null);
  const user_cookies = cookie.load("user_token");
  const [lang] = useLang();
  const links = [
    {
      id: "about-us",
      url: "https://magnify-vt.com/",
      text: lang === "en" || lang === null ? "About magnify " : "  عن magnify",
    },
    {
      id: "privacy terms",
      url: "https://magnify-vt.com/privacy-policy/",
      text: lang === "en" || lang === null ? "Privacy Terms" : "شروط الخصوصية",
    },
    {
      id: "contact us",
      url: "https://magnify-vt.com/contact/",
      text: lang === "en" || lang === null ? "Contact Us" : "تواصل معنا !",
    },
  ];
  if (user_cookies) {
    const { isLoading, data } = useQuery(
      "checkUserLoged",
      () => {
        return axios.get(`${serverPath}user/${user_cookies}`);
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
    if (data.data.isAdmin) {
      return <Navigate to={`/${user_cookies}/dashboard`} replace />;
    } else {
      return <Navigate to={`/${user_cookies}/tour-projects`} replace />;
    }
  }
  // fetch data for email login
  if (id) {
    const { isLoading, error } = useQuery(
      "emailLogin",
      () => {
        return axios.get(`${serverPath}user/${id}`);
      },
      { onSuccess: (res) => setQREmail(res.data.email) }
    );
    if (isLoading) {
      return <Loading />;
    }
    if (error) {
      return <NotFound />;
    }
  }

  return (
    <Layout1 logoStyle="hidden">
      <section
        id="login-page"
        className="flex flex-col items-center justify-between w-full h-full gap-6 
      sm:mt-5 lg:mt-0"
      >
        {/* login form */}
        <Form lang={lang} QREmail={QREmail} />
        {/* bottom links */}
        <div
          id="buttom-links"
          className="links flex w-full justify-between"
          dir={lang === "ar" && "rtl"}
        >
          {/* links */}
          {links.map((link, i) => (
            <Link
              key={i}
              id={link.id}
              className="text-center truncate text-primary-color1 font-semibold
            lg:text-base
            md:text-sm
            sm:text-xs"
              to={link.url}
            >
              {link.text}
            </Link>
          ))}
        </div>
      </section>
    </Layout1>
  );
}

const Form = ({ lang, QREmail }) => {
  const navigate = useNavigate();

  // login by QR
  const [authData, setAuthData] = useState(
    QREmail ? { email: QREmail, password: "" } : { email: "", password: "" }
  );
  // error msg
  const [error, setError] = useState();
  // loading spinner
  const [loading, setLoading] = useState(false);

  // handle change
  const HandleChange = (e) => {
    if (QREmail) {
      setAuthData({
        ...authData,
        email: `${QREmail}`,
        password: e.target.value,
      });
    } else {
      setAuthData({ ...authData, [e.target.name]: e.target.value });
    }
    setError(null);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        HandleSubmit({ setLoading, authData, setError, navigate });
      }}
      id="login-form"
      className="w-full h-full flex flex-col items-center justify-center"
    >
      <div
        className="w-full h-full bg-darkGreen flex flex-col rounded-3xl items-center justify-between 
        xl:w-[420px]
        lg:w-[400px] lg:py-14 lg:max-h-[600px]
        md:w-[500px] md:max-w-full md:max-h-[700px] md:py-10 md:px-8
        sm:w-[90%] sm:max-w-[460px] sm:py-10 sm:px-4 sm:max-h-[650px]"
      >
        {/* top-form */}
        <div className="w-full flex flex-col gap-5 items-center">
          <img
            loading="eager"
            src={logo}
            alt="magnify-logo"
            className="sm:w-[180px] md:w-[330px] lg:w-[230px]"
          />
          <div className="w-full flex flex-col items-center gap-3">
            <h2
              className="capitalize w-full font-light text-lightGreen text-center
          lg:text-xl
          md:text-2xl
          sm:text-lg "
            >
              {lang === "en" || lang === null ? "log in" : "تسجيل الدخول "}
            </h2>
            {/* error messaage */}
            {error && (
              <span
                className="text-center text-white flex items-center gap-3 justify-center w-full
              bg-red-500 
              py-2 rounded-lg text-xs "
              >
                <MdErrorOutline size={18} />
                {error}
              </span>
            )}
          </div>
        </div>
        {/* inputs container */}
        <div className="w-full flex flex-col sm:gap-6 md:gap-10 lg:gap-6">
          {/* email input */}
          <Input
            labelStlye="sm:!text-[17px] md:!text-[20px] lg:!text-base"
            inputStyle="sm:!text-xs md:!text-auto"
            name={"email"}
            text={lang === "ar" ? "البريد الالكتروني" : "E-mail"}
            value={authData.email}
            placeholder={
              lang === "en" || lang === null
                ? "Enter your email address......"
                : "ادخل البريد الالكتروني......"
            }
            onChangeHandle={(e) => {
              const email = e.target.value.toLocaleLowerCase();
              setAuthData({ ...authData, email });
              setError(null);
            }}
            type={"email"}
            autoFocus={true}
          />
          <div className="flex flex-col gap-2">
            {/* password input */}
            <Input
              labelStlye="sm:!text-[17px] md:!text-[20px] lg:!text-base"
              inputStyle="sm:!text-xs md:!text-auto"
              name={"password"}
              text={lang === "ar" ? "كلمة المرور" : "Password"}
              value={authData.password}
              placeholder={
                lang === "en" || lang === null
                  ? "Enter your password......"
                  : "ادخل كلمة المرور......"
              }
              onChangeHandle={HandleChange}
              type={"password"}
              required={true}
              minLen={8}
              maxLen={16}
            />
            <div
              className={`${
                lang === "ar" && "flex-row-reverse"
              } flex justify-between px-2`}
            >
              {/* remember me */}
              <label
                htmlFor="remember-me"
                id="remember"
                className="cursor-pointer text-textColor2 capitalize flex items-center gap-1
              sm:text-[12px]
              md:text-sm
              lg:text-xs "
              >
                <input
                  type="checkbox"
                  name="remember"
                  className="appearance-none w-3 h-3 peer relative checked:border-0 bg-lightGreen text-primary-color1"
                  id="remember-me"
                />
                {lang === "en" || lang === null ? "Remember me" : "تذكرني"}
                <svg
                  className="stroke-primary-color1 absolute w-3 h-3 peer-checked:block hidden "
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </label>
              {/* forgot pass */}
              <Link
                to={"/forgot-password"}
                id="forgot-password"
                className=" underline text-textColor2 
              sm:text-[12px]
              md:text-sm
              lg:text-xs  "
              >
                {lang === "en" || lang === null
                  ? "forgot password?"
                  : "نسيت كلمة المرور؟"}
              </Link>
            </div>
          </div>
        </div>
        {/* sign in btn */}
        <PrimaryBtn
          text={lang === "en" || lang === null ? "log in" : "تسجيل  "}
          loading={loading}
          style="sm:!text-sm md:!text-lg lg:!text-base sm:!py-2 "
          type={"submit"}
        />
      </div>
    </form>
  );
};
