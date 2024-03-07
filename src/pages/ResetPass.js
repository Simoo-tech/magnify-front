import PulseLoader from "react-spinners/PulseLoader";
import { HandleResetSubmit } from "../functions/Verify&ResetReq";
import { MdErrorOutline, MdMarkEmailUnread } from "react-icons/md";
import logo from "../assest/logo/mainLogo.png";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageCon } from "../Context";

export default function ResetPass() {
  const [sending, setSending] = useState(false);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();
  const [err, setErr] = useState(null);
  const [email, setEmail] = useState("");
  const { lang } = useContext(LanguageCon);

  return (
    <div className="section-h w-full flex justify-center items-center">
      {verified ? (
        <div
          className=" bg-darkGrey sm:w-11/12 xl:w-8/12 h-5/6 py-2 rounded-lg flex
  flex-col items-center gap-10 px-4 justify-center text-white "
        >
          <div
            className={`${
              lang === "ar" && "flex-row-reverse"
            } title flex gap-2 items-center`}
          >
            <MdMarkEmailUnread size={35} />
            <h2 className="sm:text-xl lg:text-3xl capitalize font-semibold">
              {lang === "ar"
                ? "تحقق من بريدك الالكتروني"
                : "  Check your email"}
            </h2>
          </div>
          <h3 className="sm:text-base lg:text-xl text-center font-light">
            {lang === "ar"
              ? "   لقد أرسلنا إليك رسالة تأكيد عبر البريد الإلكتروني تفيد بأنه أنت، ستصلك الرسالة خلال بضع دقائق"
              : "  We sent you a confirmation email that it is you, The message will be delivered within "}
            {lang === "ar" ? null : "10 minutes"}
          </h3>
          <div
            className={`${
              lang === "ar" ? "md:flex-row-reverse" : " md:flex-row"
            } flex items-center sm:gap-6 lg:gap-2 sm:flex-col`}
          >
            <span className="text-lg font-thin text-center">
              {lang === "ar"
                ? "إذا لم تتلق رسالة"
                : "If you do not receive a message"}
            </span>
            <span className="lg:w-10 lg:h-[2px] sm:hidden lg:block bg-white"></span>
            <button
              onClick={(e) => {
                HandleResetSubmit({ setSending, email, setVerified, setErr });
              }}
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            HandleResetSubmit({ setSending, email, setVerified, setErr });
          }}
          className="bg-darkGrey sm:w-11/12 h-5/6 py-2 rounded-lg flex
            flex-col items-center gap-10 justify-center"
        >
          <img
            src={logo}
            alt="logo"
            className="sm:w-[180px] md:[200px] lg:w-[220px]"
          />
          <h2 className=" md:text-xl lg:text-2xl font-light capitalize text-center text-white ">
            {lang === "ar"
              ? "أدخل عنوان بريدك الإلكتروني لإعادة تعيين كلمة المرور الخاصة بك"
              : `Enter your email address to reset your password`}
          </h2>
          <div className="text flex flex-col items-center gap-2 sm:w-full md:w-8/12 lg:w-6/12 px-3 ">
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
          <div
            id="btns"
            className="flex flex-col gap-3 sm:w-full md:w-8/12 lg:w-6/12 px-3"
          >
            <button
              type="submit"
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
              type="button"
              onClick={() => navigate(-1)}
              className=" text-lg text-white rounded-lg capitalize font-semibold"
            >
              {lang === "ar" ? "الغاء" : "  cancel"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
