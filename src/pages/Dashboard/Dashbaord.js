import React, { useContext, useEffect, useState } from "react";
import image from "../../assest/ava1.webp";
import { FaPlus, FaUserEdit } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { IoSettingsSharp } from "react-icons/io5";
import axios from "axios";
import { LanguageCon } from "../../Context";
import { useCookies } from "react-cookie";
import conimage from "../../assest/building.jpg";
import { MdOutlineError } from "react-icons/md";

export const Dashbaord = () => {
  const navigate = useNavigate();
  // user cookies
  const [cookies] = useCookies(["user_token"]);

  // check if admin
  useEffect(() => {
    if (!cookies.user_token) {
      navigate("/");
    } else if (!cookies.user_token.isAdmin) {
      navigate("/");
    }
  });

  // context
  const { lang } = useContext(LanguageCon);

  return (
    <div className="admin-dashboard relative">
      <section className="dashboard  w-full flex justify-center py-10 relative overflow-scroll">
        <div className="container flex justify-evenly flex-col items-center h-fit ">
          <div className="admin-info flex flex-col items-center gap-4 ">
            <img src={image} alt="admin-img" className="rounded-lg w-[120px]" />
            <p className="sm:text-lg lg:text-xl capitalize">name</p>
          </div>
          <div className="btns flex sm:flex-col sm:mt-10 lg:flex-row gap-10 w-full items-center justify-center">
            <div className="create-btn sm:w-8/12 md:w-7/12 lg:w-3/12 xl:w-2/12 flex flex-col gap-3 items-center">
              <label
                htmlFor="create-user"
                className="text-2xl font-bold capitalize"
              >
                {lang === "ar" ? "انشاء مستخدم" : "create user"}
              </label>
              <button
                onClick={() => navigate("create-user")}
                name="create-user"
                id="create-user"
                className="text-white text-6xl border-2 border-white w-full sm:h-[150px] lg:h-[200px]
                flex justify-center items-center py-5 px-10 rounded-2xl group bg-color1"
              >
                <FaPlus className="group-hover:scale-125 duration-200 ease-in-out" />
              </button>
            </div>
            <div className="edit-btn sm:w-8/12 md:w-7/12 lg:w-3/12 xl:w-2/12 flex flex-col gap-3 items-center">
              <label
                htmlFor="edit-user"
                className="text-2xl  font-bold capitalize"
              >
                {lang === "ar" ? "تعديل حساب مستخدم " : "  edit user"}
              </label>
              <button
                name="edit-user"
                id="edit-user"
                className="text-white text-6xl border-2 border-white w-full sm:h-[150px] lg:h-[200px]
                flex justify-center items-center py-5 px-10 rounded-2xl group bg-color1"
              >
                <FaUserEdit className="group-hover:scale-125 duration-200 ease-in-out" />
              </button>
            </div>
            <div className="settings-btn sm:w-8/12 md:w-7/12 lg:w-3/12 xl:w-2/12 flex flex-col gap-3 items-center">
              <label
                htmlFor="edit-user"
                className="text-2xl font-bold capitalize"
              >
                {lang === "ar" ? "اعدادات الحساب" : "  settings"}
              </label>
              <button
                name="edit-user"
                id="edit-user"
                className="text-white text-6xl border-2 border-white w-full sm:h-[150px] lg:h-[200px]
                flex justify-center items-center py-5 px-10 rounded-2xl group bg-color1"
              >
                <IoSettingsSharp className="group-hover:rotate-90 duration-200 ease-in-out" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <Outlet />
    </div>
  );
};

export const CreateUser = () => {
  const [animation, setAnimation] = useState(false);
  const [data, setData] = useState({});
  const [phone, setPhone] = useState();

  // handle message from api
  const [msg, setMsg] = useState({});

  // user cookies
  const [cookies] = useCookies(["user_token"]);

  // context
  const { lang } = useContext(LanguageCon);

  // animation
  useEffect(() => {
    setAnimation(true);
  }, []);

  // handle change user info
  const HandleChangeUser = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setMsg({ active: false });
  };

  // handle submit
  const HandleSubmit = async (e) => {
    e.preventDefault();
    await axios
      // ${process.env.REACT_APP_API_URL}auth/createuser}
      // http://localhost:8000/api/auth/createuser
      .post(
        `${process.env.REACT_APP_API_URL}auth/createuser}`,
        { ...data },
        {
          headers: { token: `${cookies.user_token.token}` },
        }
      )
      .then((res) => {
        setMsg({ active: true, text: res.data.message, type: "success" });
        setTimeout(() => {
          setMsg({});
        }, 3000);
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      })
      .catch((err) =>
        setMsg({
          active: true,
          text: err.response.data.message,
          type: "failed",
        })
      );
  };
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
          <MdOutlineError /> {msg.text}
        </span>
      )}
      <div className="container flex flex-col gap-10 items-center overflow-scroll h-full py-5 z-30">
        <p className="sm:text-2xl lg:text-3xl capitalize text-center font-bold text-white">
          {lang === "ar" ? "انشاء مستخدم جديد" : "create a new user"}
        </p>
        <form
          className="flex flex-col sm:gap-5 lg:gap-10 w-full items-center "
          onSubmit={HandleSubmit}
          autoComplete="off"
        >
          {/* user info */}
          <div className="user-info sm:w-full lg:w-10/12 flex flex-col gap-3 h-fit ">
            <p
              className={`w-full ${
                lang === "ar" ? "text-end" : "text-start"
              } text-white sm:text-xl lg:text-2xl capitalize font-semibold 
            py-2 border-b-2`}
            >
              {lang === "ar" ? "معلومات المستخدم" : "user information"}
            </p>
            {/* inputs container */}
            <div
              className={`${
                lang === "ar" ? "flex-row-reverse" : "flex-row"
              } input-group-name w-full flex gap-2 `}
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
            <div className="input-group-email w-full">
              <input
                name="email"
                value={data.email}
                onChange={HandleChangeUser}
                type="email"
                placeholder={lang === "ar" ? "الايميل " : "email"}
                className={`${
                  lang === "ar" ? "text-end" : "text-start"
                } rounded-lg w-full sm:text-base lg:text-lg outline-none
                focus-visible:border-black border-2 h-fit p-2 `}
              />
            </div>
            <div
              className={`input-group-url input-group-phone flex w-full gap-2 items-center`}
            >
              <PhoneInput
                inputStyle={{
                  borderRadius: "10px",
                  width: "100%",
                  height: "100%",
                  paddingTop: "0.7rem ",
                  paddingBottom: "0.7rem ",
                }}
                containerStyle={{
                  width: "50%",
                  height: "fit-content",
                }}
                countryCodeEditable={false}
                country={"eg"}
                name="phone"
                onChange={(e) => {
                  setPhone(e);
                  setData({ ...data, phone: phone });
                }}
              />
              <input
                type="url"
                name="projecturl"
                value={data.projecturl}
                onChange={HandleChangeUser}
                placeholder={lang === "ar" ? "رابط المشروع " : "project url"}
                className={`${
                  lang === "ar" ? "text-end" : "text-start"
                } rounded-lg w-6/12 sm:text-base lg:text-lg outline-none
                focus-visible:border-black border-2 h-fit p-2 `}
              />
            </div>
          </div>
          {/* project info */}
          <div className="project-info sm:w-full lg:w-10/12 flex flex-col gap-3">
            <p
              className={`w-full ${
                lang === "ar" ? "text-end" : "text-start"
              } text-white sm:text-xl lg:text-2xl  capitalize font-semibold 
            py-2 border-b-2`}
            >
              {lang === "ar" ? "معلومات المشروع" : "project information"}
            </p>
            {/* inputs containers */}
            <div className="input-group w-full flex gap-2">
              <input
                name="projectNo"
                value={data.projectNo}
                type="number"
                onChange={HandleChangeUser}
                placeholder={lang === "ar" ? "رقم المشروع" : "project number"}
                className={`${
                  lang === "ar" ? "text-end" : "text-start"
                } rounded-lg w-full sm:text-base lg:text-lg outline-none
                focus-visible:border-black border-2 h-fit p-2`}
              />
              <input
                value={data.projectName}
                onChange={HandleChangeUser}
                name="projectName"
                type="text"
                placeholder={lang === "ar" ? "اسم المشروع " : "project name"}
                className={`${
                  lang === "ar" ? "text-end" : "text-start"
                } rounded-lg w-full sm:text-base lg:text-lg outline-none
                focus-visible:border-black border-2 h-fit p-2`}
              />
            </div>
            <div className="input-group w-full">
              <input
                value={data.projectLoc}
                onChange={HandleChangeUser}
                name="projectLoc"
                type="text"
                placeholder={
                  lang === "ar" ? "موقع المشروع" : "project location"
                }
                className={`${
                  lang === "ar" ? "text-end" : "text-start"
                } rounded-lg w-full sm:text-base lg:text-lg outline-none
                focus-visible:border-black border-2 h-fit p-2`}
                s
              />
            </div>
            <div className="input-group w-full flex gap-2">
              <input
                value={data.projectArea}
                onChange={HandleChangeUser}
                name="projectArea"
                type="text"
                placeholder={lang === "ar" ? "منطقة المشروع" : "project area"}
                className={`${
                  lang === "ar" ? "text-end" : "text-start"
                } rounded-lg w-full sm:text-base lg:text-lg outline-none
                focus-visible:border-black border-2 h-fit p-2`}
              />
              <input
                value={data.projectHei}
                onChange={HandleChangeUser}
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
            <div className="input-group w-full flex gap-2">
              <input
                onChange={HandleChangeUser}
                value={data.consultant}
                name="consultant"
                type="text"
                placeholder={lang === "ar" ? "مستشار" : "Consultant"}
                className={`${
                  lang === "ar" ? "text-end" : "text-start"
                } rounded-lg w-full sm:text-base lg:text-lg outline-none
                focus-visible:border-black border-2 h-fit p-2`}
              />
              <input
                value={data.projectDura}
                onChange={HandleChangeUser}
                name="projectDura"
                type="number"
                placeholder={lang === "ar" ? "مدة المشروع" : "project duration"}
                className={`${
                  lang === "ar" ? "text-end" : "text-start"
                } rounded-lg w-full sm:text-base lg:text-lg outline-none
                focus-visible:border-black border-2 h-fit p-2`}
              />
            </div>
            <div className="input-group w-full flex gap-2">
              <select
                value={data.projectType}
                name="projectType"
                onChange={(e) => {
                  setData({
                    ...data,
                    projectType: e.target.value,
                  });
                }}
                placeholder={lang === "ar" ? "نوع المشروع" : "project type"}
                className={`${
                  lang === "ar" ? "text-end" : "text-start"
                } rounded-lg w-full sm:text-base lg:text-lg outline-none
                focus-visible:border-black border-2 h-fit p-2`}
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
          </div>
          <button
            type="submit"
            className="text-2xl text-white border-2 py-2 px-10 rounded-lg capitalize 
            hover:bg-white hover:text-color1 duration-200 ease-in-out"
          >
            {lang === "ar" ? "انشاء" : "create"}
          </button>
        </form>
      </div>
    </div>
  );
};
