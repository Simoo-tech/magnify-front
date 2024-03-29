import React, { lazy, useContext, useEffect, useState } from "react";
import { LanguageCon } from "../Context";
import { FaInfoCircle } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { MdErrorOutline } from "react-icons/md";
import { Oval } from "react-loader-spinner";
import { HandleSubmit, ResetLinkToken } from "../functions/CreatePassReq";

const NotFound = lazy(() => import("../component/NotFound"));

export default function CreatePass() {
  // get user id
  const resetUserID = window.localStorage.getItem("resetUserID");
  const resetToken = window.localStorage.getItem("resetToken");

  // get cookie
  const [cookies] = useCookies(["user_token"]);
  const user = cookies.user_token;
  const [validateLink, setValidateLink] = useState(true);

  useEffect(() => {
    if (resetToken) {
      ResetLinkToken({ setValidateLink });
    }
  }, [user, resetToken]);

  const { lang } = useContext(LanguageCon);

  // handle submit
  const [error, setError] = useState("");
  const [userPass, setUserPass] = useState({});
  // show password
  const [show, setShow] = useState(false);
  // loading spinner
  const [loading, setLoading] = useState(false);

  return validateLink ? (
    <div
      className="section-h w-full create-password flex justify-center items-center"
      id="create-new-password"
    >
      <div
        className=" bg-darkGrey sm:w-11/12 md:w-10/12 xl:w-8/12 h-5/6 rounded-lg flex
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
        <Form
          userPass={userPass}
          setUserPass={setUserPass}
          setError={setError}
          setShow={setShow}
          show={show}
          loading={loading}
          lang={lang}
          resetUserID={resetUserID}
          setLoading={setLoading}
          user={user}
        />
      </div>
    </div>
  ) : (
    <NotFound />
  );
}

const Form = ({
  userPass,
  setUserPass,
  setError,
  setShow,
  show,
  loading,
  lang,
  resetUserID,
  setLoading,
  user,
}) => {
  // handle change
  const HandleChange = (e) => {
    setUserPass({ ...userPass, [e.target.name]: e.target.value });
    setError(null);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        HandleSubmit({ resetUserID, setError, user, setLoading, userPass });
      }}
      className={`flex flex-wrap justify-center items-center w-11/12 mt-4
      sm:flex-col sm:h-fit sm:gap-6
      md:flex-row-reverse md:h-3/6 
      lg:mt-30`}
    >
      <div className="flex w-full md:flex-row-reverse sm:flex-col gap-5 items-center ">
        {/* input container */}
        <div
          id="inputs-container"
          className="inputs-form flex flex-col items-center gap-5
      sm:w-full md:w-6/12 order-2"
        >
          <div id="password" className="input w-full flex flex-col">
            <label
              htmlFor="password"
              className={`${
                lang === "ar" && "text-right"
              } text-lg text-white capitalize `}
            >
              {lang === "ar" ? "كلمة مرور" : "Password"}
            </label>
            <input
              onChange={HandleChange}
              required
              maxLength={16}
              type={show ? "text" : "password"}
              value={userPass.password}
              name="password"
              id="password"
              className={`sm:py-2 sm:px-3 md:py-3 md:px-4 w-full rounded-lg outline-none 
            border-color1 ${
              lang === "ar" ? "text-end border-l-4" : "text-start border-r-4"
            }`}
            />
          </div>
          <div id="password-confirm" className="input w-full flex flex-col">
            <label
              htmlFor="passwordcon"
              className={`${
                lang === "ar" && "text-right"
              } text-lg text-white capitalize `}
            >
              {lang === "ar" ? "أعد إدخال كلمة السر" : "Retype Password"}
            </label>
            <input
              onChange={HandleChange}
              required
              maxLength={16}
              type={show ? "text" : "password"}
              value={userPass.passwordcon}
              name="passwordcon"
              id="passwordcon"
              className={`sm:py-2 sm:px-3 md:py-3 md:px-4 w-full rounded-lg outline-none 
  border-color1 ${
    lang === "ar" ? "text-end border-l-4" : "text-start border-r-4"
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
            {lang === "ar" ? ": كلمة المرور يجب ان تكون" : "Password must be:"}
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
  );
};
