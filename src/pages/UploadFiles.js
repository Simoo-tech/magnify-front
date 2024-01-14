import React, { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import axios from "axios";
import { Message } from "../component/Message";
import PulseLoader from "react-spinners/PulseLoader";
import imgae from "../assest/sessionData.webp";
export const UploadFiles = () => {
  const [uploadType, setUploadType] = useState();

  return (
    <div id="upload-files" className="section-h flex justify-center relative">
      <div
        id="choose-upload-Type"
        className={`${
          uploadType && "hidden"
        } absolute top-0 w-full h-full flex  bg-white z-50 bg-no-repeat bg-cover bg-center
        before:absolute before:top-0 before:left-0 before:bg-black before:w-full 
        before:h-full before:opacity-70`}
        style={{ backgroundImage: `url(${imgae})` }}
      >
        <div className="sm:text-xl lg:text-3xl w-full h-full sm:flex-col md:flex-row flex justify-between items-center z-20">
          <button
            onClick={() => setUploadType("SessionData")}
            className="SessionData sm:w-full md:w-6/12 hover:scale-125 duration-150 h-full"
          >
            <h2 className=" capitalize font-light text-white ">
              photo session data
            </h2>
          </button>
          <span
            className={`sm:w-[97%] sm:h-1 md:w-1 md:h-[97%] rounded-xl bg-color1`}
          ></span>
          <button
            onClick={() => setUploadType("MissingPhoto")}
            className="MissingPhoto sm:w-full md:w-6/12 hover:scale-125 duration-150 h-full"
          >
            <h2 className=" capitalize font-light text-white ">
              Missing Photo
            </h2>
          </button>
        </div>
      </div>
      <div className="container justify-between items-start flex flex-row-reverse">
        <div className="flex w-full h-full justify-center ">
          {uploadType === "MissingPhoto" && <MissingPhoto />}
          {uploadType === "SessionData" && <SessionData />}
        </div>
      </div>
    </div>
  );
};

const SessionData = () => {
  const [images, setImages] = useState([]);
  const [msg, setMsg] = useState({ active: false, text: "", success: "" });
  const [err, setErr] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState();

  // handle upload
  const HandleChange = (e, i) => {
    setErr(false);
    const imgFile = Array.from(e.target.files);
    if (images.length > 0) {
      const newImg = [...images, ...imgFile];
      setImages(newImg);
    } else {
      setImages(imgFile);
    }
  };
  // handle delete file
  const HandleDelete = (i) => {
    setErr(false);
    const onDelete = [...images];
    onDelete.splice(i, 1);
    setImages(onDelete);
    setErr(false);
    setUploaded(0);
  };
  // handle submit
  const UploadFiles = async (e) => {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData();
    for (const file of images) {
      if (
        file.type === "video/mp4" ||
        file.type === "video/3gp" ||
        file.type === "video/webm" ||
        file.type === "video/mkv"
      ) {
        formData.append("file", file);
        await axios
          .post(`${process.env.REACT_APP_API_URL}session-upload`, formData, {
            onUploadProgress: (e) => {
              setUploaded(parseInt((e.loaded / e.total) * 100));
            },
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            setMsg({
              ...msg,
              active: true,
              text: res.data.message,
              success: true,
            });
            setTimeout(() => {
              setMsg({
                ...msg,
                active: false,
                text: res.data.message,
                success: true,
              });
              window.location.reload();
            }, 2000);
          })
          .catch((err) => setErr(true))
          .finally(() => setUploading(false));
      } else {
        setErr(true);
        setUploading(false);
      }
    }
  };
  return (
    <>
      <Message active={msg.active} text={msg.text} success={msg.success} />
      <div className="container flex flex-col items-center py-5 h-full gap-5 sm:w-full lg:w-8/12">
        <h2 className="sm:text-3xl lg:text-4xl font-medium capitalize ">
          photo session data
        </h2>
        {/* choose files area */}
        <div
          id="upload-area"
          className="w-full h-2/6 flex flex-col items-center py-4
      justify-center gap-4 bg-[#ddd] relative "
        >
          <MdCloudUpload size={60} />
          <input
            accept=".3gp,.mp4, .webm, .mkv"
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
            className={`${
              err && "text-red-600 "
            } sm:text-xs md:text-base text-gray-500 text-center flex items-center md:gap-2 px-2 `}
          >
            Only ( .3gp,.mp4, .webm, .mkv ) format are allowed and max size
            100MB
          </span>
        </div>
        {/* show files chosen */}
        {images && images.length > 0 && (
          <div
            id="files"
            className="flex flex-col w-full lg:h-[250px] bg-[#ddd] py-2 px-3 overflow-y-scroll"
          >
            <div className="flex flex-col gap-2">
              {images.map((file, i) => (
                <div
                  key={i}
                  id="file"
                  className="w-full bg-gray-900 text-white py-2 px-3 flex justify-between items-center truncate rounded-lg"
                >
                  <span className="w-10/12 truncate">{file.name}</span>
                  <button
                    className={`${
                      uploading ? "cursor-not-allowed" : "cursor-pointer"
                    } `}
                    onClick={
                      uploading
                        ? null
                        : () => {
                            HandleDelete(i);
                          }
                    }
                  >
                    <FaTrash color="red" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* upload buttom */}
        {images && images.length > 0 && (
          <div
            id="upload-files"
            className="flex gap-5 items-center w-full justify-center flex-col"
          >
            {uploaded > 1 && (
              <span
                perc={`${err ? "FAILED" : `${uploaded - 1}%`}`}
                className={`w-10/12 h-3 bg-gray-200 relative rounded-xl 
          before:content-[attr(perc)] before:absolute ${
            err ? "before:-right-16" : "before:-right-10"
          } before:-top-[5px]`}
              >
                <span
                  style={{ width: `${uploaded - 1}%` }}
                  className={`h-full absolute  ${
                    err ? "bg-red-500" : "bg-green-600"
                  } rounded-xl duration-200 ease-linear `}
                ></span>
              </span>
            )}
            <div className="full gap-2 flex items-center">
              <span id="uploaded-files" className="capitalize text-gray-500">
                {images.length} files chosen
              </span>
              <button
                onClick={uploading ? null : UploadFiles}
                className={`bg-black text-lg text-white py-2 px-3 capitalize ${
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
    </>
  );
};

const MissingPhoto = () => {
  const [images, setImages] = useState([]);
  const [msg, setMsg] = useState({ active: false, text: "", success: "" });
  const [err, setErr] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState();
  // handle upload
  const HandleChange = (e, i) => {
    setErr(false);
    const imgFile = Array.from(e.target.files);
    if (images.length > 0) {
      const newImg = [...images, ...imgFile];
      setImages(newImg);
    } else {
      setImages(imgFile);
    }
  };
  // handle delete file
  const HandleDelete = (i) => {
    setErr(false);
    const onDelete = [...images];
    onDelete.splice(i, 1);
    setImages(onDelete);
    setErr(false);
    setUploaded(0);
  };
  // handle submit
  const UploadFiles = async (e) => {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData();
    for (const file of images) {
      if (
        file.type === "video/mp4" ||
        file.type === "video/3gp" ||
        file.type === "video/webm" ||
        file.type === "video/mkv" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/webp"
      ) {
        formData.append("file", file);
        await axios
          .post(`${process.env.REACT_APP_API_URL}missing-upload`, formData, {
            onUploadProgress: (e) => {
              setUploaded(parseInt((e.loaded / e.total) * 100));
            },
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            setMsg({
              ...msg,
              active: true,
              text: res.data.message,
              success: true,
            });
            setTimeout(() => {
              setMsg({
                ...msg,
                active: false,
                text: res.data.message,
                success: true,
              });
              window.location.reload();
            }, 2000);
          })
          .catch((err) => setErr(true))
          .finally(() => setUploading(false));
      } else {
        setErr(true);
        setUploading(false);
      }
    }
  };
  return (
    <>
      <Message active={msg.active} text={msg.text} success={msg.success} />
      <div className="container flex flex-col items-center py-5 h-full gap-5 sm:w-full lg:w-8/12">
        <h2 className="sm:text-3xl lg:text-4xl font-medium capitalize ">
          missing photos
        </h2>
        {/* choose files area */}
        <div
          id="upload-area"
          className="w-full h-2/6 flex flex-col items-center py-4
      justify-center gap-4 bg-[#ddd] relative"
        >
          <MdCloudUpload size={60} />
          <input
            accept=".3gp,.mp4, .webm, .mkv, .jpg, .jpeg, .png, .webp"
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
            className={`${
              err && "text-red-600 "
            } sm:text-xs md:text-base text-gray-500 text-center flex items-center md:gap-2 px-2 `}
          >
            Only ( .3gp, .mp4, .webm, .mkv, .jpg, .jpeg, .png, .webp ) format
            are allowed and max size 100MB
          </span>
        </div>
        {/* show files chosen */}
        {images && images.length > 0 && (
          <div
            id="files"
            className="flex flex-col w-full lg:h-[250px] bg-[#ddd] py-2 px-3 overflow-y-scroll"
          >
            <div className="flex flex-col gap-2">
              {images.map((file, i) => (
                <div
                  key={i}
                  id="file"
                  className="w-full bg-gray-900 text-white py-2 px-3 flex justify-between items-center truncate rounded-lg"
                >
                  <span className="w-10/12 truncate">{file.name}</span>
                  <button
                    className={`${
                      uploading ? "cursor-not-allowed" : "cursor-pointer"
                    } `}
                    onClick={
                      uploading
                        ? null
                        : () => {
                            HandleDelete(i);
                          }
                    }
                  >
                    <FaTrash color="red" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* upload buttom */}
        {images && images.length > 0 && (
          <div
            id="upload-files"
            className="flex gap-5 items-center w-full justify-center flex-col"
          >
            {uploaded > 1 && (
              <span
                perc={`${err ? "FAILED" : `${uploaded - 1}%`}`}
                className={`w-10/12 h-3 bg-gray-200 relative rounded-xl 
          before:content-[attr(perc)] before:absolute ${
            err ? "before:-right-16" : "before:-right-10"
          } before:-top-[5px]`}
              >
                <span
                  style={{ width: `${uploaded - 1}%` }}
                  className={`h-full absolute  ${
                    err ? "bg-red-500" : "bg-green-600"
                  } rounded-xl duration-200 ease-linear `}
                ></span>
              </span>
            )}
            <div className="full gap-2 flex items-center">
              <span id="uploaded-files" className="capitalize text-gray-500">
                {images.length} files chosen
              </span>
              <button
                onClick={uploading ? null : UploadFiles}
                className={`bg-black text-lg text-white py-2 px-3 capitalize ${
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
    </>
  );
};
