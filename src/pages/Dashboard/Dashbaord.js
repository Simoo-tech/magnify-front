import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import axios from "axios";
import { LanguageCon } from "../../Context";
import { useCookies } from "react-cookie";
import conimage from "../../assest/building.webp";
import { Oval } from "react-loader-spinner";
import { FaCheck } from "react-icons/fa";
import { MdAdd, MdOutlineError, MdEdit, MdDelete } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaTrash } from "react-icons/fa6";
import "../../App.css";
import { QR } from "../../component/Qr";
import { DeleteMsg } from "../../component/DeleteMsg";
import { Header } from "../../component/Header";
import { load } from "react-cookies";

export const Dashbaord = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [showMsg, setShowMsg] = useState(false);
  const [deleteUser, setDeleteUser] = useState();
  // context
  const { lang } = useContext(LanguageCon);
  // get all users
  const GetUsers = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}user`)
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const navigate = useNavigate();

  // user cookies
  const [cookies] = useCookies(["user_token"]);

  // get and check user id
  const userID = window.localStorage.getItem("userID");
  const user = cookies.user_token;

  // check if admin
  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/");
    } else if (!user.verified) {
      navigate(`/verify-email/${userID}`);
    }
    GetUsers();
  }, []);

  // delete user
  const DeleteUserMsg = () => {
    setShowMsg(!showMsg);
  };
  // download report
  // const DownloadReport = async (e) => {
  //   e.preventDefault();
  //   await axios
  //     .get("http://localhost:8000/api/report")
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };

  return (
    <>
      <Header />
      <DeleteMsg
        showMsg={showMsg}
        setShowMsg={setShowMsg}
        message={`${user.fname}`}
        user={deleteUser}
      />
      <div className="section-h container max-w-[97%] relative w-full py-5 flex justify-center">
        <div className=" w-full h-full flex flex-col gap-5 items-center">
          <div className="tools flex justify-between w-full items-center">
            <h3
              id="user-welcome"
              className={`${
                lang === "ar" && "flex-row-reverse"
              } flex sm:text-lg md:text-3xl text-white capitalize gap-2 font-bold`}
            >
              {lang === "ar" ? " ,مرحبا" : "Hello, "}
              <span>{user.fname}</span>
            </h3>
            <div className="flex gap-3 items-center">
              {/* <button
        id="download-report"
        onClick={DownloadReport}
        className={`${
          lang === "ar" && "flex-row-reverse"
        } flex py-2 sm:px-2 md:px-6 rounded-lg items-center gap-2 bg-white `}
      >
        {lang === "ar" ? "تحميل تقرير" : "Download Report"}
        <TbReportSearch size={20} />
      </button> */}
              <button
                id="create-user"
                onClick={() => navigate("create-user")}
                className={`${
                  lang === "ar" && "flex-row-reverse"
                } flex py-2 sm:px-2 md:px-6 rounded-lg items-center gap-2 bg-white `}
              >
                {lang === "ar" ? "انشاء مستخدم" : "Create new user"}
                <AiOutlineUserAdd size={20} />
              </button>
            </div>
          </div>
          <div
            id="users-table"
            className={`w-full h-full flex justify-center ${
              loading ? "items-center" : "items-start"
            } overflow-scroll`}
          >
            {loading ? (
              <Oval />
            ) : (
              <table id="users" className="w-full h-fit ">
                <thead className="bg-darkGrey text-white border-2 border-[#c9c9c9]  ">
                  <tr>
                    <th className="sm:text-sm lg:text-lg text-start py-2 px-2 w-2/12 font-normal">
                      {lang === "ar" ? "الاسم" : "Name"}
                    </th>
                    <th className="sm:text-sm lg:text-lg text-start border-2 border-[#c9c9c9] py-2 px-2 w-3/12 font-normal">
                      {lang === "ar" ? "الايميل" : "Email"}
                    </th>
                    <th className="sm:text-sm lg:text-lg text-start border-2 border-[#c9c9c9] py-2 px-2 w-2/12 font-normal">
                      {lang === "ar" ? "رقم الهاتف" : "  Phone No"}
                    </th>
                    <th className="sm:text-sm lg:text-lg text-start border-2 border-[#c9c9c9] py-2 px-2 w-1/12 font-normal">
                      {lang === "ar" ? "عدد المشاريع" : "No of projects"}
                    </th>
                    <th className="sm:text-sm lg:text-lg text-start py-2 px-2 w-1/12 font-normal"></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr className="bg-white border-2 " key={user._id}>
                      <td
                        className="sm:text-sm lg:text-lg border-2 py-2 px-2 capitalize"
                        id="name"
                      >
                        {user.fname + " " + user.lname}
                      </td>
                      <td
                        className="sm:text-sm lg:text-lg border-2 py-2 px-2 truncate"
                        id="email"
                      >
                        {user.email}
                      </td>
                      <td
                        className="sm:text-sm lg:text-lg border-2 py-2 px-2 truncate"
                        id="email"
                      >
                        +{user.phone}
                      </td>
                      <td
                        className="sm:text-sm lg:text-lg border-2 py-2 px-2 text-center"
                        id="projects"
                      >
                        {user.projectInfo.length}
                      </td>
                      <td className="py-2 px-3 flex items-center gap-8 justify-center">
                        <span className="text-center text-xs flex flex-col items-center text-gray-600">
                          <MdEdit
                            onClick={() => navigate(`${user._id}/edit-user`)}
                            id="edit-user"
                            size={23}
                            color="blue"
                          />
                          {lang === "ar" ? "تعديل" : "Edit"}
                        </span>
                        <span className="text-center text-xs flex flex-col items-center text-gray-600">
                          <button
                            onClick={() => {
                              DeleteUserMsg(user);
                              setDeleteUser(user._id);
                            }}
                          >
                            <MdDelete id="delete-user" size={23} color="red" />
                          </button>
                          {lang === "ar" ? "حذف" : "Delete"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <Outlet />
        </div>
        {user && <QR />}
      </div>
    </>
  );
};

// search user by email
export const EditUser = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  // user cookies
  const [cookies] = useCookies(["user_token"]);
  const GetUser = async () => {
    const header = { headers: { token: `${cookies.user_token.token}` } };
    await axios
      .get(`${process.env.REACT_APP_API_URL}user/${id}`, { id: id }, header)
      .then((res) => setUserData(res.data))
      .catch((err) => console.log(err.response.data.message));
  };
  useEffect(() => {
    GetUser();
  }, []);

  return (
    <div
      className={`w-full bg-color1 absolute flex pt-5 justify-center items-center left-0 bg-cover sm:flex-col h-full top-0`}
    >
      <CreateUser userData={userData} setUserData={setUserData} />
    </div>
  );
};

// create new user
export const CreateUser = ({ userData }) => {
  const [data, setData] = useState({});
  const [projectInfo, setProjectInfo] = useState([]);
  // animation
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    if (userData) {
      setData(userData);
      setProjectInfo(userData.projectInfo);
    }
    setAnimation(true);
  }, [userData]);

  // handle message from api
  const [msg, setMsg] = useState({});

  // user cookies
  const [cookies] = useCookies(["user_token"]);

  // context
  const { lang } = useContext(LanguageCon);
  // handle submit create new user
  const HandleSubmitCreate = async (e) => {
    e.preventDefault();
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
  const HandleSubmitEdit = async (e) => {
    e.preventDefault();
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

  // handle change user data
  const HandleChangeUser = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  // handle change project
  const HandleChangeProject = (e, i) => {
    const { name, value } = e.target;
    const onChange = [...projectInfo];
    onChange[i][name] = value;
    setProjectInfo(onChange);
    setMsg({ active: false });
  };
  // handle add new project
  const AddProject = () => {
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
  const ProjectRem = (i) => {
    const onRemove = [...projectInfo];
    onRemove.splice(i, 1);
    setProjectInfo(onRemove);
  };
  // loading spinner
  const [loading, setLoading] = useState(false);
  return (
    <div
      className={`create-user w-full absolute flex justify-center items-center pt-5 
      sm:flex-col h-full   ${
        animation ? "top-0" : "top-96"
      } left-0 duration-200 ease-linear bg-cover before:bg-color1 bg-center
      before:w-full before:h-full before:absolute before:top-0 before:opacity-[87%]`}
      style={{ backgroundImage: `url('${conimage}')` }}
    >
      {msg.active && (
        <span
          className={`fixed top-16 ${
            msg.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white text-xl z-40 py-3 px-7 flex items-center justify-center gap-5 `}
        >
          <msg.icon /> {msg.text}
        </span>
      )}
      <div className="w-full flex flex-col gap-10 items-center overflow-scroll h-full py-5 z-30">
        <p className="sm:text-2xl lg:text-3xl capitalize text-center font-bold text-white">
          {userData
            ? lang === "ar"
              ? "تعديل علي مستخدم "
              : "edit user"
            : lang === "ar"
            ? "انشاء مستخدم جديد"
            : "create a new user"}
        </p>
        <form
          className="flex flex-col sm:gap-5 lg:gap-10 w-full items-center "
          onSubmit={userData ? HandleSubmitEdit : HandleSubmitCreate}
          autoComplete="off"
        >
          {/* user info */}
          <div className="user-info sm:w-full lg:w-10/12 flex flex-col gap-3 h-fit text-black ">
            <p
              className={`w-full ${
                lang === "ar" ? "text-end" : "text-start"
              } text-white sm:text-xl lg:text-2xl capitalize font-semibold 
            py-2 border-b-2`}
            >
              {lang === "ar" ? "معلومات المستخدم" : "user information"}
            </p>
            {/* inputs container */}
            <div id="userName" className="flex flex-col">
              <label
                htmlFor="userName"
                className={`${
                  lang === "ar" && "text-right"
                } text-lg text-white capitalize `}
              >
                {lang === "ar" ? "اسم المستخدم" : "user name"}
              </label>
              <input
                id="userName"
                name="userName"
                type="text"
                className={` rounded-lg ${
                  lang === "ar" ? "text-end" : "text-start"
                }  sm:text-base lg:text-lg w-full p-2 outline-none focus-visible:border-black border-2
                `}
                value={data.userName}
                onChange={HandleChangeUser}
              />
            </div>
            <div
              className={`${
                lang === "ar" ? "flex-row-reverse" : "flex-row"
              } input-group w-full flex gap-2 sm:flex-wrap md:flex-nowrap `}
            >
              <div id="first-name" className="w-full flex flex-col">
                <label
                  htmlFor="fname"
                  className={`${
                    lang === "ar" && "text-right"
                  } text-lg text-white capitalize `}
                >
                  {lang === "ar" ? "الاسم الاول" : "first name"}
                </label>
                <input
                  id="first-name"
                  name="fname"
                  type="text"
                  className={` rounded-lg ${
                    lang === "ar" ? "text-end" : "text-start"
                  }  sm:text-base lg:text-lg  p-2 outline-none focus-visible:border-black border-2
                `}
                  value={data.fname}
                  onChange={HandleChangeUser}
                />
              </div>
              <div id="last-name " className="w-full flex flex-col">
                <label
                  htmlFor="lname"
                  className={`${
                    lang === "ar" && "text-right"
                  } text-lg text-white capitalize `}
                >
                  {lang === "ar" ? "الاسم الاخير" : "last name"}
                </label>
                <input
                  name="lname"
                  value={data.lname}
                  onChange={HandleChangeUser}
                  type="text"
                  className={`${
                    lang === "ar" ? "text-end" : "text-start"
                  } rounded-lg w-full sm:text-base lg:text-lg outline-none
                focus-visible:border-black border-2 h-fit p-2 `}
                />
              </div>
            </div>
            <div className="input-group flex sm:flex-wrap md:flex-nowrap w-full items-center gap-2">
              <div id="email" className="w-full flex flex-col">
                <label
                  htmlFor="email"
                  className={`${
                    lang === "ar" && "text-right"
                  } text-lg text-white capitalize `}
                >
                  {lang === "ar" ? "الايميل " : "email"}
                </label>
                <input
                  name="email"
                  value={data.email}
                  onChange={(e) => {
                    if (!userData) {
                      const email = e.target.value.toLocaleLowerCase();
                      setData({ ...data, email });
                    }
                  }}
                  type="email"
                  className={`${
                    lang === "ar" ? "text-end" : "text-start"
                  } rounded-lg  sm:text-base lg:text-lg outline-none
                focus-visible:border-black border-2 h-fit p-2 lowercase`}
                />
              </div>
              <div id="phone-no" className="w-full flex flex-col">
                <label
                  className={`${
                    lang === "ar" && "text-right"
                  } text-lg text-white capitalize w-full `}
                >
                  {lang === "ar" ? "رقم الهالتف" : "Phone Number"}
                </label>
                <PhoneInput
                  inputStyle={{
                    borderRadius: "10px",
                    width: "100%",
                    height: "100%",
                    paddingTop: "0.7rem ",
                    paddingBottom: "0.7rem ",
                  }}
                  buttonStyle={{ outline: "none", border: "none" }}
                  countryCodeEditable={false}
                  country={"jo"}
                  onChange={(e) => {
                    setData({ ...data, phone: e });
                  }}
                  value={`${data.phone}`}
                />
              </div>
            </div>
          </div>
          {/* projects info */}
          <div className="projects sm:w-full lg:w-10/12 flex flex-col gap-3 text-black">
            <p
              className={`w-full ${
                lang === "ar" ? "text-end" : "text-start"
              } text-white sm:text-xl lg:text-2xl  capitalize font-semibold 
            py-2 border-b-2`}
            >
              {lang === "ar" ? "معلومات المشروع" : "project information"}
            </p>
            {/* project inputs containers */}
            {projectInfo.map((project, i) => (
              <div
                key={i}
                className="project-info flex flex-col gap-3 w-full border-2 p-2 relative"
              >
                <p
                  className={`text-xl flex bg-darkGrey text-white w-fit py-1 px-4 rounded-lg
                  capitalize font-light ${lang === "ar" && "self-end"}`}
                >
                  {lang === "ar" ? "مشروع" : "project"} {i + 1}
                </p>
                <div className="input-group w-full flex gap-2 sm:flex-wrap md:flex-nowrap">
                  <div id="project-number" className="flex w-full flex-col">
                    <label
                      htmlFor="userName"
                      className={`${
                        lang === "ar" && "text-right"
                      } text-lg text-white capitalize `}
                    >
                      {lang === "ar" ? "رقم المشروع" : "project number"}
                    </label>
                    <input
                      name="projectNo"
                      type="number"
                      value={project.projectNo}
                      onChange={(e) => {
                        HandleChangeProject(e, i);
                      }}
                      className={`${
                        lang === "ar" ? "text-end" : "text-start"
                      } rounded-lg w-full sm:text-base lg:text-lg outline-none
                focus-visible:border-black border-2 h-fit p-2`}
                    />
                  </div>
                  <div id="project-name" className="flex w-full flex-col">
                    <label
                      htmlFor="userName"
                      className={`${
                        lang === "ar" && "text-right"
                      } text-lg text-white capitalize `}
                    >
                      {lang === "ar" ? "اسم المشروع " : "project name"}
                    </label>
                    <input
                      value={project.projectName}
                      onChange={(e) => {
                        HandleChangeProject(e, i);
                      }}
                      name="projectName"
                      type="text"
                      className={`${
                        lang === "ar" ? "text-end" : "text-start"
                      } rounded-lg w-full sm:text-base lg:text-lg outline-none
                focus-visible:border-black border-2 h-fit p-2`}
                    />
                  </div>
                </div>
                <div className="input-group w-full flex gap-2 sm:flex-wrap md:flex-nowrap">
                  <div id="project-location" className="flex w-full flex-col">
                    <label
                      htmlFor="projectLoc"
                      className={`${
                        lang === "ar" && "text-right"
                      } text-lg text-white capitalize `}
                    >
                      {lang === "ar" ? "موقع المشروع" : "project location"}
                    </label>
                    <input
                      value={project.projectLoc}
                      onChange={(e) => {
                        HandleChangeProject(e, i);
                      }}
                      name="projectLoc"
                      type="text"
                      className={`${
                        lang === "ar" ? "text-end" : "text-start"
                      } rounded-lg w-full sm:text-base lg:text-lg outline-none
                focus-visible:border-black border-2 h-fit p-2`}
                    />
                  </div>
                  <div id="project-type" className="flex w-full flex-col">
                    <label
                      htmlFor="projectType"
                      className={`${
                        lang === "ar" && "text-right"
                      } text-lg text-white capitalize  `}
                    >
                      {lang === "ar" ? "نوع المشروع" : "project type"}
                    </label>
                    <select
                      name="projectType"
                      value={project.projectType}
                      onChange={(e) => {
                        HandleChangeProject(e, i);
                      }}
                      className={`${
                        lang === "ar" ? "text-end" : "text-start"
                      } rounded-lg w-full sm:text-base lg:text-lg outline-none
                      border-2 h-fit p-2 `}
                    >
                      <option value="">
                        {lang === "ar" ? "...اختر النوع" : "select type..."}
                      </option>
                      <option value="commercial">
                        {lang === "ar" ? "تجاري" : "Commercial"}
                      </option>
                      <option value="residential">
                        {lang === "ar" ? "سكني" : "Residential"}
                      </option>
                      <option value="industrial">
                        {lang === "ar" ? "صناعي " : "Industrial"}
                      </option>
                      <option value="infrastructure">
                        {lang === "ar" ? " بنية تحتية" : "Infrastructure"}
                      </option>
                    </select>
                  </div>
                </div>
                <div className="input-group w-full flex gap-2 sm:flex-wrap md:flex-nowrap">
                  <div id="project-area" className="flex w-full flex-col">
                    <label
                      htmlFor="projectArea"
                      className={`${
                        lang === "ar" && "text-right"
                      } text-lg text-white capitalize `}
                    >
                      {lang === "ar" ? "منطقة المشروع" : "project area"}
                    </label>
                    <input
                      value={project.projectArea}
                      onChange={(e) => {
                        HandleChangeProject(e, i);
                      }}
                      name="projectArea"
                      type="text"
                      className={`${
                        lang === "ar" ? "text-end" : "text-start"
                      } rounded-lg w-full sm:text-base lg:text-lg outline-none
                focus-visible:border-black border-2 h-fit p-2`}
                    />
                  </div>
                  <div id="project-height" className="flex w-full flex-col">
                    <label
                      htmlFor="projectHei"
                      className={`${
                        lang === "ar" && "text-right"
                      } text-lg text-white capitalize `}
                    >
                      {lang === "ar" ? "ارتفاع المشروع" : "project height"}
                    </label>
                    <input
                      value={project.projectHei}
                      onChange={(e) => {
                        HandleChangeProject(e, i);
                      }}
                      name="projectHei"
                      type="number"
                      className={`${
                        lang === "ar" ? "text-end" : "text-start"
                      } rounded-lg w-full sm:text-base lg:text-lg outline-none
                focus-visible:border-black border-2 h-fit p-2`}
                    />
                  </div>
                </div>
                <div className="input-group w-full sm:flex-wrap md:flex-nowrap flex gap-2">
                  <div id="consultant" className="flex w-full flex-col">
                    <label
                      htmlFor="consultant"
                      className={`${
                        lang === "ar" && "text-right"
                      } text-lg text-white capitalize `}
                    >
                      {lang === "ar" ? "مستشار" : "Consultant"}
                    </label>
                    <input
                      value={project.consultant}
                      onChange={(e) => {
                        HandleChangeProject(e, i);
                      }}
                      name="consultant"
                      type="text"
                      className={`${
                        lang === "ar" ? "text-end" : "text-start"
                      } rounded-lg sm:w-full lg:w-full sm:text-base lg:text-lg outline-none
                focus-visible:border-black border-2 h-fit p-2`}
                    />
                  </div>
                  <div id="project-duration" className="flex w-full flex-col">
                    <label
                      htmlFor="projectDura"
                      className={`${
                        lang === "ar" && "text-right"
                      } text-lg text-white capitalize `}
                    >
                      {lang === "ar" ? "مدة المشروع" : "project duration"}
                    </label>
                    <input
                      value={project.projectDura}
                      onChange={(e) => {
                        HandleChangeProject(e, i);
                      }}
                      name="projectDura"
                      type="number"
                      className={`${
                        lang === "ar" ? "text-end" : "text-start"
                      } rounded-lg sm:w-full lg:w-full sm:text-base lg:text-lg outline-none
                focus-visible:border-black border-2 h-fit p-2`}
                    />
                  </div>
                </div>
                <div id="project-folder-name" className="flex w-full flex-col">
                  <label
                    htmlFor="folderName"
                    className={`${
                      lang === "ar" && "text-right"
                    } text-lg text-white capitalize `}
                  >
                    {lang === "ar" ? "ملف المشروع " : "project folder"}
                  </label>
                  <input
                    type="text"
                    name="folderName"
                    value={project.folderName}
                    onChange={(e) => {
                      HandleChangeProject(e, i);
                    }}
                    className={`${
                      lang === "ar" ? "text-end" : "text-start"
                    } rounded-lg w-full  sm:text-base lg:text-lg outline-none
                focus-visible:border-black border-2 h-fit p-2 `}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => ProjectRem(i)}
                  className={`absolute ${
                    lang === "ar" ? "left-2" : "right-2"
                  }  top-2 text-white bg-red-500 py-2 px-2 rounded-xl`}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={AddProject}
            className="add-project text-white py-2 px-6 border-2 flex items-center gap-3 rounded-md text-lg 
          hover:bg-white hover:text-color1 duration-150 font-semibold"
          >
            {lang === "ar" ? "اضف مشروع" : "Add Project"}
            <MdAdd />
          </button>
          <span className="h-[2px] w-10/12 bg-white"></span>
          <button
            id="create-user"
            type="submit"
            className="text-white sm:text-lg lg:text-2xl capitalize border-2 py-2 px-6 hover:text-color1 font-semibold
          rounded-xl hover:bg-white duration-150 w-[200px] flex justify-center"
          >
            {loading ? (
              <Oval width={50} height={"28px"} color="white" />
            ) : userData ? (
              lang === "en" || lang === null ? (
                "save"
              ) : (
                "حفظ "
              )
            ) : lang === "en" || lang === null ? (
              "create user"
            ) : (
              "انشاء مستخدم  "
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
