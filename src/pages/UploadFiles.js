import React, { useEffect, useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { Message } from "../component/Message";
import PulseLoader from "react-spinners/PulseLoader";
import imgae from "../assest/sessionData.webp";
import { Link, Outlet } from "react-router-dom";
import { Header } from "../component/Header";

export const UploadFiles = () => {
  const [uploadType, setUploadType] = useState();
  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);
  return (
    <>
      <Header />
      <div
        id="upload-files"
        className="section-h w-full items-center flex justify-center relative"
      >
        <div
          id="choose-upload-Type"
          className={`${
            uploadType && "hidden"
          } absolute top-0 w-full h-full flex  bg-white z-10 bg-no-repeat bg-cover bg-center
        before:absolute before:top-0 before:left-0 before:bg-black before:w-full 
        before:h-full before:opacity-70`}
          style={{ backgroundImage: `url(${imgae})` }}
        >
          <div className="sm:text-xl lg:text-3xl w-full h-full sm:flex-col md:flex-row flex justify-between items-center z-20">
            <Link
              to={"session-data"}
              className="SessionData sm:w-full md:w-6/12 hover:scale-125 duration-150 h-full flex justify-center items-center"
            >
              <h2 className=" capitalize font-light text-white ">
                photo session data
              </h2>
            </Link>
            <span
              className={`sm:w-[97%] sm:h-[1px] md:w-[1px] md:h-[97%] rounded-xl bg-color1`}
            ></span>
            <Link
              to={"missing-photo"}
              className="MissingPhoto sm:w-full md:w-6/12 hover:scale-125 duration-150 h-full flex justify-center items-center"
            >
              <h2 className=" capitalize font-light text-white ">
                Missing Photo
              </h2>
            </Link>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export const SessionData = () => {
  const [images, setImages] = useState([]);
  const [msg, setMsg] = useState({ active: false, text: "", success: "" });
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState();
  const [fileName, setFileName] = useState();
  const [err, setError] = useState();
  const [done, setDone] = useState([]);
  let Newimg = new Array();

  const HandleChange = (e) => {
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (uploading) {
      return null;
    } else {
      setUploaded(0);
      setUploading(false);
      setFileName(null);
      const imgFile = Array.from(e.target.files);
      imgFile.map((img) => {
        if (
          img.type === "video/mp4" ||
          img.type === "video/3gp" ||
          img.type === "video/webm" ||
          img.type === "video/mkv"
        ) {
          if (maxSize > img.size) {
            Newimg = [...Newimg, img];
            setImages([...images, ...Newimg]);
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

  // handle delete file
  const HandleDelete = (i) => {
    const onDelete = [...images];
    onDelete.splice(i, 1);
    setImages(onDelete);
    setUploaded(0);
  };
  // handle submit
  const UploadFiles = async (e) => {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData();
    let fileDone = new Array();
    for (const file of images) {
      formData.append("file", file);
      setFileName(file.name);
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
          fileDone = [...fileDone, images.indexOf(file)];
          setDone(fileDone);
          // if all fininsh
          if (images.lastIndexOf(file) + 1 === images.length) {
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
              setImages([]);
              setDone([]);
              setUploading(false);
            }, 1000);
          }
        })
        .catch(() => console.log("Error"))
        .finally(() => {});
    }
  };

  return (
    <>
      <Header />
      <div className="w-full h-full z-20 flex justify-center items-center bg-white absolute">
        <Message active={msg.active} text={msg.text} success={msg.success} />
        <div className="container flex flex-col items-center py-5 h-full gap-5  sm:w-full lg:w-8/12">
          <h2 className="sm:text-3xl lg:text-4xl font-medium capitalize ">
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
              className={` sm:text-xs md:text-base text-gray-500 text-center flex items-center md:gap-2 px-2 `}
            >
              Only ( .3gp, .mp4, .webm, .mkv) format are allowed and max size
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
                    <span className="w-6/12 truncate">{file.name}</span>
                    {uploading ? (
                      done.includes(i) ? (
                        <FaCheckCircle className="bg-white text-green-500 rounded-full" />
                      ) : (
                        <PulseLoader color="white" size={3} />
                      )
                    ) : (
                      <button onClick={() => HandleDelete(i)}>
                        <FaTrash color="red" />
                      </button>
                    )}
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
              {fileName && (
                <span className="w-7/12 truncate text-center">{fileName}</span>
              )}
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
                  onClick={uploading ? null : UploadFiles}
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
    </>
  );
};

export const MissingPhoto = () => {
  const [images, setImages] = useState([]);
  const [msg, setMsg] = useState({ active: false, text: "", success: "" });
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState();
  const [fileName, setFileName] = useState();
  const [err, setError] = useState();
  const [done, setDone] = useState([]);
  let Newimg = new Array();

  const HandleChange = (e) => {
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (uploading) {
      return null;
    } else {
      setError(null);
      setUploaded(0);
      setUploading(false);
      setFileName(null);
      const imgFile = Array.from(e.target.files);
      imgFile.map((img) => {
        if (
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
            Newimg = [...Newimg, img];
            setImages([...images, ...Newimg]);
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

  // handle delete file
  const HandleDelete = (i) => {
    const onDelete = [...images];
    onDelete.splice(i, 1);
    setImages(onDelete);
    setUploaded(0);
    setFileName(null);
    setError(null);
  };
  // handle submit
  const UploadFiles = async (e) => {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData();
    let fileDone = new Array();
    for (const file of images) {
      formData.append("file", file);
      setFileName(file.name);
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
          fileDone = [...fileDone, images.indexOf(file)];
          setDone(fileDone);
          // if all fininsh
          if (images.lastIndexOf(file) + 1 === images.length) {
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
              setDone([]);
              setImages([]);
              setUploading(false);
            }, 2000);
          }
        })
        .catch(() => console.log("Error"))
        .finally(() => {});
    }
  };
  return (
    <div className="w-full h-full z-20 flex justify-center items-center bg-white absolute">
      <Message active={msg.active} text={msg.text} success={msg.success} />
      <div className="container flex flex-col items-center py-5 h-full gap-5 sm:w-full lg:w-8/12">
        <h2 className="sm:text-3xl lg:text-4xl font-medium capitalize ">
          missing photos
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
            className={` sm:text-xs md:text-base text-gray-500 text-center flex items-center md:gap-2 px-2 `}
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
                  <span className="w-6/12 truncate">{file.name}</span>
                  {uploading ? (
                    done.includes(i) ? (
                      <FaCheckCircle className="bg-white text-green-500 rounded-full" />
                    ) : (
                      <PulseLoader color="white" size={2} />
                    )
                  ) : (
                    <button onClick={() => HandleDelete(i)}>
                      <FaTrash color="red" />
                    </button>
                  )}
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
            {fileName && (
              <span className="w-7/12 truncate text-center">{fileName}</span>
            )}
            {uploading && (
              <span
                perc={`${uploaded}%`}
                done={<FaCheckCircle />}
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
                onClick={uploading ? null : UploadFiles}
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
};
