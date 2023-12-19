import React, { useContext, useState } from "react";
import mainlogo from "../assest/logo/mainLogo.png";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import englishuageCon from "../Context";
import "../App.css";
export const Login = () => {
  // handle change language
  const { english } = useContext(englishuageCon);

  return (
    <div className="login bg-[#647d6866] w-full flex justify-center pt-5">
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
          <Form english={english} />
        </div>
        <div
          className="links flex items-center w-full h-fit
        sm:justify-between
        md:justify-start md:gap-10 "
        >
          <Link
            className="capitalize sm:w-4/12 md:w-fit sm:text-sm lg:text-lg text-center text-white"
            to={"/"}
          >
            {english === "en" ? "about " : "عن ماجنيفاي"}
          </Link>
          <Link
            className="capitalize sm:w-4/12 md:w-fit sm:text-sm lg:text-lg text-center text-white"
            to={"/"}
          >
            {english === "en" ? "privacy terms" : "شروط الخصوصية"}
          </Link>
          <Link
            className="capitalize sm:w-4/12 md:w-fit sm:text-sm lg:text-lg text-center text-white"
            to={"/"}
          >
            {english === "en" ? "contact us!" : "!تواصل معنا "}
          </Link>
        </div>
      </div>
    </div>
  );
};

const Form = ({ english }) => {
  const [showPass, setShowPass] = useState(false);
  return (
    <form
      className="form sm:w-full md:w-6/12 xl:w-[450px] h-full bg-[#d9b69399] flex flex-col
    items-center justify-between py-8 px-10 shadow-lg rounded-xl border-2 border-color1 "
    >
      <div
        className="flex flex-col w-full 
    items-center gap-8"
      >
        <p
          className={`${
            !english && "text-end"
          } text-white sm:text-3xl lg:text-4xl capitalize w-full font-bold`}
        >
          {english === "en" ? "Sign in" : "تسجيل الدخول "}
        </p>
        <div className="inputs flex flex-col gap-5 w-full">
          <input
            autoFocus
            autoComplete="false"
            symbole="*"
            type="text"
            className={`${
              english === "ar" && "text-end"
            } username py-2 px-3 w-full border-2 focus-visible:border-black 
        outline-none rounded-lg before:content-[attr(symbole)]before:text-xl`}
            placeholder={english === "en" ? "Username" : "اسم المستخدم"}
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
                english === "ar" && "text-end"
              } password py-2 px-3 w-full border-2 focus-visible:border-black outline-none rounded-lg
            `}
              placeholder={english === "en" ? "Password" : "كلمة المرور"}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className={`absolute ${
                english === "en" ? "right-3" : "left-3"
              } top-[50%] translate-y-[-50%]`}
            >
              {showPass ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="text-white sm:text-xl lg:text-3xl border-2 py-2 px-4 hover:text-color1
          rounded-xl hover:bg-white"
        >
          {english === "en" ? "sign in" : "تسجيل  "}
        </button>
        <Link className="text-gray-100 sm:text-base lg:text-lg capitalize">
          {english === "en" ? "forgot your password?" : "نسيت كلمة المرور؟"}
        </Link>
      </div>
      <Link className="capitalize flex text-white sm:text-base lg:text-lg">
        {english === "en" ? "need help?" : "تحتاج مساعدة؟"}
      </Link>
    </form>
  );
};
