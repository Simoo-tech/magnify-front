import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageCon } from "../Context";
import { FaInfoCircle } from "react-icons/fa";
import { useCookies } from "react-cookie";
import cookie from "react-cookies";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const CreatePass = () => {
  // use navigation
  const navigate = useNavigate();
  // get cookie
  const [cookies] = useCookies(["user_token"]);

  const getUser = async () => {
    // axios url instance
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_API_URL,
    });
    await axiosInstance
      .get(`auth/user/${cookies.user_token._id}`)
      .then()
      .catch((err) => console.log(err));
  };

  const userID = uuidv4(cookies.user_token._id);
  useEffect(() => {
    // redirect to login in case didnt login
    if (!cookies.user_token) {
      navigate("/");
    } else if (cookies.user_token.passChanged) {
      navigate(`/${userID}/tour-projects`);
    } else {
      getUser();
    }
  }, []);

  const [show, setShow] = useState(false);
  const { lang } = useContext(LanguageCon);
  const [userPass, setUserPass] = useState({});

  // handle submit
  const HandleSubmit = async (e) => {
    e.preventDefault();

    axios
      .put(`${process.env.REACT_APP_API_URL}auth/user/${userID}`, userPass)
      .then((res) => {
        alert(res.data.message);
        setTimeout(() => {
          cookie.remove("user_token", {
            path: "/",
            expires: new Date(Date.now() + 3600000),
            secure: false, // set to true if your using https
          });
          window.location.reload();
        }, 1000);
      })
      .catch((err) => console.log(err));
  };

  // handle on change
  const HandleChange = (e) => {
    setUserPass({ ...userPass, [e.target.name]: e.target.value });
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
        <form
          onSubmit={HandleSubmit}
          className={`flex flex-wrap justify-center items-center w-11/12 mt-4
          sm:flex-col sm:h-fit sm:gap-8
          md:flex-row-reverse md:h-3/6 
          lg:mt-30`}
        >
          <div
            id="inputs-container"
            className="inputs-form flex flex-col items-center gap-5
          sm:w-full md:w-6/12 order-2"
          >
            <div id="input-group" className="input w-full">
              <input
                onChange={HandleChange}
                required
                minLength={8}
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
                minLength={8}
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
          <button
            type="submit"
            className="text-white border-2 border-white py-2 px-5 rounded-lg
            hover:bg-white hover:text-darkGrey duration-150 ease-linear order-3
            sm:text-lg md:text-xl "
          >
            {lang === "ar" ? "انشاء كلمة مرور جديدة" : "Set new password"}
          </button>
        </form>
      </div>
    </div>
  );
};
