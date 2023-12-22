import React, { useContext, useState } from "react";
import mainlogo from "../assest/logo/mainLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "../App.css";
import LanguageCon from "../Context";
export const Login = () => {
  const navigate = useNavigate();
  // handle change language
  const { lang } = useContext(LanguageCon);

  // handle login submit
  const HandleSubmit = (e) => {
    e.preventDefault();
    navigate("/create-password");
  };
  return (
    <div className="section-h login bg-color1 w-full flex justify-center pt-5">
      <div className="container flex flex-col justify-between">
        <div
          className="form flex h-full justify-between items-center
        sm:flex-col md:flex-row mb-5 sm:gap-3"
        >
          <div
            className="img flex items-center
          sm:w-full  sm:justify-center sm:pt-4
          md:w-6/12 md:justify-center md:bg-inherit 
          lg:5/12 lg:justify-center  
          xl:w-6/12 xl:justify-end"
          >
            <img
              src={mainlogo}
              alt=""
              className=" sm:w-[230px] md:w-[280px] lg:w-[370px] xl:w-[400px] object-contain"
            />
          </div>
          <Form lang={lang} HandleSubmit={HandleSubmit} />
        </div>
        <div
          className="links flex items-center w-full h-fit mb-3
        sm:justify-between
        md:justify-start md:gap-10 "
        >
          <Link
            className="capitalize sm:w-4/12 md:w-fit sm:text-sm lg:text-lg text-center text-white"
            to={"/"}
          >
            {lang === "en" || lang === null ? "about " : "عن ماجنيفاي"}
          </Link>
          <Link
            className="capitalize sm:w-4/12 md:w-fit sm:text-sm lg:text-lg text-center text-white"
            to={"/"}
          >
            {lang === "en" || lang === null ? "privacy terms" : "شروط الخصوصية"}
          </Link>
          <Link
            className="capitalize sm:w-4/12 md:w-fit sm:text-sm lg:text-lg text-center text-white"
            to={"/"}
          >
            {lang === "en" || lang === null ? "contact us!" : "!تواصل معنا "}
          </Link>
        </div>
      </div>
    </div>
  );
};

const Form = ({ lang, HandleSubmit }) => {
  const [showPass, setShowPass] = useState(true);
  return (
    <form
      onSubmit={HandleSubmit}
      className="form sm:w-full md:w-6/12 xl:w-[450px] h-full bg-darkGrey flex flex-col
    items-center justify-between py-8 px-10 shadow-lg rounded-xl border-2 border-color1 "
    >
      <div
        className="flex flex-col w-full 
    items-center gap-8"
      >
        <p
          className={`${
            lang === "ar" && "text-end"
          } text-white sm:text-3xl lg:text-4xl capitalize w-full font-bold`}
        >
          {lang === "en" || lang === null ? "Sign in" : "تسجيل الدخول "}
        </p>
        <div className="inputs flex flex-col gap-5 w-full">
          <input
            autoFocus
            autoComplete="false"
            type="email"
            className={`${
              lang === "ar" ? "text-end  border-l-4" : "border-r-4 "
            } username py-2 px-3 w-full border-color1
            outline-none rounded-lg `}
            placeholder={
              lang === "en" || lang === null ? "Email" : "البريد الالكتروني"
            }
          />
          <div
            className="pass relative  
          before:content-[attr(symbole)] before:absolute before:text-xl before:text-red-500"
          >
            <input
              autoComplete="false"
              symbole="*"
              type={showPass ? "password" : "text"}
              className={`${
                lang === "ar" ? "text-end  border-l-4" : "border-r-4 "
              } username py-2 px-3 w-full border-color1
              outline-none rounded-lg `}
              placeholder={
                lang === "en" || lang === null ? "Password" : "كلمة المرور"
              }
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className={`absolute ${
                lang === "en" || lang === null ? "right-3" : "left-3"
              } top-[50%] translate-y-[-50%]`}
            >
              {showPass ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="text-white sm:text-xl lg:text-xl capitalize border-2 py-2 px-4 hover:text-darkGrey font-semibold
          rounded-xl hover:bg-white duration-150 ease-linear"
        >
          {lang === "en" || lang === null ? "sign in" : "تسجيل  "}
        </button>
        <Link className="text-gray-100 sm:text-base lg:text-lg capitalize">
          {lang === "en" || lang === null
            ? "forgot your password?"
            : "نسيت كلمة المرور؟"}
        </Link>
      </div>
      <Link className="capitalize flex text-white sm:text-base lg:text-lg">
        {lang === "en" || lang === null ? "need help?" : "تحتاج مساعدة؟"}
      </Link>
    </form>
  );
};
