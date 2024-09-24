import React, { useRef, useState } from "react";
import { useLang } from "../context/LangContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
/////// icons
import { LuSearch } from "react-icons/lu";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Oval } from "react-loader-spinner";

export const Input = ({
  name,
  onChangeHandle,
  placeholder,
  type,
  value,
  minLen,
  maxLen,
  text,
  labelStlye,
  autoFocus,
  containerStyle,
  inputContainerStyle,
  inputStyle,
  chooses,
  accept,
  iconSize,
  iconColor,
  uploading,
  deleteImg,
}) => {
  const [lang] = useLang();

  const [showPass, setShowPass] = useState(false);
  const langDir = lang === "ar" && "rtl";
  const upload = useRef(null);

  return (
    <label
      htmlFor={`${name}-input`}
      dir={langDir}
      className={`${containerStyle} sm:text-sm md:text-base text-lightGreen w-full font-medium flex items-center flex-col gap-1`}
    >
      <span className={`px-4 ${labelStlye} flex self-start`}>{text}</span>
      {type === "phone" && (
        <PhoneInput
          buttonStyle={{ outline: "none", border: "none" }}
          countryCodeEditable={false}
          country={"jo"}
          onChange={onChangeHandle}
          value={value}
          inputClass={lang}
          buttonClass={lang}
        />
      )}
      {type === "email" ||
      type === "password" ||
      type === "text" ||
      type === "date" ? (
        <div
          dir={langDir}
          className={`${inputContainerStyle} bg-lightGreen w-full flex items-center py-3 px-4 rounded-[48px]`}
        >
          <input
            autoFocus={autoFocus}
            minLength={minLen}
            maxLength={maxLen}
            onChange={onChangeHandle}
            name={name}
            id={`${name}-input`}
            value={value}
            dir={langDir}
            type={type === "password" ? (showPass ? "text" : "password") : type}
            className={`${inputStyle} w-full text-textColor bg-transparent outline-none sm:text-xs md:text-sm `}
            placeholder={placeholder}
          />
          {/* show password */}
          {type === "password" && (
            <button type="button" onClick={() => setShowPass(!showPass)}>
              {showPass ? (
                <FaRegEyeSlash
                  className="text-icon"
                  color="#878787"
                  size={18}
                />
              ) : (
                <FaRegEye className="text-icon" color="#878787" size={18} />
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
      ) : (
        type === "file" && (
          <div
            dir={langDir}
            className={`${inputContainerStyle} h-full sm:w-full md:w-8/12 bg-lightGreen rounded-3xl relative group overflow-hidden
            flex justify-center items-center `}
          >
            {value?.path && (
              <>
                <img
                  loading="eager"
                  src={value?.path}
                  className="w-full sm:h-full md:max-h-[350px] object-cover rounded-3xl"
                />
                <div
                  id="tools"
                  className="absolute flex gap-16 opacity-0 top-0 group-hover:opacity-100 z-30 w-full h-full justify-between items-end
                  from-black/90 to-transparent bg-gradient-to-t duration-300 ease-linear p-5"
                >
                  <span className="text-lightGreen sm:text-xs truncate ">
                    {value.name}
                  </span>
                  <button
                    type="button"
                    onClick={deleteImg}
                    className="flex items-center gap-2 capitalize px-2 py-2 rounded-lg bg-errorContainer text-errorIcon"
                  >
                    <RiDeleteBin6Line className="sm:text-[18px] md:text-[23px]" />
                  </button>
                </div>
              </>
            )}
            {uploading && !value && (
              <div className="w-9/12 relative flex gap-5 items-center flex-col justify-center ">
                <Oval />
                <p className="absolute left-[50%] top-[30%] translate-x-[-50%] translate-y-[-30%]">
                  {uploading}%
                </p>
                <span className="text-primary-color1 capitalize truncate sm:text-xs md:text-sm">
                  uploading, please wait.
                </span>
              </div>
            )}
            {!value?.name && !uploading && (
              <label
                htmlFor={`${name}-input-img`}
                className="flex flex-col gap-1 py-6 px-4 justify-center items-center w-full"
              >
                <FiUploadCloud size={iconSize} color={iconColor} />
                <input
                  ref={upload}
                  onChange={onChangeHandle}
                  name={name}
                  id={`${name}-input-img`}
                  value=""
                  dir={langDir}
                  type={type}
                  accept={accept}
                  className={`${inputStyle} hidden w-full h-full text-textColor outline-none text-sm py-3 px-4 rounded-3xl bg-darkGreen `}
                  placeholder={placeholder}
                />
                <div id="text" className="flex flex-col gap-5 items-center">
                  <span className="text-primary-color1 sm:text-base md:text-[20px] font-bold ">
                    {value?.name}
                  </span>
                  <span className="text-darkGreen sm:text-xs md:text-sm ">
                    .JPG, JPEG, PNG, WEBP (MAX. 5MB)
                  </span>
                </div>
              </label>
            )}
          </div>
        )
      )}
      {type === "select" && (
        <div
          dir={langDir}
          className={`${inputContainerStyle} bg-lightGreen w-full flex items-center py-3 px-4 rounded-[48px]`}
        >
          <select
            className="w-full h-full bg-transparent outline-none border-none"
            onChange={onChangeHandle}
            value={value}
            name={name}
          >
            {chooses.map((option, i) => (
              <option key={i} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
      )}
    </label>
  );
};
