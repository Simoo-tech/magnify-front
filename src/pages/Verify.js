import React, { useContext, useState } from "react";
import logo from "../assest/logo/mainLogo.png";
import { useCookies } from "react-cookie";
import axios from "axios";
import { MdMarkEmailUnread, MdErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { LanguageCon } from "../Context";

export const Verify = () => {
  const [cookies] = useCookies(["user_token"]);
  const user = cookies.user_token;
  const [sending, setSending] = useState(false);
  const [verified, setVerified] = useState(false);
  const { lang } = useContext(LanguageCon);
  // handle submit
  const HandleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}user/verify-email
      `,
        {
          email: user.email,
        }
      )
      .then((res) => {
        setVerified(true);
        window.localStorage.setItem("verify-email", res.data.PassToken);
      })
      .catch((err) => console.log(err))
      .finally(() => setSending(false));
  };
  return (
    <div className="section-h bg-color1 flex justify-center items-center">
      {verified ? (
        <div
          className="container bg-darkGrey sm:9/12 xl:w-8/12 h-5/6 py-2 rounded-lg flex
        flex-col items-center gap-10  justify-center text-white "
        >
          <div
            className={`${
              lang === "ar" && "flex-row-reverse"
            } title flex gap-2 items-center`}
          >
            <MdMarkEmailUnread size={35} />
            <h2 className="text-3xl capitalize font-semibold">
              {lang === "ar"
                ? "تحقق من بريدك الالكتروني"
                : "  Check your email"}
            </h2>
          </div>
          <h3 className="text-xl text-center font-light">
            {lang === "ar"
              ? "لقد أرسلنا إليك رسالة تأكيد عبر البريد الإلكتروني تفيد بأنه أنت، وستكون الرسال ستصلك الرسالة خلال"
              : "  We sent you a confirmation email that it is you, The message will be delivered within"}{" "}
            <br /> {lang === "ar" ? "بضع دقائق" : "10 minutes"}
          </h3>
          <div
            className={`${
              lang === "ar" && "flex-row-reverse"
            } flex items-center gap-2`}
          >
            <span className="text-lg font-thin">
              {lang === "ar"
                ? "إذا لم تتلق رسالة"
                : "If you do not receive a message"}
            </span>
            <span className="w-10 h-[2px] bg-white"></span>
            <button
              onClick={HandleSubmit}
              className="bg-white py-2 px-6 text-lg text-color1 rounded-lg capitalize font-semibold"
            >
              {sending ? (
                <div
                  className={`${
                    lang === "ar" && "flex-row-reverse"
                  } flex items-center justify-center gap-2`}
                >
                  {lang === "ar" ? "جاري الارسال" : "Sending"}
                  {<PulseLoader color="rgb(204 140 59)" size={7} />}
                </div>
              ) : lang === "ar" ? (
                "اعادة الارسال"
              ) : (
                "Resend verifictaion link"
              )}
            </button>
          </div>
        </div>
      ) : (
        <div
          className="container bg-darkGrey sm:9/12 xl:w-8/12 h-5/6 py-2 rounded-lg  flex
      flex-col items-center gap-5 justify-evenly text-white "
        >
          <img src={logo} alt="logo" className="w-[220px]" />
          <h2 className="lg:text-4xl font-light ">
            {lang === "ar"
              ? "تحقق من عنوان بريدك الإلكتروني"
              : "Verify your email address"}
          </h2>
          <div className="text flex flex-col items-center gap-4 font-thin">
            <p className="lg:text-xl text-center ">
              {lang === "ar"
                ? "يرجى تأكيد رغبتك في استخدام هذا كعنوان بريد إلكتروني لحسابك المكبر"
                : "Please confirm that you want to use this as your magnify account email address"}{" "}
              <br />
              <div
                className={`flex ${
                  lang === "ar" && "flex-row-reverse"
                } gap-1 justify-center`}
              >
                {lang === "ar" ? ":بريدك الالكتروني" : "your email:"}
                <span className=" text-color2 ml-2 underline">
                  {user.email}
                </span>
              </div>
            </p>
            <span className="lg:text-xl text-center capitalize font-thin">
              {lang === "ar"
                ? "للمتابعة انقر فوق إرسال رابط التحقق"
                : "to continue click send verifictaion link"}
            </span>
          </div>
          <button
            onClick={HandleSubmit}
            className="bg-white py-2 px-6 text-lg text-color1 rounded-lg capitalize font-semibold"
          >
            {sending ? (
              <div
                className={`${
                  lang === "ar" && "flex-row-reverse"
                } flex items-center justify-center gap-2`}
              >
                {lang === "ar" ? "جاري الارسال" : "Sending"}
                {<PulseLoader color="rgb(204 140 59)" size={7} />}
              </div>
            ) : lang === "ar" ? (
              "إرسال رمز التحقق"
            ) : (
              "send verifictaion code"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export const ResetPass = () => {
  const [sending, setSending] = useState(false);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();
  const [err, setErr] = useState(null);
  const [email, setEmail] = useState("");
  const { lang } = useContext(LanguageCon);
  // handle submit
  const HandleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}user/reset-password
      `,
        { email }
      )
      .then((res) => {
        setVerified(true);
        window.localStorage.setItem("resetToken", res.data.PassToken);
        window.localStorage.setItem("resetUserID", res.data.userID);
      })
      .catch((err) => setErr(err.response.data.message))
      .finally(() => setSending(false));
  };

  return (
    <div className="section-h bg-color1 flex justify-center items-center">
      {verified ? (
        <div
          className="container bg-darkGrey sm:9/12 xl:w-8/12 h-5/6 py-2 rounded-lg flex
        flex-col items-center gap-5  justify-center text-white "
        >
          <div
            className={`${
              lang === "ar" && "flex-row-reverse"
            } title flex gap-2 items-center`}
          >
            <MdMarkEmailUnread size={35} />
            <h2 className="text-3xl capitalize font-semibold">
              {lang === "ar"
                ? "تحقق من بريدك الالكتروني"
                : "  Check your email"}
            </h2>
          </div>
          <p className="text-lg">
            {lang === "ar"
              ? "لقد ارسلنا إليك رابط التحقق للمتابعة، انقر على الرابط لتفعيل حسابك"
              : "  we send to you a verification link to continue click at the link to activate your account"}
          </p>
          <button
            onClick={HandleSubmit}
            className="bg-white py-2 px-6 text-lg text-color1 rounded-lg capitalize font-semibold"
          >
            {sending ? (
              <div
                className={`${
                  lang === "ar" && "flex-row-reverse"
                } flex items-center justify-center gap-2`}
              >
                {lang === "ar" ? "جاري الارسال" : "Sending"}
                {<PulseLoader color="rgb(204 140 59)" size={7} />}
              </div>
            ) : lang === "ar" ? (
              "اعادة الارسال"
            ) : (
              "Resend verifictaion link"
            )}
          </button>
        </div>
      ) : (
        <div
          className="container bg-darkGrey sm:w-9/12 h-5/6 py-2 rounded-lg  flex
      flex-col items-center gap-10 justify-center"
        >
          <img src={logo} alt="logo" className="w-[220px]" />
          <h2 className="lg:text-3xl font-light capitalize text-center text-white ">
            {lang === "ar"
              ? "أدخل عنوان بريدك الإلكتروني لإعادة تعيين كلمة المرور الخاصة بك"
              : `Enter your email address to reset your password`}
          </h2>
          <div className="text flex flex-col items-center gap-2 w-5/12 ">
            {err && (
              <span
                className="text-white bg-red-500 py-2 flex items-center justify-center gap-2
              rounded-lg text-center w-full "
              >
                <MdErrorOutline size={20} /> {err}
              </span>
            )}
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErr(null);
              }}
              required
              autoFocus
              type="email"
              placeholder={
                lang === "ar" ? "ادخل بريدك الالكتروني" : "Enter your email"
              }
              className={`${
                lang === "ar" && "text-right"
              } w-full p-3 outline-none rounded-lg`}
            />
          </div>
          <div id="btns" className="flex flex-col gap-3 w-5/12">
            <button
              type="submit"
              onClick={HandleSubmit}
              className="bg-white py-2 px-6 text-lg text-color1 rounded-lg capitalize font-semibold"
            >
              {sending ? (
                <div
                  className={`${
                    lang === "ar" && "flex-row-reverse"
                  } flex items-center justify-center gap-2`}
                >
                  {lang === "ar" ? "جاري الارسال" : "Sending"}
                  {<PulseLoader color="rgb(204 140 59)" size={7} />}
                </div>
              ) : lang === "ar" ? (
                "إرسال رابط التحقق"
              ) : (
                "send verifictaion link"
              )}
            </button>
            <button
              onClick={() => navigate(-1)}
              className=" text-lg text-white rounded-lg capitalize font-semibold"
            >
              {lang === "ar" ? "الغاء" : "  cancel"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
