import React, { useContext, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { FaBuildingFlag } from "react-icons/fa6";
import { LanguageCon } from "../Context";
import { QR } from "../component/Qr";
import { Header } from "../component/Header";

export const UserProjects = () => {
  const navigate = useNavigate();
  const verify_email = window.localStorage.getItem("verify-email");
  const { lang } = useContext(LanguageCon);
  // user cookies
  const [cookies] = useCookies(["user_token"]);
  const user = cookies.user_token;
  const project = user.projectInfo;
  const userID = window.localStorage.getItem("userID");

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (!user.verified) {
      navigate(`/verified-email/${userID}`);
    } else if (!user.passChanged) {
      window.location.assign(`/create-password/${verify_email}`);
    }
  }, []);

  return project.length === 1 ? (
    <>
      <iframe
        title="3dvista-user"
        src={`${process.env.REACT_APP_FOLDER}${user.userName}/${project[0].folderName}/index.htm`}
        name={user.userName}
        allowFullScreen
        className="h-full w-full "
      />
      {user && <QR />}
    </>
  ) : (
    <>
      <Header />
      <div className="section-h flex justify-center relative bg-color1 overflow-hidden ">
        <div className="container flex justify-center items-center flex-col h-full w-full ">
          <div className="user-project-data w-full h-fit py-6 overflow-scroll flex gap-5 justify-center flex-wrap">
            {project.map((project, i) => (
              <div
                key={i}
                className="project flex flex-col flex-wrap sm:w-full  lg:w-5/12 "
              >
                <div className="top flex w-full bg-darkGrey py-2 justify-between items-center px-4 text-white capitalize rounded-t-xl">
                  <h4
                    className={`flex gap-2 ${
                      lang === "ar" && "flex-row-reverse"
                    } text-lg font-semibold`}
                  >
                    {lang === "ar" ? ":الاسم" : `name:`}
                    <span>{project.projectName}</span>
                  </h4>
                  <h4
                    className={`flex gap-2 ${
                      lang === "ar" && "flex-row-reverse"
                    } text-lg font-semibold`}
                  >
                    {lang === "ar" ? ":رقم" : `number:`}
                    <span>{project.projectNo}</span>
                  </h4>
                </div>
                <div className="middle bg-[#ddd] flex flex-wrap  py-2 px-4 border-4 border-darkGrey">
                  <h4 className="w-full text-center my-5 text-xl underline capitalize  font-semibold">
                    {lang === "ar" ? "معلومات المشروع" : `project information`}
                  </h4>
                  <p
                    className={`gap-1 ${
                      lang === "ar" && "flex-row-reverse"
                    } flex sm:w-full md:w-6/12 font-semibold text-base capitalize text-center mb-5`}
                  >
                    {lang === "ar" ? ":موقع" : `location:`}
                    <span className="font-normal ml-1">
                      {project.projectLoc}
                    </span>
                  </p>
                  <p
                    className={`gap-1 ${
                      lang === "ar" && "flex-row-reverse"
                    } flex sm:w-full md:w-6/12 font-semibold text-base capitalize text-center mb-5`}
                  >
                    {lang === "ar" ? ":نوع المشروع" : `type:`}
                    <span className="font-normal ml-1">
                      {project.projectType}
                    </span>
                  </p>
                  <p
                    className={`gap-1 ${
                      lang === "ar" && "flex-row-reverse"
                    } flex sm:w-full md:w-6/12 font-semibold text-base capitalize text-center mb-5`}
                  >
                    {lang === "ar" ? ":مستشار" : `consultant:`}
                    <span className="font-normal ml-1">
                      {project.consultant}
                    </span>
                  </p>
                  <p
                    className={`gap-1 ${
                      lang === "ar" && "flex-row-reverse"
                    } flex sm:w-full md:w-6/12 font-semibold text-base capitalize text-center mb-5`}
                  >
                    {lang === "ar" ? ":الموقع" : `  area:`}
                    <span className="font-normal ml-1">
                      {project.projectArea}
                    </span>
                  </p>
                  <p
                    className={`gap-1 ${
                      lang === "ar" && "flex-row-reverse"
                    } flex sm:w-full md:w-6/12 font-semibold text-base capitalize text-center mb-5`}
                  >
                    {lang === "ar" ? ":ارتفاع" : ` height:`}
                    <span className="font-normal ml-1">
                      {project.projectHei}
                    </span>
                  </p>
                  <p
                    className={`gap-1 ${
                      lang === "ar" && "flex-row-reverse"
                    } flex sm:w-full md:w-6/12 font-semibold text-base capitalize text-center mb-5`}
                  >
                    {lang === "ar" ? ":المدة" : `duration:`}
                    <span className="font-normal ml-1">
                      {project.projectDura}
                    </span>
                  </p>
                </div>
                <Link
                  to={`${project.folderName}`}
                  className="bottom text-lg capitalize bg-darkGrey py-2 flex self-end gap-2 
          items-center justify-center w-fit px-4 text-white rounded-b-xl hover:bg-color1"
                >
                  {lang === "ar" ? "مشاهدة المشروع" : "view project"}
                  <FaBuildingFlag />
                </Link>
              </div>
            ))}
          </div>
        </div>
        {user && <QR />}
      </div>
      <Outlet />
    </>
  );
};
