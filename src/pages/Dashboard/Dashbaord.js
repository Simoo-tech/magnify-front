import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import axios from "axios";
import { LanguageCon } from "../../Context";
import { useCookies } from "react-cookie";
import conimage from "../../assest/building.jpg";
import { Oval } from "react-loader-spinner";
import { FaPlus, FaUserEdit, FaCheck } from "react-icons/fa";
import { MdOutlinePersonSearch, MdAdd, MdOutlineError } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import "../../App.css";
import { QR } from "../../component/Qr";

export const Dashbaord = () => {
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
  }, []);

  // context
  const { lang } = useContext(LanguageCon);

  return (
    <div className="admin-dashboard relative overflow-hidden flex justify-center items-center bg-color1 ">
      <div className="container">
        <section
          className="dashboard w-full flex justify-center items-center
      h-full py-10 relative overflow-scroll"
        >
          <div className="flex justify-evenly flex-col items-center h-fit ">
            <div className="welcome flex flex-col items-center gap-4 ">
              <h3
                className={`${
                  lang === "ar" && "flex-row-reverse"
                } flex sm:text-3xl md:text-4xl text-white mb-20 capitalize gap-2`}
              >
                {lang === "ar" ? " ,مرحبا" : "Hello, "}
                <span>{user.fname}</span>
              </h3>
              <p className="sm:text-xl lg:text-2xl text-center text-white ">
                {lang === "ar"
                  ? "ماذا تريد أن تفعل الآن؟"
                  : "What would you like to do now? "}
              </p>
            </div>
            <div className="btns flex sm:mt-10 gap-10 w-full items-center justify-center">
              <div
                className="create-btn sm:w-6/12 md:w-3/12 xl:w-[180px] flex flex-col 
            gap-3 items-center"
              >
                <label
                  htmlFor="create-user"
                  className="sm:text-lg md:text-xl lg:text-2xl font-bold capitalize text-white"
                >
                  {lang === "ar" ? "انشاء مستخدم" : "create user"}
                </label>
                <button
                  onClick={() => navigate("create-user")}
                  name="create-user"
                  id="create-user"
                  className="text-black text-6xl border-2 border-white w-full sm:h-[130px] md:h-[150px]
                flex justify-center items-center py-5 px-10 rounded-2xl group shadow-xl  bg-white"
                >
                  <FaPlus className="group-hover:scale-125 duration-200 ease-in-out" />
                </button>
              </div>
              <span className="text-2xl text-white">
                {lang === "ar" ? "او" : "or "}
              </span>
              <div className="edit-btn sm:w-6/12 md:w-3/12 xl:w-[180px] flex flex-col gap-3 items-center">
                <label
                  htmlFor="edit-user"
                  className="sm:text-lg md:text-xl lg:text-2xl text-white font-bold capitalize"
                >
                  {lang === "ar" ? "تعديل حساب مستخدم " : "  edit user"}
                </label>
                <button
                  onClick={() => navigate("edit-user")}
                  name="edit-user"
                  id="edit-user"
                  className="text-black text-6xl w-full sm:h-[130px] md:h-[150px]
                flex justify-center items-center py-5 px-10 rounded-2xl group shadow-xl bg-white"
                >
                  <FaUserEdit className="group-hover:scale-125 duration-200 ease-in-out" />
                </button>
              </div>
            </div>
          </div>
        </section>
        <Outlet />
      </div>
      {user && <QR />}
    </div>
  );
};

// create new user
export const CreateUser = ({ userData, setUserData }) => {
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
  }, []);

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
          window.location.reload();
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
          window.location.reload();
        }, 2500);
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
      className={`create-user w-full bg-color1 absolute flex justify-center items-center pt-5 
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
      <div className="flex flex-col gap-10 items-center overflow-scroll h-full py-5 z-30">
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
            <input
              id="userName"
              name="userName"
              type="text"
              placeholder={lang === "ar" ? "اسم المستخدم" : "User name"}
              className={` rounded-lg ${
                lang === "ar" ? "text-end" : "text-start"
              }  sm:text-base lg:text-lg w-full p-2 outline-none focus-visible:border-black border-2
                `}
              value={userData ? userData.userName : data.userName}
              onChange={HandleChangeUser}
            />
            <div
              className={`${
                lang === "ar" ? "flex-row-reverse" : "flex-row"
              } input-group-name w-full flex gap-2 sm:flex-wrap md:flex-nowrap `}
            >
              <input
                id="first-name"
                name="fname"
                type="text"
                placeholder={lang === "ar" ? "الاسم الاول" : "first name"}
                className={` rounded-lg ${
                  lang === "ar" ? "text-end" : "text-start"
                }  sm:text-base lg:text-lg w-full p-2 outline-none focus-visible:border-black border-2
                `}
                value={data.fname}
                onChange={HandleChangeUser}
              />
              <input
                name="lname"
                value={data.lname}
                onChange={HandleChangeUser}
                type="text"
                placeholder={lang === "ar" ? "الاسم الاخير" : "last name"}
                className={`${
                  lang === "ar" ? "text-end" : "text-start"
                } rounded-lg w-full sm:text-base lg:text-lg outline-none
                focus-visible:border-black border-2 h-fit p-2 `}
              />
            </div>
            <div className="input-group-email flex sm:flex-wrap md:flex-nowrap w-full items-center gap-2">
              <input
                name="email"
                value={userData ? userData.email : data.email}
                onChange={(e) => {
                  const email = e.target.value.toLocaleLowerCase();
                  setData({ ...data, email });
                }}
                type="email"
                placeholder={lang === "ar" ? "الايميل " : "email"}
                className={`${
                  lang === "ar" ? "text-end" : "text-start"
                } rounded-lg w-full sm:text-base lg:text-lg outline-none
                focus-visible:border-black border-2 h-fit p-2 lowercase`}
              />
              <div className="w-full">
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
                  country={"eg"}
                  onChange={(e) => {
                    if (userData) {
                      setUserData({ ...userData, phone: e });
                    } else {
                      setData({ ...data, phone: e });
                    }
                  }}
                  value={userData ? `${userData.phone}` : `${data.phone}`}
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
                  className={`text-xl flex bg-darkGrey text-white w-fit py-2 px-6 rounded-lg drop-shadow-2xl capitalize ${
                    lang === "ar" && "self-end"
                  }`}
                >
                  {lang === "ar" ? "مشروع" : "project"} {i + 1}
                </p>
                <div className="input-group w-full flex gap-2 sm:flex-wrap md:flex-nowrap">
                  <input
                    name="projectNo"
                    type="number"
                    value={project.projectNo}
                    onChange={(e) => {
                      HandleChangeProject(e, i);
                    }}
                    placeholder={
                      lang === "ar" ? "رقم المشروع" : "project number"
                    }
                    className={`${
                      lang === "ar" ? "text-end" : "text-start"
                    } rounded-lg w-full sm:text-base lg:text-lg outline-none
                focus-visible:border-black border-2 h-fit p-2`}
                  />
                  <input
                    value={project.projectName}
                    onChange={(e) => {
                      HandleChangeProject(e, i);
                    }}
                    name="projectName"
                    type="text"
                    placeholder={
                      lang === "ar" ? "اسم المشروع " : "project name"
                    }
                    className={`${
                      lang === "ar" ? "text-end" : "text-start"
                    } rounded-lg w-full sm:text-base lg:text-lg outline-none
                focus-visible:border-black border-2 h-fit p-2`}
                  />
                </div>
                <div className="input-group w-full flex gap-2 sm:flex-wrap md:flex-nowrap">
                  <input
                    value={project.projectLoc}
                    onChange={(e) => {
                      HandleChangeProject(e, i);
                    }}
                    name="projectLoc"
                    type="text"
                    placeholder={
                      lang === "ar" ? "موقع المشروع" : "project location"
                    }
                    className={`${
                      lang === "ar" ? "text-end" : "text-start"
                    } rounded-lg w-full sm:text-base lg:text-lg outline-none
                focus-visible:border-black border-2 h-fit p-2`}
                  />
                  <select
                    name="projectType"
                    value={project.projectType}
                    onChange={(e) => {
                      HandleChangeProject(e, i);
                    }}
                    placeholder={lang === "ar" ? "نوع المشروع" : "project type"}
                    className={`${
                      lang === "ar" ? "text-end" : "text-start"
                    } rounded-lg w-full sm:text-base lg:text-lg outline-none
                focus-visible:border-black border-2 h-fit p-2 text-black`}
                  >
                    <option value="">
                      {lang === "ar" ? "نوع المشروع" : "project type"}
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
                <div className="input-group w-full flex gap-2 sm:flex-wrap md:flex-nowrap">
                  <input
                    value={project.projectArea}
                    onChange={(e) => {
                      HandleChangeProject(e, i);
                    }}
                    name="projectArea"
                    type="text"
                    placeholder={
                      lang === "ar" ? "منطقة المشروع" : "project area"
                    }
                    className={`${
                      lang === "ar" ? "text-end" : "text-start"
                    } rounded-lg w-full sm:text-base lg:text-lg outline-none
                focus-visible:border-black border-2 h-fit p-2`}
                  />
                  <input
                    value={project.projectHei}
                    onChange={(e) => {
                      HandleChangeProject(e, i);
                    }}
                    name="projectHei"
                    type="number"
                    placeholder={
                      lang === "ar" ? "ارتفاع المشروع" : "project height"
                    }
                    className={`${
                      lang === "ar" ? "text-end" : "text-start"
                    } rounded-lg w-full sm:text-base lg:text-lg outline-none
                focus-visible:border-black border-2 h-fit p-2`}
                  />
                </div>
                <div className="input-group w-full sm:flex-wrap md:flex-nowrap flex gap-2">
                  <input
                    value={project.consultant}
                    onChange={(e) => {
                      HandleChangeProject(e, i);
                    }}
                    name="consultant"
                    type="text"
                    placeholder={lang === "ar" ? "مستشار" : "Consultant"}
                    className={`${
                      lang === "ar" ? "text-end" : "text-start"
                    } rounded-lg sm:w-full lg:w-full sm:text-base lg:text-lg outline-none
                focus-visible:border-black border-2 h-fit p-2`}
                  />
                  <input
                    value={project.projectDura}
                    onChange={(e) => {
                      HandleChangeProject(e, i);
                    }}
                    name="projectDura"
                    type="number"
                    placeholder={
                      lang === "ar" ? "مدة المشروع" : "project duration"
                    }
                    className={`${
                      lang === "ar" ? "text-end" : "text-start"
                    } rounded-lg sm:w-full lg:w-full sm:text-base lg:text-lg outline-none
                focus-visible:border-black border-2 h-fit p-2`}
                  />
                </div>
                <div className={`input-group`}>
                  <input
                    type="text"
                    name="folderName"
                    value={project.folderName}
                    onChange={(e) => {
                      HandleChangeProject(e, i);
                    }}
                    placeholder={
                      lang === "ar" ? "ملف المشروع " : "project folder"
                    }
                    className={`${
                      lang === "ar" ? "text-end" : "text-start"
                    } rounded-lg w-full  sm:text-base lg:text-lg outline-none
                focus-visible:border-black border-2 h-fit p-2 `}
                  />
                </div>
                {projectInfo.length > 1 && (
                  <button
                    type="button"
                    onClick={() => ProjectRem(i)}
                    className={`absolute ${
                      lang === "ar" ? "left-2" : "right-2"
                    }  top-2 text-white bg-red-500 py-2 px-2 rounded-xl`}
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={AddProject}
            className="add-project text-white py-2 px-6 border-2 flex items-center gap-3 rounded-md text-lg 
          hover:bg-white hover:text-color1 duration-150"
          >
            {lang === "ar" ? "اضف مشروع" : "Add Project"}
            <MdAdd />
          </button>
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

// search user by email
export const EditUser = () => {
  const [email, setEmail] = useState("");
  // error
  const [error, setError] = useState();

  // user cookies
  const [cookies] = useCookies(["user_token"]);
  // context
  const { lang } = useContext(LanguageCon);

  const [userData, setUserData] = useState(null);
  const OnSearch = async () => {
    const header = { headers: { token: `${cookies.user_token.token}` } };
    await axios
      .post(`${process.env.REACT_APP_API_URL}user`, { email: email }, header)
      .then((res) => setUserData(res.data))
      .catch((err) => setError(err.response.data.message));
  };

  return (
    <div
      className={`w-full bg-color1 absolute flex pt-5 justify-center items-center left-0 bg-cover sm:flex-col h-full top-0`}
    >
      <div
        className="sm:w-full lg:w-11/12 h-5/6 rounded-xl bg-darkGrey text-white py-3 flex justify-center items-center
      "
      >
        {userData ? (
          <CreateUser
            userData={userData}
            setUserData={setUserData}
            setError={setError}
          />
        ) : (
          <div className="search-user flex flex-col gap-6 sm:w-full lg:w-7/12 xl:w-5/12 items-center ">
            {error && (
              <span className=" sm:text-base lg:text-lg w-9/12 capitalize bg-red-500 py-2 px-6 rounded-xl flex gap-3 items-center">
                <MdOutlineError size={24} />
                {error}
              </span>
            )}
            <h3 className="text-center sm:text-xl lg:text-3xl font-semibold ">
              {lang === "ar"
                ? "تعديل علي مستخدم من خلال الايميل"
                : "Edit user by email"}
            </h3>
            <div className="flex sm:w-11/12 lg:w-full justify-center relative">
              <input
                autoFocus
                type="email"
                placeholder={
                  lang === "ar"
                    ? "ادخل البريد الالكتروني"
                    : "Type user email here"
                }
                className={`${
                  lang === "ar" && "text-right"
                } rounded-lg w-full py-2 px-4 h-full outline-none border-2
              text-black focus-visible:border-color1 `}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
              />
              <button
                type="button"
                onClick={OnSearch}
                className={`absolute  text-darkGrey ${
                  lang === "ar"
                    ? "left-0 border-r-2 rounded-l-lg"
                    : "right-0 border-l-2 rounded-r-lg"
                }
                px-3 border-color1 hover:bg-color1 hover:text-white h-full`}
              >
                <MdOutlinePersonSearch size={30} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
