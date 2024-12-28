import React, { useState } from "react";
import { useLang } from "../context/LangContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
/////// icons
import { LuSearch } from "react-icons/lu";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { RiInformationFill } from "react-icons/ri";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { Field } from "formik";

export const Input = ({
  name,
  onChangeHandle,
  placeholder,
  type,
  value,
  text,
  labelStlye,
  containerStyle,
  inputContainerStyle,
  inputStyle,
  chooses,
  errors,
  touched,
  setErr,
  handleChange,
  setFieldValue,
  disabled,
}) => {
  const { lang } = useLang();
  const [showPass, setShowPass] = useState(false);
  const langDir = lang === "ar" ? "rtl" : "ltr";

  return (
    <div
      className={`${containerStyle} max-w-[400px] text-lightGreen w-full font-medium flex items-center flex-col sm:text-xs md:text-sm lg:text-base rounded-[30px] gap-1 `}
    >
      {text && (
        <span
          className={`px-3 ${labelStlye} flex self-start justify-between w-full items-center
      sm:text-xs md:text-sm lg:text-base`}
        >
          {text}
        </span>
      )}
      {type !== "phone" && type !== "select" && (
        <div
          dir={langDir}
          className={`${inputContainerStyle} ${
            errors && touched && "border-red-400"
          } border-2 bg-lightGreen w-full flex items-center py-[10px] px-4 rounded-[30px] `}
        >
          <Field
            disabled={disabled}
            onChange={onChangeHandle}
            value={value}
            name={name}
            type={type === "password" ? (showPass ? "text" : "password") : type}
            className={`${inputStyle} w-full text-textColor bg-transparent outline-none `}
            placeholder={placeholder}
          />
          {/* show password */}
          {type === "password" && (
            <button type="button" onClick={() => setShowPass(!showPass)}>
              {showPass ? (
                <FaRegEyeSlash
                  className="text-icon"
                  color="#878787"
                  size={20}
                  height="100%"
                />
              ) : (
                <FaRegEye className="text-icon" color="#878787" size={20} />
              )}
            </button>
          )}
          {/* search icon */}
          {name === "search" && (
            <button>
              <LuSearch size={20} color="#D2ECDF" />
            </button>
          )}
        </div>
      )}

      {type === "phone" && (
        <PhoneInput
          buttonStyle={{ outline: "none", border: "none" }}
          countryCodeEditable={false}
          country={"jo"}
          onChange={
            (e) => setFieldValue("phone", e)
            // Updates Formik's handleChange
          }
          enableSearch
          value={value}
          inputClass={lang}
          buttonClass={lang}
          placeholder="........"
        />
      )}
      {type === "select" && (
        <SelectInput
          langDir={langDir}
          inputContainerStyle={inputContainerStyle}
          onChangeHandle={onChangeHandle}
          value={value}
          name={name}
          chooses={chooses}
        />
      )}
      {errors && touched && (
        <div className="w-full flex items-center justify-start text-red-400  rounded-xl text-sm gap-1 px-1">
          <RiInformationFill size={18} />
          {errors}
        </div>
      )}
    </div>
  );
};

const SelectInput = ({
  langDir,
  inputContainerStyle,
  onChangeHandle,
  value,
  name,
  chooses,
}) => (
  <div
    dir={langDir}
    className={`${inputContainerStyle} bg-lightGreen w-full flex items-center py-3 px-4 rounded-[30px]`}
  >
    <select
      className="w-full h-full bg-transparent outline-none border-none sm:text-xs md:text-sm lg:text-base"
      onChange={onChangeHandle}
      value={value}
      name={name}
    >
      {chooses.map((option, i) => (
        <option className="text-black" key={i} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  </div>
);
