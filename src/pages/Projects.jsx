import "../App.css";
import cookie from "react-cookies";
import { useEffect, useState } from "react";
import video1 from "/assets/logo animation.mp4";
import { useLang } from "../context/LangContext";
import { useParams } from "react-router-dom";
import { NotFound } from "../pages/NotFound";

const ServerUrl = import.meta.env.VITE_APP_PROJECTS_FOLDER;
const user_cookies = cookie.load("user_token");

export default function Projects() {
  const [loading, setLoading] = useState(true);
  const { lang } = useLang();
  const { id } = useParams();

  useEffect(() => {
    if (!user_cookies) {
      window.location.assign("/");
    }
  }, []);

  const projectFolder_Date = window.location.href.split("/").slice(5).join("/");

  if (id !== user_cookies) {
    return <NotFound />;
  }
  return (
    <>
      {/* loading screen */}
      {loading && (
        <div className="container max-w-full bg-white w-full h-full gap-10 z-50 justify-center items-center flex flex-col-reverse">
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
      )}
      <iframe
        title="3dvista-user"
        src={`${ServerUrl}${projectFolder_Date}/index.htm`}
        onLoad={() => setLoading(false)}
        className="h-full w-full absolute top-0 z-50"
      />
    </>
  );
}
