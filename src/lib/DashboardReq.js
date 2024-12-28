import axios from "axios";
import { FaCheck, FaCheckCircle } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
import cookie from "react-cookies";
import { replace } from "react-router-dom";

const userCookies = cookie.load("user_token");
const serverPath = import.meta.env.VITE_APP_API_BASE;

// handle add new project
const AddProject = async ({
  values,
  setProjectInfo,
  projectInfo,
  ownerUser,
  setAddLoading,
  setMsg,
}) => {
  setAddLoading(true);
  await axios
    .put(`${serverPath}client/${values.userName}`, values, {
      headers: { token: `${userCookies}` },
    })
    .then((res) => {
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
      setAddLoading(false);
    });
};

// handle remove project
const ProjectRem = ({ index, projectInfo, setProjectInfo }) => {
  const onRemove = [...projectInfo];
  onRemove.splice(index, 1);
  setProjectInfo(onRemove);
};

////////// API functions ////////////////

// handle upload image
const HandleUploadImg = async ({
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
const HandleSubmitCreate = async ({
  setLoading,
  values,
  setMsg,
  projectData,
  navigate,
}) => {
  setLoading(true);
  await axios
    .post(
      `${serverPath}auth/createuser`,
      { ...values, projectData },
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
        navigate(`/${userCookies}/dashboard/${res.data.userName}/edit-user`, {
          replace: true,
        });
      }, 500);
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
const HandleSubmitEdit = async ({
  setLoading,
  values,
  setMsg,
  projectData,
  setProjectInfo,
}) => {
  setLoading(true);

  await axios
    .put(
      `${serverPath}client/${values.userName}`,
      { ...values, projectData },
      {
        headers: { token: `${userCookies}` },
      }
    )
    .then((res) => {
      setProjectInfo(res.data.client.projectData);
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
const HandleAddAccess = async ({
  projectID,
  accessEmail,
  projectOwner,
  setMsg,
  setProjectInfo,
  projectInfo,
  index,
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
      const updated = [...projectInfo];
      updated[index].accessUser = res.data.accessUser;
      setProjectInfo(updated);

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
const HandleRemoveAccess = async ({
  projectID,
  accessEmail,
  index,
  projectInfo,
  setProjectInfo,
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
      const updated = [...projectInfo];
      updated[index].accessUser = res.data.accessUser;
      setProjectInfo(updated);
      console.log(res.data);

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
const HandleDelete = async ({ deleteUser, setPopUp }) => {
  const header = { headers: { token: `${userCookies}` } };
  await axios
    .delete(`${serverPath}client/${deleteUser._id}`, header)
    .then(() => {
      window.location.reload();
      setPopUp(false);
    })
    .catch((err) => console.log(err));
};

export {
  AddProject,
  ProjectRem,
  HandleUploadImg,
  HandleSubmitCreate,
  HandleSubmitEdit,
  HandleAddAccess,
  HandleRemoveAccess,
  HandleDelete,
};
