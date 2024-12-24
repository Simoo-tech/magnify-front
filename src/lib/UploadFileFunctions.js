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
  path,
  setProjectName,
}) => {
  setUploading(true);
  const formData = new FormData();

  // Append all files to FormData
  images.forEach((file) => {
    formData.append("file", file);
  });

  // Add project name to FormData
  formData.append("project_name", projectName);

  try {
    // Send the files in a single request
    const response = await axios.post(
      `${serverPath}upload-files/${path}`,
      formData,
      {
        onUploadProgress: (e) => {
          setUploaded(parseInt((e.loaded / e.total) * 100));
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // If upload is successful, handle the response
    setMsg({
      active: true,
      text: `${response.data.message}`,
      type: "success",
      icon: FaCheck,
    });

    setUploading(false);

    setFileName("");
    setProjectName("");
    setTimeout(() => {
      setUploaded(0);
      setMsg({
        active: false,
        text: response.data.message,
        type: "success",
        icon: FaCheck,
      });
      setImages([]);
    }, 2000);
  } catch (err) {
    setUploaded(0);
    setUploading(false);
    setMsg({
      active: true,
      text: "Failed to upload files.",
      type: "failed",
      icon: MdOutlineError,
    });
  }
};

// handle delete file
export const HandleDeleteFile = ({ i, images, setImages, setUploaded }) => {
  const onDelete = [...images];
  onDelete.splice(i, 1);
  setImages(onDelete);
  setUploaded(0);
};
