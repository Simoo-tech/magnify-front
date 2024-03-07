import { FaCheckCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { MdCloudUpload } from "react-icons/md";
import PulseLoader from "react-spinners/PulseLoader";
import { Message } from "../../component/MessageUpload";
import { useState } from "react";
import {
  HandleDeleteFile,
  UploadFiles,
} from "../../functions/UploadFileFunctions";

export default function SessionData() {
  const [images, setImages] = useState([]);
  const [msg, setMsg] = useState({ active: false, text: "", success: "" });
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState();
  const [fileName, setFileName] = useState();
  const [err, setError] = useState();
  const [done, setDone] = useState([]);
  let Newimg = [];

  const HandleChange = (e) => {
    const maxSize = 100 * 1024 * 1024; // 100MB

    if (uploading) {
      return null;
    } else {
      setUploaded(0);
      setUploading(false);
      setFileName(null);
      setError(null);
      const imgFile = Array.from(e.target.files);
      // check file type
      imgFile.forEach((img) => {
        if (
          img.type === "video/mp4" ||
          img.type === "video/3gp" ||
          img.type === "video/webm" ||
          img.type === "video/mkv" ||
          img.type === "video/quicktime"
        ) {
          if (maxSize > img.size) {
            ifSameName(img);
          } else {
            setError(
              `${img.name} is ${parseInt(
                img.size / 1024 / 1024
              )}MB large than max size `
            );
            setTimeout(() => setError(null), 2000);
          }
        } else {
          setError(`${img.name} is invalid`);
          setTimeout(() => setError(null), 2000);
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
      setError(`${img.name} already choose`);
      setTimeout(() => setError(null), 2000);
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
        className="w-full bg-gray-900 text-white py-2 px-3 flex justify-between items-center truncate rounded-lg"
      >
        <span className="w-6/12 truncate">{file.name}</span>
        {uploading || msg.active ? (
          done.includes(i) ? (
            <FaCheckCircle className="bg-white text-green-500 rounded-full" />
          ) : (
            <PulseLoader color="white" size={3} />
          )
        ) : (
          <button
            onClick={() =>
              HandleDeleteFile({ i, images, setImages, setUploaded })
            }
          >
            <FaTrash color="red" />
          </button>
        )}
      </div>
    );
  });

  return (
    <div className="w-full h-full flex justify-center items-center bg-white absolute top-0 left-0 z-30 ">
      <div className="flex flex-col items-center py-5 h-full gap-5 sm:w-11/12 md:w-9/12 lg:w-6/12">
        <h2 className="sm:text-[2rem] md:text-[2.5rem] font-medium capitalize ">
          photo session data
        </h2>
        {err && <span className="text-red-500 text-center"> {err}</span>}
        {/* choose files area */}
        <div
          id="upload-area"
          className="w-full h-2/6 flex flex-col items-center py-4
      justify-center gap-4 bg-[#ddd] relative"
        >
          <MdCloudUpload size={60} />
          <input
            accept=".3gp,.mp4, .webm, .mkv, .mov"
            onChange={uploading ? null : HandleChange}
            type="file"
            multiple
            className={`absolute w-full h-full opacity-0 ${
              uploading ? "cursor-not-allowed" : " cursor-pointer"
            }`}
          />
          <span className="capitalize bg-black text-white  py-2 px-6 ">
            browse files
          </span>
          <span
            className={` sm:text-xs md:text-base text-gray-500 text-center flex items-center md:gap-2 px-2 `}
          >
            Only ( .3gp, .mp4, .webm, .mkv, .mov) format are allowed and max
            size 100MB
          </span>
        </div>
        {/* show files chosen */}
        {images && images.length > 0 && (
          <div
            id="files"
            className="flex flex-col w-full lg:h-[250px] bg-[#ddd] py-2 px-3 overflow-y-scroll"
          >
            <div className="flex flex-col gap-2">{ShowFile}</div>
          </div>
        )}
        {/* upload buttom */}
        {images && images.length > 0 && (
          <div
            id="upload-files"
            className="flex gap-5 items-center w-full justify-center flex-col"
          >
            {fileName && (
              <span className="w-5/12 truncate text-center">{fileName}</span>
            )}
            <Message
              active={msg.active}
              text={msg.text}
              success={msg.success}
            />
            {uploading && (
              <span
                perc={`${uploaded}%`}
                className={`w-10/12 h-3 bg-gray-200 relative rounded-xl 
          before:content-[attr(perc)] before:absolute before:-right-12 before:-top-[5px]`}
              >
                <span
                  style={{ width: `${uploaded}%` }}
                  className={`h-full absolute bg-green-600
                  rounded-xl duration-200 ease-linear `}
                ></span>
              </span>
            )}

            <div className="full gap-2 flex items-center">
              <span id="uploaded-files" className="capitalize text-gray-500">
                {images.length} files chosen
              </span>
              <button
                onClick={
                  uploading
                    ? null
                    : (e) => {
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
                          path: "session-upload",
                        });
                      }
                }
                className={`bg-gray-900 rounded-lg text-lg text-white py-2 px-3 capitalize ${
                  uploading ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                {uploading ? (
                  <div className="flex items-center gap-2">
                    <p>please wait</p>
                    {<PulseLoader color="white" size={7} />}
                  </div>
                ) : (
                  "upload files"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
