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
  projectName,
  setImages,
  setDone,
  path,
  setProjectName,
}) => {
  setUploading(true);
  const formData = new FormData();
  for (const file of images) {
    formData.append("file", file);
    formData.append("project_name", projectName);
    setFileName(file.name);
    await axios
      .post(`${serverPath}upload-files/${path}`, formData, {
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
            setProjectName("");
          }, 2000);
        }
      })
      .catch((err) => console.log(err));
  }
};

// handle delete file
export const HandleDeleteFile = ({ i, images, setImages, setUploaded }) => {
  const onDelete = [...images];
  onDelete.splice(i, 1);
  setImages(onDelete);
  setUploaded(0);
};
