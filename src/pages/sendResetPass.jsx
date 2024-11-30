/////// libraryes
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "../context/LangContext";
// layout
import Layout2 from "../layout2";
// components
import { Input } from "../components/Input";
import { SecondaryBtn } from "../components/Btns";
// icons
import { MdErrorOutline } from "react-icons/md";
// Api functions
import { HandleSendReset } from "../lib/Verify&ResetReq";

export default function SendReset() {
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();
  const [err, setErr] = useState(null);
  const [email, setEmail] = useState("");
  const [lang] = useLang();

  return (
    <Layout2 type={"reset-password"}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          HandleSendReset({ setSending, email, setErr });
        }}
        className="flex h-full flex-col items-center justify-center 
        lg:w-6/12
        md:w-4/6 md:gap-14 
        sm:w-11/12 sm:gap-10"
      >
        {/* top text form */}
        <div className="flex w-full flex-col sm:gap-8 md:gap-10" id="top-form">
          <h2
            className="text-primary-color1 font-bold capitalize text-center truncate
          xl:text-3xl
          lg:text-2xl
          md:text-xl
          sm:text-lg"
          >
            {lang === "ar" ? "نسيت كلمة السر ؟" : `Forgot your password?`}
          </h2>
          <h3
            className="font-normal text-primary-color1 capitalize text-center flex flex-col gap-5 items-center
          xl:text-xl
          lg:text-lg
          md:text-base
          sm:text-sm"
          >
            {lang === "ar"
              ? "أدخل عنوان بريدك الإلكتروني لإعادة تعيين كلمة المرور الخاصة بك"
              : `Enter your email address to reset your password`}
            {/* error */}
            {err && (
              <span
                className=" bg-red-500 text-white py-2 flex items-center justify-center gap-2 
          rounded-lg  text-sm w-fit truncate
          xl:text-base xl:px-16
          lg:text-[17px] lg:px-16
          md:text-sm md:px-14
          sm:text-xs sm:px-10"
              >
                <MdErrorOutline size={20} /> {err}
              </span>
            )}
          </h3>
        </div>
        {/* input container */}
        <div
          id="input-group"
          className="flex flex-col items-center px-3 w-full
          sm:gap-8 sm:max-w-[450px]
          md:gap-14 md:max-w-[550px
          lg:gap-14"
        >
          <Input
            labelStlye="text-primary-color1 font-normal mb-1"
            value={email}
            onChangeHandle={(e) => {
              setEmail(e.target.value);
              setErr(null);
            }}
            required={true}
            autoFocus={true}
            placeholder=""
            type={"email"}
            name={"email"}
            text={lang === "ar" ? "البريد الالكتروني" : "Enter your email"}
          />
          {/* submit */}
          <div id="submit-btn" className="flex flex-col gap-4 w-fit px-3">
            <SecondaryBtn
              loading={sending}
              disabled={!email}
              type={"submit"}
              text={
                lang === "ar" ? "إرسال رابط التحقق" : "Send verification link"
              }
              style=""
            />
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-darkGreen rounded-lg capitalize font-semibold 
              md:text-sm
              sm:text-xs"
            >
              {lang === "ar" ? "الغاء" : "  cancel"}
            </button>
          </div>
        </div>
      </form>
    </Layout2>
  );
}
