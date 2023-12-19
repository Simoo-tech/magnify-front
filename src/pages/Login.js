import React, { useContext, useState } from "react";
import mainlogo from "../assest/logo/mainLogo.png";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import englishuageCon from "../Context";
import "../App.css";
export const Login = () => {
  // handle change englishuage
  const { english } = useContext(englishuageCon);

  return (
    <div className="login bg-[#647d6866] w-full flex justify-center pt-5">
      <div className="container flex flex-col justify-between">
        <div
          className="form flex h-full justify-between items-center
        sm:flex-col md:flex-row mb-5"
        >
          <div
            className="img flex items-center
          sm:w-full sm:bg-[#d9b69399] sm:justify-center sm:pt-4
          md:w-6/12 md:justify-center md:bg-inherit 
          lg:5/12 lg:justify-center 
          xl:w-6/12 xl:justify-end"
          >
            <img
              src={mainlogo}
              alt=""
              className=" sm:w-[250px] md:w-[300px] lg:w-[450px] object-contain"
            />
          </div>
          <Form english={english} />
        </div>
        <div className="links flex gap-10 h-fit">
          <Link className="capitalize text-base text-white" to={"/"}>
            {english ? "about magnify" : "عن ماجنيفاي"}
          </Link>
          <Link className="capitalize text-base text-white" to={"/"}>
            {english ? "privacy terms" : "شروط الخصوصية"}
          </Link>
          <Link className="capitalize text-base text-white" to={"/"}>
            {english ? "contact us!" : "!تواصل معنا "}
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
          } text-white text-4xl capitalize w-full font-bold`}
        >
          {english ? "Sign in" : "تسجيل الدخول "}
        </p>
        <div className="inputs flex flex-col gap-5 w-full">
          <input
            autoFocus
            autoComplete="false"
            symbole="*"
            type="text"
            className={`${
              !english && "text-end"
            } username py-2 px-3 w-full border-2 focus-visible:border-black 
        outline-none rounded-lg before:content-[attr(symbole)]before:text-xl`}
            placeholder={english ? "Username" : "اسم المستخدم"}
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
                !english && "text-end"
              } password py-2 px-3 w-full border-2 focus-visible:border-black outline-none rounded-lg
            `}
              placeholder={english ? "Password" : "كلمة المرور"}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className={`absolute ${
                english ? "right-3" : "left-3"
              } top-[50%] translate-y-[-50%]`}
            >
              {showPass ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="text-white text-3xl border-2 py-2 px-4 hover:text-color1
          rounded-xl hover:bg-white"
        >
          {english ? "sign in" : "تسجيل  "}
        </button>
        <Link className="text-gray-100 text-lg capitalize">
          {english ? "forgot your password?" : "نسيت كلمة المرور؟"}
        </Link>
      </div>
      <Link className="capitalize flex text-white text-lg">
        {english ? "need help?" : "تحتاج مساعدة؟"}
      </Link>
    </form>
  );
};
