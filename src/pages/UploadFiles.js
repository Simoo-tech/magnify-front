import React, { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import axios from "axios";
import { Message } from "../component/Message";
import PulseLoader from "react-spinners/PulseLoader";
export const UploadFiles = () => {
  const [images, setImages] = useState([]);
  const [msg, setMsg] = useState({ active: false, text: "", success: "" });
  const [uploading, setUploading] = useState(false);
  // handle upload
  const HandleChange = (e, i) => {
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
      .post(`${process.env.REACT_APP_API_URL}upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
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
      .catch((err) => console.log(err))
      .finally(() => setUploading(false));
  };

  return (
    <div
      id="upload-files"
      className="section-h flex justify-center items-center relative"
    >
      <Message active={msg.active} text={msg.text} success={msg.success} />
      <div className="container flex flex-col items-center py-5 h-full gap-5">
        <h2 className="text-5xl font-semibold ">Upload Files</h2>
        {/* choose files area */}
        <div
          id="upload-area"
          className="sm:w-full lg:w-6/12 h-2/6 flex flex-col items-center justify-center gap-4 bg-[#ddd] relative"
        >
          <MdCloudUpload size={60} />
          <input
            accept="image/* ,video/* "
            onChange={HandleChange}
            type="file"
            multiple
            className="absolute w-full h-full opacity-0  cursor-pointer"
          />
          <span className="capitalize bg-black text-white  py-2 px-6 ">
            browse files
          </span>
        </div>
        {/* show files chosen */}
        {images && images.length > 0 && (
          <ul
            id="files"
            className="flex flex-col sm:w-full lg:w-6/12 bg-[#ddd] gap-2 py-2 px-3 sm:h-fit lg:h-[250px] overflow-scroll "
          >
            {images.map((file, i) => (
              <li
                key={i}
                id="file"
                className="w-full bg-white py-2 px-3 flex justify-between items-center"
              >
                {file.name}
                <button onClick={() => HandleDelete(i)}>
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
            className="flex gap-5 items-center w-full justify-center"
          >
            <span id="uploaded-files" className="capitalize text-gray-500">
              {images.length} files chosen
            </span>
            <button
              onClick={UploadFiles}
              className="bg-black text-lg text-white py-2 px-3 capitalize"
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
