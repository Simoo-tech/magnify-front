import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageCon } from "../Context";
import { FaInfoCircle } from "react-icons/fa";
import { useCookies } from "react-cookie";
import cookie from "react-cookies";
import axios from "axios";
import { MdErrorOutline } from "react-icons/md";
import { Oval } from "react-loader-spinner";

export const CreatePass = () => {
  // get user id
  const userID = window.localStorage.getItem("userID");
  // use navigation
  const navigate = useNavigate();
  // get cookie
  const [cookies] = useCookies(["user_token"]);
  const user = cookies.user_token;
  // redirect to login in case didnt login
  useEffect(() => {
    if (!user) {
      navigate("/");
      // if user not admin and have many projects
    } else if (!user.isAdmin && user.passChanged) {
      navigate(`/${userID}/tour-projects`);
    }
  }, []);

  const [show, setShow] = useState(false);
  const { lang } = useContext(LanguageCon);
  const [userPass, setUserPass] = useState({});
  // loading spinner
  const [loading, setLoading] = useState(false);
  // handle submit
  const [error, setError] = useState("");

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(
        `${process.env.REACT_APP_API_URL}auth/user/${cookies.user_token._id}`,
        userPass
      )
      .then((res) => {
        alert(res.data.message);
        setTimeout(() => {
          cookie.remove("user_token", {
            path: "/",
            expires: new Date(Date.now() + 3600000),
            secure: false, // set to true if your using https
          });
          window.location.assign("/");
        }, 1000);
      })
      .catch((err) => setError(err.response.data.message))
      .finally(() => setLoading(false));
  };

  // handle on change
  const HandleChange = (e) => {
    setUserPass({ ...userPass, [e.target.name]: e.target.value });
    setError(null);
  };
  return (
    <div
      className="section-h create-password bg-color1 flex justify-center items-center"
      id="create-new-password"
    >
      <div
        className="container bg-darkGrey sm:9/12 xl:w-8/12 h-5/6 rounded-lg  flex
      flex-col items-center justify-evenly "
      >
        <h2 className="text-center text-white capitalize sm:text-2xl md:text-3xl font-bold ">
          {lang === "ar" ? "انشاء كلمة مرور جديدة" : "create new password"}
        </h2>
        {/* error message */}
        {error && (
          <span
            className="text-center text-white flex items-center gap-3 justify-center bg-red-500 
              py-2 px-4 rounded-lg sm:text-sm lg:text-base "
          >
            <MdErrorOutline size={20} />
            {error}
          </span>
        )}
        <form
          onSubmit={HandleSubmit}
          className={`flex flex-wrap justify-center items-center w-11/12 mt-4
          sm:flex-col sm:h-fit sm:gap-6
          md:flex-row-reverse md:h-3/6 
          lg:mt-30`}
        >
          <div className="flex w-full flex-row-reverse gap-5 items-center ">
            {/* input container */}
            <div
              id="inputs-container"
              className="inputs-form flex flex-col items-center gap-5
          sm:w-full md:w-6/12 order-2"
            >
              <div id="input-group" className="input w-full">
                <input
                  onChange={HandleChange}
                  required
                  maxLength={16}
                  type={show ? "text" : "password"}
                  value={userPass.password}
                  name="password"
                  id="password"
                  placeholder={lang === "ar" ? "كلمة مرور" : "Password"}
                  className={`sm:py-2 sm:px-3 md:py-3 md:px-4 w-full rounded-lg outline-none 
                border-color1 ${
                  lang === "ar"
                    ? "text-end border-l-4"
                    : "text-start border-r-4"
                }`}
                />
              </div>
              <div id="input-group" className="input w-full">
                <input
                  onChange={HandleChange}
                  required
                  maxLength={16}
                  type={show ? "text" : "password"}
                  value={userPass.passwordcon}
                  name="passwordcon"
                  id="passwordcon"
                  placeholder={
                    lang === "ar" ? "أعد إدخال كلمة السر" : "Retype Password"
                  }
                  className={`sm:py-2 sm:px-3 md:py-3 md:px-4 w-full rounded-lg outline-none 
                border-color1 ${
                  lang === "ar"
                    ? "text-end border-l-4"
                    : "text-start border-r-4"
                }`}
                />
              </div>
              <label
                id="show-password"
                onChange={() => setShow(!show)}
                htmlFor="show"
                className={`gap-1 flex sm:base md:text-lg w-full justify-start text-white ${
                  lang === "ar" && "flex-row-reverse"
                } capitalize `}
              >
                <input type="checkbox" id="show" className="text-lg" />
                {lang === "ar" ? "اظهار كلمة المرور" : "show password"}
              </label>
            </div>
            {/* instruction container */}
            <div
              className={`instruction sm:w-full md:w-5/12 lg:w-5/12 text-white justify-center flex 
          border-2 border-color3 py-4 px-3 flex-col order-1
          ${lang === "ar" ? "items-end" : "items-start"}`}
            >
              <p
                className={`flex items-end gap-2 sm:text-base md:text-lg ${
                  lang === "ar" && "flex-row-reverse"
                }`}
              >
                <p className="sm:text-lg md:text-2xl font-semibold text-color3">
                  {lang === "ar" ? "تَلمِيح" : "Hint"}
                </p>
                {lang === "ar"
                  ? ": كلمة المرور يجب ان تكون"
                  : "Password must be:"}
              </p>
              <ul
                className={`${
                  lang === "ar" ? " text-right pr-1" : "pl-1"
                } flex flex-col capitalize sm:text-base md:text-base`}
              >
                <li
                  className={` flex items-center relative gap-2 ${
                    lang === "ar" ? "flex-row-reverse" : ""
                  }`}
                >
                  <FaInfoCircle size={12} />
                  {lang === "ar"
                    ? "علي الاقل 8 احرف"
                    : "at least 8 characters long"}
                </li>
                <li
                  className={` flex items-center relative gap-2 ${
                    lang === "ar" ? "flex-row-reverse" : ""
                  }`}
                >
                  <FaInfoCircle size={12} />
                  {lang === "ar"
                    ? "علي الاقل حرف صغير"
                    : "at least one lower case "}
                </li>
                <li
                  className={` flex items-center relative gap-2 ${
                    lang === "ar" ? "flex-row-reverse" : ""
                  }`}
                >
                  <FaInfoCircle size={12} />
                  {lang === "ar"
                    ? "علي الاقل حرف كبير"
                    : "at least one capital case"}
                </li>
                <li
                  className={` flex items-center relative gap-2 ${
                    lang === "ar" ? "flex-row-reverse" : ""
                  }`}
                >
                  <FaInfoCircle size={12} />
                  {lang === "ar" ? "علي الاقل رقم" : "at least one number"}
                </li>
              </ul>
            </div>
          </div>
          <button
            id="create-password"
            type="submit"
            className="text-white sm:text-lg lg:text-xl capitalize border-2 py-2 px-6 hover:text-darkGrey font-semibold
          rounded-xl hover:bg-white duration-150 ease-linear w-[250px] flex justify-center"
          >
            {loading ? (
              <Oval width={50} height={"28px"} color="white" />
            ) : lang === "ar" ? (
              "انشاء كلمة مرور جديدة"
            ) : (
              "Set new password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
