import axios from "axios";
import { FaCheck, FaCheckCircle } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
import cookie from "react-cookies";

const userCookies = cookie.load("user_token");
const serverPath = import.meta.env.VITE_APP_API_BASE;

// handle add new project
export const AddProject = ({ setProjectInfo, projectInfo }) => {
  setProjectInfo([
    ...projectInfo,
    {
      folderName: ``,
      projectNo: "",
      projectName: "",
      projectLoc: "",
      projectArea: "",
      projectHei: "",
      consultant: "",
      projectDura: "",
      projectType: "",
      projectImg: { name: "", path: "" },
      projectOwner: true,
      accessUser: [],
    },
  ]);
};

// handle remove project
export const ProjectRem = ({ index, projectInfo, setProjectInfo }) => {
  const onRemove = [...projectInfo];
  onRemove.splice(index, 1);
  setProjectInfo(onRemove);
};
// handle remove access email
export const emailRemove = async ({
  index,
  projectInfo,
  setProjectInfo,
  a,
}) => {
  // const header = { headers: { token: `${userCookies}` } };
  // console.log(userID);
  // await axios
  //   .delete(`${serverPath}client/delete-access/${userID}`, {
  //     email: email,
  //     headers: { token: `${userCookies}` },
  //   })
  //   .then(() => {
  //     window.location.reload();
  //     setPopUp(false);
  //   })
  //   .catch((err) => console.log(err));
  const onRemove = [...projectInfo];
  onRemove[index]["accessUser"].splice(a, 1);
  setProjectInfo(onRemove);
};

////////// API functions ////////////////

// handle upload image
export const HandleUploadImg = async ({
  e,
  i,
  projectInfo,
  setProjectInfo,
  setMsg,
  setUploading,
}) => {
  const img = e.target.files[0];
  //  check file type
  if (
    img.type === "image/jpg" ||
    img.type === "image/png" ||
    img.type === "image/jpeg" ||
    img.type === "image/webp"
  ) {
    // check file size
    if (img.size < 5000000) {
      const onChange = [...projectInfo];
      const file = new FormData();
      file.append("project-img", img);
      await axios
        .put(`${serverPath}user-project-upload`, file, {
          onUploadProgress: (e) => {
            setUploading(parseInt((e.loaded / e.total) * 100));
            onChange[i].projectImg = {
              path: false,
              name: false,
            };
            setProjectInfo(onChange);
          },
          headers: { token: `${userCookies}` },
        })
        .then((res) => {
          onChange[i].projectImg = {
            path: res.data.path,
            name: res.data.name,
          };
          setProjectInfo(onChange);
          setMsg({
            active: true,
            text: res.data.message,
            type: "success",
            icon: FaCheckCircle,
          });
          setTimeout(() => {
            setMsg({});
            setUploading();
          }, 2000);
        });
    } else {
      setMsg({
        active: true,
        text: `Image size is large than 5MB`,
        type: "failed",
        icon: MdOutlineError,
      });
    }
  } else {
    setMsg({
      active: true,
      text: `Image type (${img.type}) not allowed`,
      type: "failed",
      icon: MdOutlineError,
    });
  }
};
// handle submit create new user
export const HandleSubmitCreate = async ({
  setLoading,
  data,
  projectInfo,
  setMsg,
}) => {
  setLoading(true);
  await axios
    .post(
      `${serverPath}auth/createuser`,
      { ...data, projectInfo: projectInfo },
      {
        headers: { token: `${userCookies}` },
      }
    )
    .then((res) => {
      setMsg({
        active: true,
        text: res.data.message,
        type: "success",
        icon: FaCheckCircle,
      });
      setTimeout(() => {
        setMsg({});
        window.location.assign(`/${userCookies}/dashboard`);
      }, 1000);
    })
    .catch((err) =>
      setMsg({
        active: true,
        text: err.response.data.message,
        type: "failed",
        icon: MdOutlineError,
      })
    )
    .finally(() => {
      setLoading(false);
    });
};

// handle submit edit user
export const HandleSubmitEdit = async ({
  setLoading,
  data,
  projectInfo,
  userData,
  setMsg,
}) => {
  setLoading(true);
  const userNewData = { ...data, projectInfo: projectInfo };
  delete userNewData._id;
  delete userNewData.verifyLink;

  await axios
    .put(
      `${serverPath}client/${userData._id}`,
      { ...userNewData },
      {
        headers: { token: `${userCookies}` },
      }
    )
    .then((res) => {
      setMsg({
        active: true,
        text: res.data.message,
        type: "success",
        icon: FaCheck,
      });
      setTimeout(() => {
        setMsg({});
        window.location.assign(`/${userCookies}/dashboard`);
      }, 1000);
    })
    .catch((err) =>
      setMsg({
        active: true,
        text: err.response.data.message,
        type: "failed",
        icon: MdOutlineError,
      })
    )
    .finally(() => {
      setLoading(false);
    });
};

// delete user
export const HandleDelete = async ({ deleteUser, setPopUp }) => {
  const header = { headers: { token: `${userCookies}` } };
  await axios
    .delete(`${serverPath}client/${deleteUser._id}`, header)
    .then(() => {
      window.location.reload();
      setPopUp(false);
    })
    .catch((err) => console.log(err));
};
