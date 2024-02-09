import axios from "axios";
import { FaCheck } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";

// get all users
export const GetUsers = async ({ setLoading, setUsers }) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}user`)
    .then((res) => {
      setUsers(res.data);
      setLoading(false);
    })
    .catch((err) => console.log(err));
};

// check if admin
const userID = window.localStorage.getItem("userID");
export const CheckUser = ({ navigate, user }) => {
  if (!user || !user.isAdmin) {
    navigate("/");
  } else if (!user.verified) {
    navigate(`/verify-email/${userID}`);
  }
};

// get user from id
export const GetUser = async ({ cookies, id, setUserData }) => {
  const header = { headers: { token: `${cookies.user_token.token}` } };
  await axios
    .get(`${process.env.REACT_APP_API_URL}user/${id}`, { id: id }, header)
    .then((res) => setUserData(res.data))
    .catch((err) => console.log(err.response.data.message));
};

// handle submit create new user
export const HandleSubmitCreate = async ({
  setLoading,
  data,
  projectInfo,
  cookies,
  setMsg,
}) => {
  setLoading(true);
  await axios
    .post(
      `${process.env.REACT_APP_API_URL}auth/createuser`,
      { ...data, projectInfo: projectInfo },
      {
        headers: { token: `${cookies.user_token.token}` },
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
      }, 2000);
      setTimeout(() => {
        window.location.assign("/");
      }, 2000);
    })
    .catch((err) =>
      setMsg({
        active: true,
        text: err.response.data.message,
        type: "failed",
        icon: MdOutlineError,
      })
    )
    .then(() => {
      setLoading(false);
    });
};

// handle submit edit user
export const HandleSubmitEdit = async ({
  setLoading,
  data,
  projectInfo,
  userData,
  cookies,
  setMsg,
}) => {
  setLoading(true);
  const userNewData = { ...data, projectInfo: projectInfo };
  delete userNewData._id;
  delete userNewData.verified;
  delete userNewData.email;
  delete userNewData.passChanged;
  delete userNewData.isAdmin;
  delete userNewData.createdAt;
  delete userNewData.__v;
  delete userNewData.updatedAt;

  await axios
    .put(
      `${process.env.REACT_APP_API_URL}user/update-data/${userData._id}`,
      { ...userNewData },
      {
        headers: { token: `${cookies.user_token.token}` },
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
      }, 2000);
      setTimeout(() => {
        window.location.assign("/");
      }, 2000);
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
export const HandleDelete = async ({ user, setShowMsg }) => {
  await axios
    .delete(`${process.env.REACT_APP_API_URL}user/${user}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  window.location.reload();
  setShowMsg(false);
};

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
    },
  ]);
};

// handle remove project
export const ProjectRem = ({ i, projectInfo, setProjectInfo }) => {
  const onRemove = [...projectInfo];
  onRemove.splice(i, 1);
  setProjectInfo(onRemove);
};
