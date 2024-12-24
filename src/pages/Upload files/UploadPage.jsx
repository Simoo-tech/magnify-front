// libraryies
import { useLang } from "../../context/LangContext";
import { useCallback, useEffect, useMemo, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
// Functions
import { HandleDeleteFile, UploadFiles } from "../../lib/UploadFileFunctions";
// Layout
import MainLayout from "../../Layout/MainLayout";
//  components
import { SecondaryBtn } from "../../components/Btns";
// icons
import { FaCheckCircle } from "react-icons/fa";
import icon6 from "/assets/icon6.svg";
import icon9 from "/assets/icon9.svg";
import { IoIosClose } from "react-icons/io";
import { MdOutlineError } from "react-icons/md";
import { Input } from "../../components/Input";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useLocation } from "react-router-dom";

export default function UploadPage() {
  const location = useLocation().pathname;
  const [images, setImages] = useState([]);
  const [msg, setMsg] = useState({});
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState();
  const [fileName, setFileName] = useState();
  const { lang } = useLang();
  const [projectName, setProjectName] = useState("");

  const langDir = lang === "ar" ? "rtl" : "ltr";
  const isMissingPhoto = location.includes("missing-photo");

  const AllowType = useMemo(
    () =>
      isMissingPhoto
        ? ".3gp,.mp4,.webm,.mkv,.mov,.jpg,.jpeg,.png,.webp"
        : ".3gp,.mp4,.webm,.mkv,.mov",
    [isMissingPhoto]
  );

  const allowedTypesChange = useMemo(
    () =>
      isMissingPhoto
        ? [
            "video/quicktime",
            "video/mp4",
            "video/3gp",
            "video/webm",
            "video/mkv",
            "image/jpg",
            "image/jpeg",
            "image/png",
            "image/webp",
          ]
        : [
            "video/mp4",
            "video/3gp",
            "video/webm",
            "video/mkv",
            "video/quicktime",
          ],
    [isMissingPhoto]
  );

  const maxSize = 100 * 1024 * 1024; // 100MB

  // Message display
  const showMessage = useCallback((text, type, icon) => {
    setMsg({ active: true, text, type, icon });
    setTimeout(() => setMsg((prev) => ({ ...prev, active: false })), 4000);
  }, []);

  const HandleChange = useCallback(
    (e) => {
      if (uploading) return null;
      else {
        setMsg({});
        setUploaded(0);
        setUploading(false);
        setFileName(null);

        const files = Array.from(e.target.files);
        const validFiles = [];
        files.forEach((file) => {
          if (!allowedTypesChange.includes(file.type)) {
            showMessage(`${file.name} is invalid`, "failed", MdOutlineError);
          } else if (file.size > maxSize) {
            showMessage(
              `${file.name} exceeds the maximum size`,
              "failed",
              MdOutlineError
            );
          } else if (images.some((img) => img.name === file.name)) {
            showMessage(
              `${file.name} is already selected`,
              "failed",
              MdOutlineError
            );
          } else {
            validFiles.push(file);
          }
        });
        if (validFiles.length > 0) {
          setImages((prev) => [...prev, ...validFiles]);
        }
      }
    },
    [allowedTypesChange, images, maxSize, showMessage, uploading]
  );

  useEffect(() => {
    const unloadCallback = (event) => {
      if (images.length > 0) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, [images]);

  // Handle upload
  const handleUpload = useCallback(
    (e) => {
      e.preventDefault();
      UploadFiles({
        setUploading,
        setFileName,
        setUploaded,
        images,
        setMsg,
        msg,
        setImages,
        path: isMissingPhoto ? "missing-upload" : "session-upload",
        projectName,
        setProjectName,
      });
    },
    [images, isMissingPhoto, msg, projectName]
  );

  // files selected
  const ShowFile = useMemo(
    () =>
      images.map((file, i) => (
        <div
          key={i}
          id="file"
          className="w-full bg-primary-color4 py-2 px-2 flex justify-between items-center rounded-lg"
        >
          <span className="w-8/12 sm:text-xs text-ellipsis md:text-sm">
            {file.name}
          </span>
          {uploading ? (
            <PulseLoader color="white" size={5} />
          ) : msg?.type === "success" ? (
            <FaCheckCircle color="green" />
          ) : (
            <button
              onClick={() =>
                HandleDeleteFile({ i, images, setImages, setUploaded })
              }
            >
              <LazyLoadImage src={icon6} alt="delete-photo-icon" width={25} />
            </button>
          )}
        </div>
      )),
    [images, msg?.type, uploading]
  );

  return (
    <MainLayout type="upload-files">
      <div
        dir={langDir}
        id="missing-photo"
        className="flex h-full flex-col gap-5 items-center md:w-8/12 lg:w-6/12 relative container max-w-full"
      >
        <h2
          className="text-primary-color1 font-bold capitalize w-full text-center
        sm:text-lg
        md:text-xl
        lg:text-2xl "
        >
          {location.includes("missing-photo")
            ? "missing photos"
            : "photo session data"}
        </h2>
        {/* alert message */}
        <div
          className={` ${
            msg?.type === "success" ? "bg-lightGreen" : "bg-errorContainer"
          } 
              ${
                msg?.active ? " flex" : "hidden"
              } rounded-lg font-normal py-2 px-3 flex items-center text-black justify-between gap-2 w-full max-w-[350px]
            `}
        >
          <span className="truncate w-[200px] sm:text-[12px] md:text-[16px] ">
            {msg?.text}
          </span>
          <button
            className="ml-2"
            onClick={() =>
              setMsg({
                ...msg,
                active: false,
                type: "failed",
                icon: MdOutlineError,
              })
            }
          >
            <IoIosClose size={22} />
          </button>
        </div>
        {/* choose files area */}
        {images.length < 1 && (
          <div
            id="upload-area"
            className=" flex flex-col items-center py-10 rounded-xl w-full
          justify-center gap-5 bg-lightGreen text-primary-color1 relative"
          >
            <img
              src={icon9}
              className="sm:w-[100px] md:w-[150px] h-[110px] object-fill"
            />
            <input
              accept={AllowType}
              onChange={uploading ? null : HandleChange}
              type="file"
              multiple
              className={`absolute w-full h-full opacity-0 ${
                uploading ? "cursor-not-allowed" : " cursor-pointer"
              }`}
            />
            <span
              className="text-center flex items-center px-6 
            sm:text-xs 
            md:text-sm md:gap-2"
            >
              {lang === "ar"
                ? `الصيغ المسموح بها  فقط [ ${AllowType} ] و حجم الملف لايزيد عن 100 MB`
                : `Only [ ${AllowType} ] format are allowed and max size 100M`}
            </span>
            <SecondaryBtn
              type="button"
              text={lang === "ar" ? "تصفح الصور" : "browse images"}
            />
          </div>
        )}
        {/* show files chosen */}
        {images.length > 0 && (
          <div
            id="files"
            className="flex flex-col h-[60%] gap-5 justify-between items-center
            rounded-xl bg-lightGreen py-3 px-3 overflow-y-scroll w-full "
          >
            <div id="show-choosen-files" className="flex flex-col gap-2 w-full">
              {ShowFile}
            </div>
            {/* upload another photo */}
            {!uploading && !uploaded && (
              <div id="upload-another-photo" className="w-fit h-fit relative">
                <input
                  accept=".3gp,.mp4, .webm, .mkv, .mov, .jpg, .jpeg, .png, .webp"
                  onChange={uploading ? null : HandleChange}
                  type="file"
                  multiple
                  className={`absolute w-full h-full opacity-0 ${
                    uploading ? "cursor-not-allowed" : " cursor-pointer"
                  }`}
                />
                <SecondaryBtn
                  style="!bg-lightGreen !border-primary-color2 !text-primary-color2 hover:!bg-primary-color2"
                  text={lang === "ar" ? "اضف صورة" : "Add Files"}
                />
              </div>
            )}
          </div>
        )}
        {/* upload buttom */}
        {images.length > 0 && (
          <form
            onSubmit={uploading ? null : handleUpload}
            id="upload-files"
            className="flex gap-3 items-center justify-center flex-col min-w-[300px] w-7/12 "
          >
            {fileName && (
              <span className="w-full truncate text-center">{fileName}</span>
            )}
            {/* uploading progress */}
            {uploaded > 0 && (
              <span
                perc={`${uploaded}%`}
                className="w-full h-3 bg-gray-200 relative rounded-xl 
                  before:content-[attr(perc)] before:absolute before:-right-14 before:-top-[5px]"
              >
                <span
                  style={{ width: `${uploaded}%` }}
                  className={`h-full absolute bg-green-600
                    rounded-xl duration-200 ease-linear `}
                />
              </span>
            )}
            {/* upload button */}
            <div className=" gap-3 flex items-center flex-col w-full ">
              {uploaded === 0 && (
                <Input
                  require={true}
                  type="text"
                  placeholder="project name"
                  containerStyle="!w-full"
                  onChangeHandle={(e) =>
                    !uploading && setProjectName(e.target.value)
                  }
                  value={projectName}
                />
              )}
              <SecondaryBtn
                type="submit"
                text={lang === "ar" ? "رفع الصور" : "upload files"}
                loading={uploading}
                disabled={uploading || uploaded === 100}
              />
              {/* show files counter */}
              <span
                id="uploaded-files"
                className="capitalize text-gray-500  sm:text-xs md:text-sm"
              >
                {+" " + images.length + " "}
                {lang === "ar" ? "عدد الصورة " : "files choosen"}
              </span>
            </div>
          </form>
        )}
      </div>
    </MainLayout>
  );
}
