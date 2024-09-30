import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
/////// context
import { useLang } from "../context/LangContext";
/////// Api functions
import { HandleSubmit } from "../lib/CreatePassReq";
/////// layout
import Layout2 from "../layout2";
/////// components
import { SecondaryBtn } from "../component/Btns";
import { Input } from "../component/Input";
import { NotFound } from "../component/NotFound";
import { Loading } from "../component/Loading";
import { PopUp } from "../component/PopUp";
/////// icons
import icon2 from "/assest/icon2.svg";
import { MdErrorOutline } from "react-icons/md";
import { GoDotFill } from "react-icons/go";

const serverPath = import.meta.env.VITE_APP_API_BASE;

export default function CreatePass() {
  // fetch user data
  const { id } = useParams();
  const { isLoading, isError, data } = useQuery(
    "userVerify",
    () => {
      return axios.get(`${serverPath}user/verify/${id}`);
    },
    {
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );

  const [lang] = useLang();
  // handle submit
  const [userPass, setUserPass] = useState({});
  const [error, setError] = useState("");
  const [popUp, setPopUp] = useState(false);

  if (isError) {
    return <NotFound />;
  }
  if (isLoading) {
    return <Loading />;
  }
  const langDir = lang === "ar" && "rtl";

  return (
    <Layout2 type={"create-password"}>
      <section
        dir={langDir}
        className="flex items-center flex-col justify-center h-full
        md:gap-16 
        sm:w-full sm:gap-8"
        id="create-new-password"
      >
        {/* finish popUp  */}
        {popUp && (
          <PopUp
            text={
              lang === "ar"
                ? "لقد تم تغيير كلمة المرور الخاصة بك بنجاح"
                : "Your password has been changed successfully"
            }
            iconImage={icon2}
            action={() => {
              window.location.replace("/");
            }}
          />
        )}
        {/* top form */}
        <h2
          className="text-center text-primary-color1 capitalize font-bold 
        flex flex-col items-center gap-2 truncate
        sm:text-[24px]
        md:text-xl"
        >
          {lang === "ar" ? "انشاء كلمة مرور جديدة" : "create new password"}
          {/* error message */}
        </h2>
        <Form
          userPass={userPass}
          setUserPass={setUserPass}
          lang={lang}
          data={data}
          setError={setError}
          setPopUp={setPopUp}
          error={error}
        />
      </section>
    </Layout2>
  );
}

const Form = ({
  userPass,
  setUserPass,
  lang,
  data,
  setError,
  setPopUp,
  error,
}) => {
  const langDir = lang === "ar" && "rtl";

  // handle change
  const HandleChange = (e) => {
    setUserPass({ ...userPass, [e.target.name]: e.target.value });
    setError(null);
  };
  // loading spinner
  const [loading, setLoading] = useState(false);
  // list instructions
  const listInstructions = [
    { text: lang === "ar" ? "علي الاقل 8 احرف" : "at least 8 characters long" },
    { text: lang === "ar" ? "علي الاقل حرف صغير" : "at least one lower case " },
    {
      text: lang === "ar" ? "علي الاقل حرف كبير" : "at least one capital case",
    },
    { text: lang === "ar" ? "علي الاقل رقم" : "at least one number" },
  ];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        HandleSubmit({ setError, data, setLoading, userPass, setPopUp });
      }}
      className="flex justify-around flex-col items-center relative gap-10
      sm:w-full sm:max-w-[450]
      md:w-10/12 md:max-w-full
      lg:w-8/12"
    >
      {error && (
        <span
          dir="ltr"
          className="text-center text-white absolute -top-16 flex items-center gap-3 justify-center bg-red-500 
          py-2 px-6 rounded-xl font-normal
          md:text-sm
          sm:text-xs"
        >
          <MdErrorOutline size={20} />
          {error}
        </span>
      )}
      <div
        dir="ltr"
        className="flex w-full h-fit items-center justify-center 
        sm:flex-col gap-8
        md:flex-row "
      >
        {/* input container */}
        <div
          id="inputs-container"
          className="flex flex-col items-center gap-5 
          sm:w-full 
          md:w-6/12 
          xl:pr-20"
        >
          <Input
            labelStlye="sm:!text-[16px] md:!text-auto text-primary-color1"
            inputStyle="sm:!text-xs lg:!text-auto"
            maxLen={16}
            minLen={8}
            name={"password"}
            onChangeHandle={HandleChange}
            required={true}
            type={"password"}
            value={userPass.password}
            text={lang === "ar" ? "كلمة مرور" : "Password"}
          />
          <Input
            labelStlye="sm:!text-[16px] md:!text-auto text-primary-color1"
            inputStyle="sm:!text-xs md:!text-auto"
            maxLen={16}
            minLen={8}
            name={"passwordcon"}
            onChangeHandle={HandleChange}
            required={true}
            type={"password"}
            value={userPass.passwordcon}
            text={lang === "ar" ? "أعد إدخال كلمة السر" : "Retype Password"}
          />
          <SecondaryBtn
            type={"submit"}
            style="sm:flex sm:text-xs sm:min-w-full sm:!py-2
            md:hidden "
            text={lang === "ar" ? "انشاء كلمة مرور جديدة" : "Set new password"}
            loading={loading}
          />
        </div>
        {/* line */}
        <div
          id="line"
          className="relative   
          sm:w-full sm:h-[1px]
          md:w-[1px] md:h-full"
        >
          <hr
            className="rounded-xl bg-primary-color2 relative
          sm:w-full sm:h-[1px]
          md:w-[1px] md:h-full "
          />
          <GoDotFill
            size={25}
            color="#2B5540"
            className="absolute border-[4px] rounded-full bg-white border-white
              top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] "
          />
        </div>
        {/* instruction container */}
        <div
          dir={langDir}
          id="instruction"
          className="justify-center items-center flex py-4 px-3 flex-col 
          sm:w-full sm:max-w-[400px]
          md:h-5/6 md:w-6/12 md:max-w-full
          xl:pl-20 "
        >
          <h3
            className="flex items-end mb-5 font-medium text-primary-color1
          md:text-lg
          sm:text-base"
          >
            {lang === "ar" ? " كلمة المرور يجب ان تكون:" : "Password must be:"}
          </h3>
          <ol className="list-inside list-item flex-col capitalize space-y-1 text-base">
            {listInstructions.map((list) => (
              <li className="list-decimal text-primary-color1 sm:text-xs md:text-xs lg:text-base">
                {list.text}
              </li>
            ))}
          </ol>
        </div>
      </div>
      <SecondaryBtn
        type={"submit"}
        style="!py-2 truncate
              lg:text-sm md:flex
              md:min-w-[310px] md:w-fit
              sm:text-xs sm:min-w-[250px] sm:w-full sm:hidden"
        text={lang === "ar" ? "انشاء كلمة مرور جديدة" : "Set new password"}
        loading={loading}
      />
    </form>
  );
};
