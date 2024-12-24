import React, { useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { useLang } from "../context/LangContext";
import { HandleSubmit } from "../lib/CreatePassReq";
import { SecondaryBtn } from "../components/Btns";
import { Input } from "../components/Input";
import { NotFound } from "../pages/NotFound";
import { Loading } from "../components/Loading";
import { PopUp } from "../components/PopUp";
import icon2 from "/assets/icon2.svg";
import { MdErrorOutline } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import cookie from "react-cookies";
import MainLayout from "../Layout/MainLayout";

const serverPath = import.meta.env.VITE_APP_API_BASE;

export default function CreatePass() {
  const { id } = useParams();
  const { isLoading, isError, data } = useQuery(
    "userVerify",
    () => axios.get(`${serverPath}user/verify/${id}`),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
  console.log(data);
  const { lang } = useLang();
  const [formState, setFormState] = useState({
    userPass: { password: "", passwordcon: "" },
    error: "",
    popUp: false,
    loading: false,
  });

  const langDir = lang === "ar" ? "rtl" : "ltr";

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormState((prev) => ({
        ...prev,
        userPass: { ...prev.userPass, [name]: value },
        error: "",
      }));
    },
    [setFormState]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      HandleSubmit({
        setError: (error) => setFormState((prev) => ({ ...prev, error })),
        data,
        setLoading: (loading) => setFormState((prev) => ({ ...prev, loading })),
        userPass: formState.userPass,
        setPopUp: () => setFormState((prev) => ({ ...prev, popUp: true })),
      });
    },
    [data, formState.userPass]
  );

  const listInstructions = useMemo(
    () => [
      {
        text: lang === "ar" ? "علي الاقل 8 احرف" : "at least 8 characters long",
      },
      {
        text: lang === "ar" ? "علي الاقل حرف صغير" : "at least one lower case ",
      },
      {
        text:
          lang === "ar" ? "علي الاقل حرف كبير" : "at least one capital case",
      },
      { text: lang === "ar" ? "علي الاقل رقم" : "at least one number" },
    ],
    [lang]
  );

  if (isError) return <NotFound />;
  if (isLoading) return <Loading />;

  const { userPass, error, popUp, loading } = formState;

  return (
    <MainLayout type="create-password">
      <section
        dir={langDir}
        className="flex items-center flex-col justify-center container max-w-full sm:w-full h-full sm:gap-16 lg:gap-16"
        id="create-new-password"
      >
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
              cookie.remove("user_token", {
                path: "/",
                secure: true,
              });
            }}
          />
        )}
        <h2 className="text-center text-primary-color1 capitalize font-bold flex flex-col items-center gap-2 truncate sm:text-lg md:text-xl lg:text-2xl">
          {lang === "ar" ? "انشاء كلمة مرور جديدة" : "create new password"}
        </h2>
        <Form
          userPass={userPass}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          lang={lang}
          error={error}
          setError={(error) => setFormState((prev) => ({ ...prev, error }))}
          listInstructions={listInstructions}
          loading={loading}
        />
      </section>
    </MainLayout>
  );
}

const Form = ({
  userPass,
  handleChange,
  handleSubmit,
  lang,
  error,
  listInstructions,
  loading,
}) => {
  const langDir = lang === "ar" ? "rtl" : "ltr";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-around flex-col items-center relative  
      sm:gap-10 md:gap-20 
      sm:w-full md:w-11/12 lg:w-9/12"
    >
      {error && (
        <span
          dir="ltr"
          className="text-center text-white absolute -top-14 flex items-center gap-2 justify-center bg-red-500 py-2 px-6 rounded-xl font-normal md:text-sm sm:text-xs"
        >
          <MdErrorOutline size={20} />
          {error}
        </span>
      )}
      <div
        dir="ltr"
        className="flex w-full h-full items-center justify-center sm:flex-col gap-8 md:flex-row"
      >
        <div
          id="inputs-container"
          className="flex flex-col items-center gap-5 sm:w-full md:w-5/12 xl:pr-20"
        >
          <Input
            labelStlye="text-primary-color1"
            maxLen={16}
            minLen={8}
            name="password"
            onChangeHandle={handleChange}
            required
            type="password"
            value={userPass.password}
            text={lang === "ar" ? "كلمة مرور" : "Password"}
          />
          <Input
            labelStlye=" text-primary-color1"
            maxLen={16}
            minLen={8}
            name="passwordcon"
            onChangeHandle={handleChange}
            required
            type="password"
            value={userPass.passwordcon}
            text={lang === "ar" ? "أعد إدخال كلمة السر" : "Retype Password"}
          />
          <SecondaryBtn
            type="submit"
            style="sm:min-w-full sm:!py-2 md:hidden"
            text={lang === "ar" ? "انشاء كلمة مرور جديدة" : "Set new password"}
            loading={loading}
            id="focus-btn-2"
            disabled={!userPass.password || !userPass.passwordcon}
          />
        </div>
        <div
          id="line"
          className="relative sm:w-full sm:h-[1px] md:w-[1px] md:h-full"
        >
          <hr className="rounded-xl bg-primary-color2 relative sm:w-full sm:h-[1px] md:w-[1px] md:h-full" />
          <GoDotFill
            size={25}
            color="#2B5540"
            className="absolute border-[4px] rounded-full bg-white border-white top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]"
          />
        </div>
        <div
          dir={langDir}
          id="instruction"
          className="justify-center flex  flex-col sm:w-full sm:items-center md:h-5/6 md:w-5/12 md:max-w-full lg:pl-20 items-start"
        >
          <h3 className="mb-3 font-semibold text-primary-color1 md:text-lg sm:text-base">
            {lang === "ar" ? " كلمة المرور يجب ان تكون:" : "Password must be:"}
          </h3>
          <ol className="list-inside list-item flex-col capitalize space-y-1 text-base">
            {listInstructions.map((list, index) => (
              <li
                key={index}
                className="list-disc text-primary-color1 sm:text-sm md:text-md lg:text-base"
              >
                {list.text}
              </li>
            ))}
          </ol>
        </div>
      </div>
      <SecondaryBtn
        id="focus-btn-1"
        disabled={!userPass.password || !userPass.passwordcon}
        type="submit"
        style="md:flex sm:hidden !min-w-[280px]"
        text={lang === "ar" ? "انشاء كلمة مرور جديدة" : "Set new password"}
        loading={loading}
      />
    </form>
  );
};
