import React, { useEffect, useState } from "react";
import { SecondaryBtn } from "./Btns";
import logo from "/assest/logo/mainLogo2.svg";
import { useLang } from "../context/LangContext";

export const PopUp = ({
  iconImage,
  text,
  action,
  yesAction,
  noAction,
  type,
}) => {
  const [show, setShow] = useState(false);
  const [lang] = useLang();

  // animation
  useEffect(() => {
    setShow(!show);
  }, []);

  return (
    <div
      className={`${
        show ? "opacity-1" : "opacity-0"
      } duration-300 ease-in-out fixed z-50 bg-black/50 flex justify-center items-center w-full h-full top-0 left-0`}
    >
      <div
        className={`${
          show ? "top-[50%] translate-y-[-50%]" : "top-full"
        } absolute duration-300 ease-in-out h-fit bg-white rounded-xl flex flex-col items-center py-8 justify-between gap-10
        xl:w-4/12 
        lg:w-6/12 lg:px-16
        md:w-7/12 md:px-10
        sm:w-10/12 sm:px-8`}
      >
        <img loading="lazy" src={logo} alt="logo" />
        <img
          loading="lazy"
          src={iconImage}
          alt="icon-reset-submit"
          width={120}
        />
        <p
          className="text-primary-color1 w-full text-center 
        lg:text-[20px]
        md:text-sm
        sm:text-xs"
        >
          {text}
        </p>
        {type === "yes-no" ? (
          //  logout popUp
          <div className="flex gap-5 justify-center w-full">
            <SecondaryBtn
              text={lang === "ar" ? "الغاء" : "cancel"}
              action={noAction}
              type="button"
              style="!py-1 bg-transparent !text-darkGreen hover:!bg-darkGreen hover:!text-white
              md:!text-sm md:!px-11 
              sm:!text-xs sm:!px-6"
            />
            <SecondaryBtn
              text={lang === "ar" ? "نعم" : "yes"}
              action={yesAction}
              type="button"
              style="!py-1 md:!text-sm md:!px-11 
              sm:!text-xs sm:!px-11"
            />
          </div>
        ) : (
          // create password popUp
          <SecondaryBtn
            text={lang === "ar" ? "حسنا" : "ok"}
            action={action}
            type="button"
            style="
            !py-1 md:!text-base md:!px-20 
              sm:!text-sm sm:!px-11 "
          />
        )}
      </div>
    </div>
  );
};
