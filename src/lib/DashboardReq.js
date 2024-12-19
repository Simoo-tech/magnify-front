import axios from "axios";
import { FaCheck, FaCheckCircle } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
import cookie from "react-cookies";

const userCookies = cookie.load("user_token");
const serverPath = import.meta.env.VITE_APP_API_BASE;

// handle add new project
export const AddProject = ({ setProjectInfo, projectInfo, ownerUser }) => {
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
      projectOwner: ownerUser,
      projectStatus: "done",
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
      let onChange = [...projectInfo];
      const file = new FormData();
      file.append("project-img", img);

      await axios
        .put(`${serverPath}user-project-upload`, file, {
          onUploadProgress: (e) => {
            setUploading(parseInt((e.loaded / e.total) * 100));
          },
          headers: { token: `${userCookies}` },
        })
        .then((res) => {
          onChange[i].projectImg = {
            path: res.data.path,
            name: res.data.name,
          };
          setMsg({
            active: true,
            text: res.data.message,
            type: "success",
            icon: FaCheckCircle,
          });
          setProjectInfo(onChange);
          setUploading();
        })
        .catch((err) => console.log(err))
        .finally(() =>
          setTimeout(() => {
            setMsg({});
          }, 2000)
        );
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
  cleintData,
  setMsg,
}) => {
  setLoading(true);
  const userNewData = { ...data, projectInfo: projectInfo };

  await axios
    .put(
      `${serverPath}client/${cleintData.userName}`,
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

// handle add project acces
export const HandleAddAccess = async ({
  projectOwner,
  projectID,
  accessEmail,
  setMsg,
  setProjectInfo,
}) => {
  await axios
    .post(
      `${serverPath}client/add-access-email`,
      {
        projectOwner,
        email: accessEmail,
        projectID,
      },
      {
        headers: { token: `${userCookies}` },
      }
    )
    .then((res) => {
      setProjectInfo(res.data.userOwner.projectInfo);
      setMsg({
        active: true,
        text: res.data.message,
        type: "success",
        icon: FaCheck,
      });
      setTimeout(() => {
        setMsg({});
      }, 1000);
    })
    .catch((err) => {
      setMsg({
        active: true,
        text: err.response.data.message,
        type: "failed",
        icon: MdOutlineError,
      });
      setTimeout(() => {
        setMsg({});
      }, 2000);
    });
};

// handle remove access email
export const HandleRemoveAccess = async ({
  projectID,
  accessEmail,
  index,
  projectInfo,
  setProjectInfo,
  a,
  setMsg,
}) => {
  await axios
    .post(
      `${serverPath}client/delete-access-email`,
      {
        email: accessEmail,
        projectID,
      },
      {
        headers: { token: `${userCookies}` },
      }
    )
    .then((res) => {
      const onRemove = [...projectInfo];
      onRemove[index]["accessUser"].splice(a, 1);
      setProjectInfo(onRemove);
      setMsg({
        active: true,
        text: res.data.message,
        type: "success",
        icon: FaCheck,
      });
      setTimeout(() => {
        setMsg({});
      }, 1000);
    })
    .catch((err) => console.log(err.response.data.message));
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
