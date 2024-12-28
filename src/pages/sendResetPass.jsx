/////// libraryes
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "../context/LangContext";
// layout
import MainLayout from "../Layout/MainLayout";
// components
import { Input } from "../components/Input";
import { SecondaryBtn } from "../components/Btns";
// icons
import { MdErrorOutline } from "react-icons/md";
// Api functions
import { HandleSendReset } from "../lib/Verify&ResetReq";
import { Form, Formik } from "formik";
import * as Yup from "yup";

export default function SendReset() {
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();
  const [err, setErr] = useState(null);
  const { lang } = useLang();
  // Handle text based on language
  const getText = useMemo(
    () => (enText, arText) => lang === "en" || !lang ? enText : arText,
    [lang]
  );

  const ResetPassSchema = Yup.object().shape({
    email: Yup.string()
      .email(getText("Invalid E-mail", "بريد الكتروني غير صالح"))
      .required(getText("E-mail is required", "البريد الإلكتروني مطلوب"))
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        getText("Enter a valid e-mail", "أدخل بريد إلكتروني صالح")
      )
      .trim(),
  });

  return (
    <MainLayout type={"forgot-password"}>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={ResetPassSchema}
        onSubmit={(values) =>
          HandleSendReset({ setSending, values, setErr, getText })
        }
      >
        {({ errors, touched, values, handleChange }) => (
          <Form
            className="flex h-full flex-col items-center justify-center container max-w-full
  lg:w-6/12
  md:w-4/6 md:gap-14 
  sm:w-11/12 sm:gap-10"
          >
            {/* top text form */}
            <div
              className="flex w-full flex-col sm:gap-8 md:gap-10"
              id="top-form"
            >
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
                onChangeHandle={(e) => {
                  handleChange(e);
                  setErr(null);
                }}
                labelStlye="text-primary-color1 font-normal mb-1"
                value={values.email}
                errors={errors.email}
                touched={touched.email}
                setErr={setErr}
                required={true}
                placeholder=""
                type={"email"}
                name={"email"}
                text={lang === "ar" ? "البريد الالكتروني" : "Enter your email"}
              />
              {/* submit */}
              <div id="submit-btn" className="flex flex-col gap-4 w-fit px-3">
                <SecondaryBtn
                  loading={sending}
                  disabled={!values.email || sending}
                  type={"submit"}
                  text={
                    lang === "ar"
                      ? "إرسال رابط التحقق"
                      : "Send verification link"
                  }
                  style=""
                />
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="text-darkGreen rounded-lg capitalize font-semibold 
              md:text-sm
              sm:text-xs"
                >
                  {lang === "ar" ? "الغاء" : "  cancel"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </MainLayout>
  );
}
