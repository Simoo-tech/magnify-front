import React, { useContext, useEffect, useState } from "react";
import mainlogo from "../assest/logo/mainLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { MdLockOutline, MdErrorOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { LanguageCon } from "../Context";
import { useCookies } from "react-cookie";
import { Oval } from "react-loader-spinner";
import { EmailLogin, HandleSubmit, UserLoged } from "../functions/LoginReq";

export default function Login() {
  const userID = window.localStorage.getItem("userID");
  const navigate = useNavigate();
  // login user with qr code
  const url = window.location.href.split("/");
  const id = url[3];
  const [QREmail, setQREmail] = useState(null);

  // handle change language
  const { lang } = useContext(LanguageCon);

  // user cookies
  const [cookies, setCookies] = useCookies(["user_token"]);
  useEffect(
    () => UserLoged({ navigate, userID, cookies }),
    [navigate, userID, cookies]
  );

  useEffect(() => {
    if (id) {
      EmailLogin({ setQREmail, id });
    }
  }, [id]);

  return (
    <section
      id="login-page"
      className="section-h container login max-w-[97%] flex flex-col justify-between"
    >
      {/* login center body */}
      <div
        className="form-background-image flex sm:h-5/6 lg:h-full justify-between items-center
        sm:flex-col md:flex-row sm:gap-3"
      >
        <div
          id="img-container"
          className="img flex items-center
          sm:w-full sm:justify-center sm:pt-4
          md:w-6/12 md:justify-center md:bg-inherit 
          lg:5/12 lg:justify-center  
          xl:w-6/12 xl:justify-end"
        >
          <img
            src={mainlogo}
            alt="magnify-main-logo"
            className=" sm:w-[230px] md:w-[280px] lg:w-[370px] xl:w-[400px] object-contain"
          />
        </div>
        <Form lang={lang} setCookies={setCookies} QREmail={QREmail} />
      </div>
      {/* bottom links */}
      <div
        id="buttom-links"
        className="links flex items-center w-full h-fit mb-3
        sm:justify-between
        md:justify-start md:gap-10 "
      >
        <Link
          id="about-us"
          className="capitalize sm:w-4/12 md:w-fit sm:text-sm lg:text-lg text-center text-white font-semibold"
          to={"/"}
        >
          {lang === "en" || lang === null ? "about Magnify " : " Magnify عن "}
        </Link>
        <Link
          id="privacy terms"
          className="capitalize sm:w-4/12 md:w-fit sm:text-sm lg:text-lg text-center text-white font-semibold"
          to={"/"}
        >
          {lang === "en" || lang === null ? "privacy terms" : "شروط الخصوصية"}
        </Link>
        <Link
          id="contact us"
          className="capitalize sm:w-4/12 md:w-fit sm:text-sm lg:text-lg text-center text-white font-semibold"
          to={"/"}
        >
          {lang === "en" || lang === null ? "contact us" : "!تواصل معنا "}
        </Link>
      </div>
    </section>
  );
}

const Form = ({ lang, setCookies, QREmail }) => {
  const navigate = useNavigate();
  // login by QR
  const [authData, setAuthData] = useState(QREmail ? { email: QREmail } : {});

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
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        HandleSubmit({ setLoading, authData, setCookies, setError, navigate });
      }}
      className="form sm:w-full md:w-6/12 xl:w-[500px] sm:h-full bg-darkGrey flex flex-col m-0
        items-center justify-between py-8 px-10 shadow-2xl rounded-2xl border-2 border-color1 "
    >
      <div
        className="form-container flex flex-col w-full 
        items-center sm:gap-6 lg:gap-8"
      >
        <h2
          className={`${
            lang === "ar" && "text-end"
          } text-white sm:text-3xl lg:text-4xl capitalize w-full font-bold`}
        >
          {lang === "en" || lang === null ? "Sign in" : "تسجيل الدخول "}
        </h2>
        {/* inputs container */}
        <div className="inputs-group flex flex-col gap-4 w-full">
          {/* error messaage */}
          {error && (
            <span
              className="text-center text-white flex items-center gap-3 justify-center bg-red-500 
              py-2 rounded-lg sm:text-sm lg:text-base "
            >
              <MdErrorOutline size={20} />
              {error}
            </span>
          )}
          {/* email input */}
          <div
            className={`input-group-email relative flex flex-wrap items-center border-color1 border-b-2 
            gap-2 py-2 ${lang === "ar" && "flex-row-reverse "}`}
          >
            <label
              htmlFor="email"
              className={` ${
                lang === "ar" && "text-end"
              } capitalize text-white w-full text-lg font-semibold`}
            >
              {lang === "ar" ? "البريد الالكتروني" : "email"}
            </label>
            <FaRegUser className="text-color1" />
            <input
              name="email"
              onChange={(e) => {
                const email = e.target.value.toLocaleLowerCase();
                setAuthData({ ...authData, email });
              }}
              value={QREmail ? QREmail : authData.email}
              required
              id="email"
              autoFocus
              type="email"
              className={`bg-transparent text-white placeholder:text-white placeholder:text-sm
              outline-none sm:w-[90%] lg:w-[93%] relative  ${
                lang === "ar" && "text-end"
              }`}
              placeholder={
                lang === "en" || lang === null
                  ? "Type your email"
                  : "ادخل البريد الالكتروني"
              }
            />
          </div>
          {/* password input */}
          <div
            id="input-group-password "
            className={`input-group-email relative flex flex-wrap items-center border-color1 border-b-2 
            gap-2 py-2 ${lang === "ar" && "flex-row-reverse "}`}
          >
            <label
              htmlFor="password"
              className={`${
                lang === "ar" && "text-end"
              } capitalize text-white w-full text-lg font-semibold`}
            >
              {lang === "ar" ? "كلمة المرور" : "password"}
            </label>
            <MdLockOutline className="text-color1" />
            <input
              required
              minLength={8}
              maxLength={16}
              onChange={HandleChange}
              name="password"
              id="password"
              value={authData.password}
              type={"password"}
              className={`bg-transparent text-white placeholder:text-white placeholder:text-sm
              outline-none sm:w-[90%] lg:w-[93%] relative ${
                lang === "ar" && "text-end"
              }`}
              placeholder={
                lang === "en" || lang === null
                  ? "Type your password"
                  : "ادخل كلمة المرور"
              }
            />
          </div>
        </div>
        {/* sign in btn */}
        <button
          id="sign-in"
          type="submit"
          className="text-white sm:text-lg lg:text-xl capitalize border-2 py-2 px-6 hover:text-darkGrey font-semibold
          rounded-xl hover:bg-white duration-150 ease-linear w-[150px] flex justify-center"
        >
          {loading ? (
            <Oval width={50} height={"28px"} color="white" />
          ) : lang === "en" || lang === null ? (
            "sign in"
          ) : (
            "تسجيل  "
          )}
        </button>
        {/* forgot pass */}
        <Link
          to={"/reset-password"}
          id="forgot-password"
          className="text-gray-100 sm:text-base sm:my-5 md:m-0 lg:text-lg capitalize "
        >
          {lang === "en" || lang === null
            ? "forgot your password?"
            : "نسيت كلمة المرور؟"}
        </Link>
      </div>
      {/* need help */}
      <Link
        id="need-help"
        className="capitalize flex text-white sm:text-base lg:text-lg"
      >
        {lang === "en" || lang === null ? "need help?" : "تحتاج مساعدة؟"}
      </Link>
    </form>
  );
};
