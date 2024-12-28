import React, { useEffect, useState } from "react";
import { SecondaryBtn } from "./Btns";
import { useLang } from "../context/LangContext";
import { preload } from "react-dom";

export const PopUp = ({
  iconImage,
  children,
  action,
  yesAction,
  noAction,
  type,
  text,
  icon,
  btnText,
  hidden,
}) => {
  preload("/assets/logo/mainLogo2.svg", {
    as: "image",
  });

  const [show, setShow] = useState(false);
  const { lang } = useLang();

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
        <img src="/assets/logo/mainLogo2.svg" alt="logo" />
        {iconImage && (
          <img
            src={iconImage}
            alt="icon-reset-submit"
            className="sm:w-[100px] md:w-[110px] lg:w-[120px]"
          />
        )}
        {icon && icon}
        <div
          className="text-primary-color1 w-full text-center
        sm:text-sm
        md:text-base
        lg:text-lg"
        >
          {children || text}
        </div>
        {type === "yes-no" ? (
          //  logout popUp
          <div className="flex gap-5 justify-center w-full">
            <SecondaryBtn
              text={lang === "ar" ? "الغاء" : "cancel"}
              action={noAction}
              type="button"
              style="!py-2 bg-transparent !text-darkGreen hover:!bg-darkGreen hover:!text-white w-6/12 !px-0 sm:!px-0 !min-w-fit
              md:!text-sm 
              sm:!text-xs "
            />
            <SecondaryBtn
              text={btnText ? btnText : lang === "ar" ? "نعم" : "yes"}
              action={yesAction}
              type="button"
              style="!py-2 md:!text-sm w-6/12 sm:!px-0 !min-w-fit
              sm:!text-xs "
              disabled={hidden}
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
              sm:!text-base sm:!px-11 "
          />
        )}
      </div>
    </div>
  );
};
