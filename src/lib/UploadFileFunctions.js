import axios from "axios";
import { FaCheck } from "react-icons/fa";

const serverPath = import.meta.env.VITE_APP_API_BASE;

// send files
export const UploadFiles = async ({
  setUploading,
  setFileName,
  setUploaded,
  images,
  setMsg,
  msg,
  setImages,
  setDone,
  path,
}) => {
  setUploading(true);
  const formData = new FormData();
  for (const file of images) {
    formData.append("file", file);
    setFileName(file.name);
    await axios
      .post(`${serverPath}${path}`, formData, {
        onUploadProgress: (e) => {
          setUploaded(parseInt((e.loaded / e.total) * 100));
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setDone((prev) => [...prev, images.indexOf(file)]);
        // if all images finish
        if (images.lastIndexOf(file) + 1 === images.length) {
          setMsg({
            active: true,
            text: `${res.data.message}`,
            type: "success",
            icon: FaCheck,
          });
          setUploading(false);
          setFileName();
          setTimeout(() => {
            setMsg({
              active: false,
              text: res.data.message,
              type: "success",
              icon: FaCheck,
            });
            setImages([]);
            setDone([]);
          }, 2000);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {});
  }
};

// handle delete file
export const HandleDeleteFile = ({ i, images, setImages, setUploaded }) => {
  const onDelete = [...images];
  onDelete.splice(i, 1);
  setImages(onDelete);
  setUploaded(0);
};
