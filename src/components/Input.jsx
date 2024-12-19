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
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

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
  containerStyle,
  inputContainerStyle,
  inputStyle,
  chooses,
  require,
  forLabel,
}) => {
  const [lang] = useLang();
  const [showPass, setShowPass] = useState(false);
  const langDir = lang === "ar" ? "rtl" : "ltr";

  return (
    <label
      htmlFor={forLabel}
      dir={langDir}
      className={`${containerStyle} text-lightGreen w-full font-medium flex items-center flex-col gap-1`}
    >
      <span
        className={`px-4 ${labelStlye} flex self-start
      sm:text-xs md:text-sm lg:text-base`}
      >
        {text}
      </span>
      {type !== "phone" && type !== "select" && (
        <div
          dir={langDir}
          className={`${inputContainerStyle} bg-lightGreen w-full flex items-center py-3 px-4 rounded-[48px]`}
        >
          <input
            autoComplete="email"
            id={forLabel}
            required={require}
            minLength={minLen}
            maxLength={maxLen}
            onChange={onChangeHandle}
            name={name}
            value={value}
            dir={langDir}
            type={type === "password" ? (showPass ? "text" : "password") : type}
            className={`${inputStyle} w-full text-textColor bg-transparent outline-none sm:text-xs md:text-sm lg:text-base`}
            placeholder={placeholder}
          />
          {/* show password */}
          {type === "password" && (
            <button type="button" onClick={() => setShowPass(!showPass)}>
              {showPass ? (
                <FaRegEyeSlash
                  className="text-icon"
                  color="#878787"
                  size={17}
                />
              ) : (
                <FaRegEye className="text-icon" color="#878787" size={17} />
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
          onChange={onChangeHandle}
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
    </label>
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
    className={`${inputContainerStyle} bg-lightGreen w-full flex items-center py-3 px-4 rounded-[48px]`}
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
