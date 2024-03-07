import axios from "axios";
import { FaCheck } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";

const userID = window.localStorage.getItem("userID");

// check if admin
export const CheckUser = ({ navigate, user }) => {
  if (!user || !user.isAdmin) {
    navigate("/");
  } else if (!user.verified) {
    navigate(`/verify-email/${userID}`);
  }
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

////////// API functions ////////////////

// handle submit create new user
export const HandleSubmitCreate = async ({
  setLoading,
  data,
  projectInfo,
  cookies,
  setMsg,
  navigate,
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
        navigate(-1, { reload: true });
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
  cookies,
  setMsg,
  navigate,
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
        navigate(-1, { reload: true });
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
export const HandleDelete = async ({ user, setShowMsg }) => {
  await axios
    .delete(`${process.env.REACT_APP_API_URL}user/${user}`)
    .then(() => {
      window.location.reload();
      setShowMsg(false);
    })
    .catch((err) => console.log(err));
  console.log(user);
};

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

// get user from id
export const GetUser = async ({ cookies, id, setUserData }) => {
  const header = { headers: { token: `${cookies.user_token.token}` } };
  await axios
    .get(`${process.env.REACT_APP_API_URL}user/${id}`, { id: id }, header)
    .then((res) => setUserData(res.data))
    .catch((err) => console.log(err.response.data.message));
};
