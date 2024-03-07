import axios from "axios";

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
      .post(`${process.env.REACT_APP_API_URL}${path}`, formData, {
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
            ...msg,
            active: true,
            text: res.data.message,
            success: true,
          });
          setUploading(false);
          setFileName();
          setTimeout(() => {
            setMsg({
              ...msg,
              active: false,
              text: res.data.message,
              success: true,
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
