import React, { useState } from "react";
import { useLang } from "../context/LangContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiUploadCloud } from "react-icons/fi";
import { Oval } from "react-loader-spinner";
import { HandleUploadImg } from "../lib/DashboardReq";

export default function UploadImg({
  inputContainerStyle,
  value,
  deleteImg,
  iconSize,
  iconColor,
  name,
  type,
  accept,
  inputStyle,
  i,
  projectInfo,
  setMsg,
  setProjectInfo,
}) {
  const [lang] = useLang();
  const [uploading, setUploading] = useState(false);

  const langDir = lang === "ar" ? "rtl" : "ltr";

  return (
    <div
      dir={langDir}
      className={`${inputContainerStyle} bg-lightGreen rounded-3xl relative group overflow-hidden col-span-full
  flex justify-center items-center w-full max-w-[700px] sm:h-full md:h-[350px] md:max-h-[350px]`}
    >
      {value?.path && !uploading && (
        <>
          <LazyLoadImage
            effect="opacity"
            src={value?.path}
            className="object-cover rounded-3xl "
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
      {uploading > 0 && !value?.path && (
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
          htmlFor={name + "-upload"}
          className="flex flex-col gap-1 py-6 px-4 justify-center items-center w-full h-[350px] "
        >
          <FiUploadCloud size={iconSize} color={iconColor} />
          <p className="capitalize text-base text-primary-color1 font-bold mt-2">
            Click to upload
          </p>
          <input
            id={name + "-upload"}
            onChange={(e) =>
              HandleUploadImg({
                e,
                i,
                projectInfo,
                setMsg,
                setProjectInfo,
                setUploading,
              })
            }
            name={name}
            dir={langDir}
            type={type}
            accept={accept}
            className={`${inputStyle} hidden w-full h-full text-textColor outline-none text-sm py-3 px-4 rounded-3xl bg-darkGreen `}
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
}
