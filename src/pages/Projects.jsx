import "../App.css";
import { Navigate, useOutletContext, useParams } from "react-router-dom";
import cookie from "react-cookies";
import { useEffect, useState } from "react";
import video1 from "/assest/logo animation.mp4";
import { useLang } from "../context/LangContext";

const folderName = import.meta.env.VITE_APP_PROJECTS_FOLDER;
const user_cookies = cookie.load("user_token");

export default function Projects() {
  const [data] = useOutletContext();
  const [loading, setLoading] = useState(true);
  const { projectId } = useParams();
  const projects = data.projectInfo;
  const [lang] = useLang();
  const folder = projects?.map((project) => {
    return project.folderName;
  });

  const checkID = folder?.includes(projectId);

  useEffect(() => {
    if (!user_cookies) {
      window.location.assign("/");
    }
  }, []);

  return checkID ? (
    <>
      {/* loading screen */}
      {loading ? (
        <div className="absolute top-0 left-0 container max-w-full bg-white w-full h-full gap-10 z-50 justify-center items-center flex flex-col-reverse">
          <span className="sm:text-sm md:text-base lg:text-lg text-primary-color1 text-center">
            {lang === "ar"
              ? "مشروعك قيد التجهيز, برجاء الانتظار"
              : "ًWe are preparing your project, Please wait"}
          </span>
          <video
            className="sm:w-[50%] md:w-[40%] lg:w-[20%]"
            autoPlay
            playsInline
            muted
            loop
          >
            <source src={video1} type="video/mp4" />
          </video>
        </div>
      ) : (
        <></>
      )}
      <iframe
        title="3dvista-user"
        src={`${folderName}${data?.userName}/${projectId}/index.htm`}
        name={data?.userName}
        onLoad={() => setLoading(false)}
        className="h-full w-full absolute top-0 z-50"
      />
    </>
  ) : (
    <Navigate to="/" replace />
  );
}
