// libraryies
import { useLang } from "../../context/LangContext";
import { useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
// Functions
import { HandleDeleteFile, UploadFiles } from "../../lib/UploadFileFunctions";
// Layout
import Layout2 from "../../layout2";
//  components
import { SecondaryBtn } from "../../component/Btns";
// icons
import { FaCheckCircle } from "react-icons/fa";
import icon6 from "/assest/icon6.svg";
import icon9 from "/assest/icon9.svg";
import { IoIosClose } from "react-icons/io";
import { MdOutlineError } from "react-icons/md";

export default function MissingPhoto() {
  const [images, setImages] = useState([]);
  const [msg, setMsg] = useState({});
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState();
  const [fileName, setFileName] = useState();
  const [done, setDone] = useState([]);
  const [lang] = useLang();
  const [animation, setAnimation] = useState(false);
  let Newimg = [];

  const HandleChange = (e) => {
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (uploading) {
      return null;
    } else {
      setMsg({});
      setUploaded(0);
      setUploading(false);
      setFileName(null);
      const imgFile = Array.from(e.target.files);
      // check file type
      imgFile.forEach((img) => {
        if (
          img.type === "video/quicktime" ||
          img.type === "video/mp4" ||
          img.type === "video/3gp" ||
          img.type === "video/webm" ||
          img.type === "video/mkv" ||
          img.type === "image/jpg" ||
          img.type === "image/jpeg" ||
          img.type === "image/png" ||
          img.type === "image/webp"
        ) {
          if (maxSize > img.size) {
            ifSameName(img);
          } else {
            const msgText =
              lang === "ar"
                ? ` حجم${" " + img.name} اكبر من حجم الملف المحدد `
                : `${img.name} is large than max size`;

            setMsg({
              active: true,
              text: msgText,
              type: "failed",
              icon: MdOutlineError,
            });
            setTimeout(() => setMsg({}), 2000);
          }
        } else {
          setMsg({
            active: true,
            text: `${img.name} is invalid`,
            type: "failed",
            icon: MdOutlineError,
          });
          setTimeout(() => setMsg({}), 2000);
        }
      });
    }
  };

  // check if file exist
  const ifSameName = (img) => {
    const ChossenFiles = images.map((img) => {
      return img.name;
    });
    if (ChossenFiles.includes(img.name)) {
      setMsg({
        active: true,
        text: `${img.name} already choose`,
        type: "failed",
        icon: MdOutlineError,
      });
      setTimeout(() => setMsg(null), 2000);
    } else {
      Newimg.push(img);
      setImages([...images, ...Newimg]);
    }
  };

  // files selected
  const ShowFile = images.map((file, i) => {
    return (
      <div
        key={i}
        id="file"
        className="w-full bg-primary-color4 py-2 px-3 flex justify-between items-center truncate rounded-lg"
      >
        <span className="w-8/12 truncate sm:text-xs md:text-sm">
          {file.name}
        </span>
        {uploading || msg.active ? (
          done.includes(i) ? (
            <FaCheckCircle
              size={20}
              className="bg-white text-green-500 rounded-full"
            />
          ) : (
            <PulseLoader color="white" size={5} />
          )
        ) : (
          <button
            onClick={() =>
              HandleDeleteFile({ i, images, setImages, setUploaded })
            }
          >
            <img src={icon6} alt="delete-photo-icon" width={25} />
          </button>
        )}
      </div>
    );
  });
  useEffect(() => setAnimation(true), []);

  const handleUploadBtnMissing = (e) => {
    e.preventDefault();
    UploadFiles({
      setUploading,
      setFileName,
      setUploaded,
      images,
      setMsg,
      msg,
      setImages,
      setDone,
      path: "missing-upload",
    });
  };
  const langDir = lang === "ar" && "rtl";

  return (
    <section
      dir={langDir}
      className={`${
        animation ? "top-0" : "top-full"
      } w-full h-full flex justify-center items-center absolute duration-500 left-0 z-30  `}
    >
      <Layout2 type="check-email">
        <h2
          className="text-primary-color1 font-bold capitalize
        sm:text-lg
        md:text-xl
        lg:text-3xl "
        >
          missing photos
        </h2>
        {/* alert message */}
        {msg.active && (
          <span
            className={`fixed  left-[50%] translate-x-[-50%] rounded-lg font-normal  ${
              msg.type === "success" ? "bg-lightGreen" : "bg-errorContainer"
            }  z-50 py-3  flex items-center text-black justify-center gap-2 truncate
          sm:text-[12px] sm:w-fit sm:px-2 sm:top-16
          md:text-[16px] md:px-4 md:top-8`}
          >
            <msg.icon
              color={msg.type === "success" ? "497B62" : "BD5151"}
              size={25}
            />
            {msg.text}
            <button className="ml-2" onClick={() => setMsg({})}>
              <IoIosClose size={22} />
            </button>
          </span>
        )}
        {/* choose files area */}
        {images.length < 1 && (
          <div
            id="upload-area"
            className="md:w-7/12 flex flex-col items-center py-10 rounded-xl
          justify-center gap-5 bg-lightGreen text-primary-color1 relative"
          >
            <img src={icon9} className="sm:w-[100px] md:w-[150px]" />
            <input
              accept=".3gp,.mp4, .webm, .mkv, .mov, .jpg, .jpeg, .png, .webp"
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
                ? " الصيغ المسموح بها  فقط [ 3gp, mp4, webm, mkv, mov, jpg, jpeg, png, webp ] و حجم الملف لايزيد عن 100 MB    "
                : "  Only [ .3gp, .mp4, .webm, .mkv, .mov, .jpg, .jpeg, .png, .webp ] format are allowed and max size 100M"}
            </span>
            <SecondaryBtn
              style="sm:!px-10 sm:!text-xs md:!text-sm md:!py-2 md:!px-16 "
              text={lang === "ar" ? "تصفح الصور" : "browse images"}
            />
          </div>
        )}
        {/* show files chosen */}
        {images && images.length > 0 && (
          <div
            id="files"
            className="flex flex-col h-[350px] gap-5 justify-between items-center
            rounded-xl bg-lightGreen p-5 overflow-y-scroll
            sm:max-w-full 
            md:w-7/12"
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
                  style="sm:!px-10 sm:!text-xs md:!text-sm md:!py-2 md:!px-16 !bg-transparent !text-primary-color1 !border-[2px]"
                  text={lang === "ar" ? "اضف صورة" : "Add Files"}
                />
              </div>
            )}
          </div>
        )}
        {/* upload buttom */}
        {images && images.length > 0 && (
          <div
            id="upload-files"
            className="flex gap-5 items-center w-7/12 justify-center flex-col"
          >
            {fileName && (
              <span className="w-full truncate text-center">{fileName}</span>
            )}
            {/* uploading progress */}
            {uploading && (
              <span
                perc={`${uploaded}%`}
                className="w-10/12 h-3 bg-gray-200 relative rounded-xl 
      before:content-[attr(perc)] before:absolute before:-right-12 before:-top-[5px]"
              >
                <span
                  style={{ width: `${uploaded}%` }}
                  className={`h-full absolute bg-green-600
              rounded-xl duration-200 ease-linear `}
                ></span>
              </span>
            )}
            {/* upload button */}
            <div className="full gap-5 flex items-center flex-col ">
              <SecondaryBtn
                style="sm:!px-10 sm:!text-xs md:!text-sm md:!py-2 md:!px-16 truncate"
                action={uploading ? null : handleUploadBtnMissing}
                text={lang === "ar" ? "رفع الصور" : "upload files"}
                loading={uploading}
                disabled={uploading}
              />
              {/* show files counter */}
              <span
                dir="ltr"
                id="uploaded-files"
                className="capitalize text-gray-500  sm:text-xs md:text-sm"
              >
                {+" " + images.length + " "}
                {lang === "ar" ? "عدد الصورة " : "files choosen"}
              </span>
            </div>
          </div>
        )}
      </Layout2>
    </section>
  );
}