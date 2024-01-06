import React, { useState } from "react";
import { MdCloudUpload, MdOutlineError } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import axios from "axios";
import { Message } from "../component/Message";
import PulseLoader from "react-spinners/PulseLoader";

export const UploadFiles = () => {
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
  };
  // handle submit
  const UploadFiles = async (e) => {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData();
    for (const file of images) {
      formData.append("file", file);
    }
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}upload
      `,
        formData,
        {
          onUploadProgress: (e) => {
            setUploaded(parseInt((e.loaded / e.total) * 100));
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setMsg({ ...msg, active: true, text: res.data.message, success: true });
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
  };
  console.log(uploaded);
  return (
    <div
      id="upload-files"
      className="section-h flex justify-center items-center relative"
    >
      <Message active={msg.active} text={msg.text} success={msg.success} />
      <div className="container flex flex-col items-center py-5 h-full gap-5">
        <h2 className="sm:text-3xl lg:text-5xl font-semibold ">Upload Files</h2>
        {/* choose files area */}
        <div
          id="upload-area"
          className="sm:w-full lg:w-9/12 xl:w-6/12 h-2/6 flex flex-col items-center py-4
          justify-center gap-4 bg-[#ddd] relative"
        >
          <MdCloudUpload size={60} />
          <input
            accept="image/* ,video/* "
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
            } sm:text-xs md:text-base text-gray-500 text-center flex items-center md:gap-2 sm:px-2 md:px-0 `}
          >
            {err && <MdOutlineError className="sm:hidden md:block" />}
            Only ( .png .jpeg .jpg .mp4 .webp ) format are allowed and max size
            100MB
          </span>
        </div>
        {/* show files chosen */}
        {images && images.length > 0 && (
          <ul
            id="files"
            className="flex flex-col sm:w-full lg:h-[250px] lg:w-9/12 xl:w-6/12 bg-[#ddd] gap-2 py-2 px-3 overflow-y-scroll "
          >
            {images.map((file, i) => (
              <li
                key={i}
                id="file"
                className="w-full bg-gray-900 text-white py-4 px-3 flex justify-between items-center truncate h-fit rounded-lg"
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
              </li>
            ))}
          </ul>
        )}
        {/* upload buttom */}
        {images && images.length > 0 && (
          <div
            id="upload-files"
            className="flex gap-5 items-center w-full justify-center flex-wrap sm:w-11/12
            lg:w-9/12 xl:w-5/12"
          >
            {uploaded > 1 && (
              <span
                perc={`${uploaded - 1}%`}
                className={`w-10/12 h-3 bg-gray-200 relative rounded-xl 
              before:content-[attr(perc)] before:absolute before:-right-11 before:-top-[5px]`}
              >
                <span
                  style={{ width: `${uploaded - 1}%` }}
                  className={`h-full absolute bg-green-600 rounded-xl duration-200 ease-linear `}
                ></span>
              </span>
            )}
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
        )}
      </div>
    </div>
  );
};
