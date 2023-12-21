import React, { useContext, useState } from "react";
import "../App.css";
import LanguageCon from "../Context";
import { FaInfoCircle } from "react-icons/fa";
export const CreatePass = () => {
  const [show, setShow] = useState(false);
  const { lang } = useContext(LanguageCon);
  return (
    <div className="section-h create-password bg-color1 flex justify-center items-center">
      <div className="container bg-darkGrey w-6/12 h-5/6 rounded-lg pt-10 flex flex-col items-center justify-center">
        <p className="text-center text-white capitalize text-3xl font-bold ">
          {lang === "ar" ? "انشاء كلمة مرور جديدة" : "create new password"}
        </p>
        <form
          className={`flex ${
            lang === "ar" ? "flex-row-reverse" : "flex-row"
          } flex-wrap justify-evenly items-center w-11/12
        mt-10 h-4/6 `}
        >
          <div className="inputs-form flex flex-col items-center gap-5 w-6/12">
            <div className="input w-full">
              <input
                type={show ? "text" : "password"}
                name="password"
                id="password"
                placeholder={lang === "ar" ? "كلمة مرور" : "Password"}
                className={`py-3 px-4 w-full rounded-lg outline-none 
                border-color1 ${
                  lang === "ar"
                    ? "text-end border-l-4"
                    : "text-start border-r-4"
                }`}
              />
            </div>
            <div className="input w-full">
              <input
                type={show ? "text" : "password"}
                name="password-con"
                id="password-con"
                placeholder={
                  lang === "ar" ? "أعد إدخال كلمة السر" : "Retype Password"
                }
                className={`py-3 px-4 w-full rounded-lg outline-none 
                border-color1 ${
                  lang === "ar"
                    ? "text-end border-l-4"
                    : "text-start border-r-4"
                }`}
              />
            </div>
            <label
              onChange={() => setShow(!show)}
              htmlFor="show"
              className={`gap-1 flex text-lg w-full justify-start text-white ${
                lang === "ar" && "flex-row-reverse"
              } capitalize `}
            >
              <input type="checkbox" id="show" className="text-lg" />
              {lang === "ar" ? "اظهار كلمة المرور" : "show password"}
            </label>
          </div>
          <div
            className={`instruction w-5/12 text-white flex  justify-center
          border-2 border-color3 py-4 px-3 flex-col
          ${lang === "ar" ? "items-end" : "items-start"}`}
          >
            <p
              className={`flex items-end gap-2 text-lg ${
                lang === "ar" && "flex-row-reverse"
              }`}
            >
              <p className="text-2xl font-semibold text-color3">
                {lang === "ar" ? "تَلمِيح" : "Hint"}
              </p>
              {lang === "ar"
                ? ": كلمة المرور يجب ان تكون"
                : "Password must be:"}
            </p>
            <ul
              className={`${
                lang === "ar" ? " text-right pr-1" : "pl-1"
              } flex flex-col capitalize text-base`}
            >
              <li
                className={` flex items-center relative gap-2 ${
                  lang === "ar" ? "flex-row-reverse" : ""
                }`}
              >
                <FaInfoCircle size={12} />
                {lang === "ar"
                  ? "علي الاقل 8 احرف"
                  : "at least 8 characters long"}
              </li>
              <li
                className={` flex items-center relative gap-2 ${
                  lang === "ar" ? "flex-row-reverse" : ""
                }`}
              >
                <FaInfoCircle size={12} />
                {lang === "ar"
                  ? "علي الاقل حرف صغير"
                  : "at least one lower case "}
              </li>
              <li
                className={` flex items-center relative gap-2 ${
                  lang === "ar" ? "flex-row-reverse" : ""
                }`}
              >
                <FaInfoCircle size={12} />
                {lang === "ar"
                  ? "علي الاقل حرف كبير"
                  : "at least one capital case"}{" "}
              </li>
              <li
                className={` flex items-center relative gap-2 ${
                  lang === "ar" ? "flex-row-reverse" : ""
                }`}
              >
                <FaInfoCircle size={12} />
                {lang === "ar" ? "علي الاقل رقم" : "at least one number"}{" "}
              </li>
            </ul>
          </div>
          <button
            type="submit"
            className="text-white border-2 border-white text-xl py-2 px-5 rounded-lg
            hover:bg-white hover:text-darkGrey duration-150 ease-linear"
          >
            {lang === "ar" ? "انشاء كلمة مرور جديدة" : "Set new password"}
          </button>
        </form>
      </div>
    </div>
  );
};
