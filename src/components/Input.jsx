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
  accept,
  iconSize,
  iconColor,
  uploading,
  deleteImg,
  inkey,
  require,
}) => {
  const [lang] = useLang();
  const [showPass, setShowPass] = useState(false);
  const langDir = lang === "ar" && "rtl";
  const upload = useRef(null);

  return (
    <label
      key={inkey}
      htmlFor={`${name}-input`}
      dir={langDir}
      className={`${containerStyle} text-lightGreen w-full font-medium flex items-center flex-col gap-1`}
    >
      <span
        className={`px-4 ${labelStlye} flex self-start
      sm:text-xs md:text-sm lg:text-base`}
      >
        {text}
      </span>
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
      ) : (
        type === "file" && (
          <FileInput
            langDir={langDir}
            inputContainerStyle={inputContainerStyle}
            value={value}
            deleteImg={deleteImg}
            uploading={uploading}
            iconSize={iconSize}
            iconColor={iconColor}
            name={name}
            upload={upload}
            onChangeHandle={onChangeHandle}
            type={type}
            accept={accept}
            inputStyle={inputStyle}
            placeholder={placeholder}
          />
        )
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

const FileInput = ({
  inputContainerStyle,
  value,
  deleteImg,
  uploading,
  iconSize,
  iconColor,
  name,
  upload,
  onChangeHandle,
  langDir,
  type,
  accept,
  inputStyle,
  placeholder,
}) => (
  <div
    dir={langDir}
    className={`${inputContainerStyle} bg-lightGreen rounded-3xl relative group overflow-hidden
  flex justify-center items-center w-full max-w-[700px] sm:h-full md:h-[350px] md:max-h-[350px]`}
  >
    {value?.path && (
      <>
        <LazyLoadImage
          effect="opacity"
          src={value?.path}
          width={"100%"}
          height={"100%"}
          className="object-cover rounded-3xl"
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
    {uploading && !value?.path && (
      <div className="w-9/12 h-[350px] relative flex gap-5 items-center flex-col justify-center ">
        <Oval />
        <p className="absolute left-[50%] top-[40%] translate-x-[-50%]">
          {uploading}%
        </p>
        <span className="text-primary-color1 capitalize truncate sm:text-xs md:text-sm">
          uploading, please wait.
        </span>
      </div>
    )}
    {!value?.path && !uploading && (
      <label
        htmlFor={`${name}-input-img`}
        className="flex flex-col gap-1 py-6 px-4 justify-center items-center w-full h-[350px] "
      >
        <FiUploadCloud size={iconSize} color={iconColor} />
        <p className="capitalize text-base text-primary-color1 font-bold mt-2">
          Click to upload
        </p>
        <input
          id={`${name}-input-img`}
          ref={upload}
          onChange={onChangeHandle}
          name={name}
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
);

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
