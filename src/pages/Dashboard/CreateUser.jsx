// components
import {
  AddProject,
  HandleSubmitCreate,
  HandleSubmitEdit,
} from "../../lib/DashboardReq";
import { SecondaryBtn } from "../../components/Btns";
// icons
import { IoIosClose } from "react-icons/io";
// libraryies
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLang } from "../../context/LangContext";
import UserInfo from "./Create-Edit-ClientData/UserInfo";
import ProjectInfo from "./Create-Edit-ClientData/ProjectInfo";
import { NotFound } from "../../components/NotFound";
import { Loading } from "../../components/Loading";
import { useQuery } from "react-query";
import axios from "axios";
import cookie from "react-cookies";

const user_cookies = cookie.load("user_token");
const serverPath = import.meta.env.VITE_APP_API_BASE;

export function CreateUser({ cleintData }) {
  const [data, setData] = useState({});
  const [projectInfo, setProjectInfo] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (cleintData) {
      setData(cleintData);
      setProjectInfo(cleintData.projectInfo);
    }
  }, [cleintData]);

  // handle message from api
  const [msg, setMsg] = useState({});
  // context
  const [lang] = useLang();

  // fetch data
  const { isLoading, data: checkAdmin } = useQuery("checkIfAdmin", () =>
    axios
      .get(`${serverPath}user/${user_cookies}`)
      .then((res) => res.data.isAdmin)
  );

  if (isLoading) {
    return <Loading />;
  }

  // check user
  if ((id !== user_cookies || !checkAdmin) && !isLoading) {
    return <NotFound />;
  }

  return (
    <section
      id="create-user"
      className="container max-w-full bg-center w-full h-dvh z-30 bg-white"
    >
      {/* alert message */}
      {msg.active && (
        <span
          className={`rounded-lg font-normal truncate ${
            msg.type === "success" ? "bg-lightGreen" : "bg-errorContainer"
          } z-40 absolute top-5 left-[50%] translate-x-[-50%] px-4 flex items-center text-black justify-center gap-2 
          md:text-[16px] md:py-3
          sm:text-xs sm:py-2`}
        >
          <msg.icon
            color={msg.type === "success" ? "497B62" : "BD5151"}
            size={25}
          />
          {msg.text}
          <button className="ml-2" onClick={() => setMsg({})}>
            <IoIosClose size={22} />
          </button>
        </span>
      )}
      <Form
        setData={setData}
        data={data}
        projectInfo={projectInfo}
        setProjectInfo={setProjectInfo}
        setMsg={setMsg}
        cleintData={cleintData}
        lang={lang}
      />
    </section>
  );
}

const Form = ({
  setData,
  data,
  projectInfo,
  setProjectInfo,
  setMsg,
  cleintData,
  lang,
}) => {
  const navigate = useNavigate();
  // loading spinner
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="flex flex-col w-full h-full overflow-hidden gap-5"
      onSubmit={
        cleintData
          ? (e) => {
              e.preventDefault();
              HandleSubmitEdit({
                setLoading,
                data,
                projectInfo,
                cleintData,
                setMsg,
                navigate,
              });
            }
          : (e) => {
              e.preventDefault();
              HandleSubmitCreate({
                setLoading,
                data,
                projectInfo,
                setMsg,
                navigate,
              });
            }
      }
      autoComplete="off"
    >
      <div className="w-full h-full overflow-y-auto max-h-full gap-16 flex items-center flex-col pt-10">
        <h2 className="text-2xl text-center text-primary-color2 capitalize font-semibold">
          {cleintData
            ? lang === "ar"
              ? "تعديل بيانات مستخدم"
              : "edit user"
            : lang === "ar"
            ? "انشاء مستخدم جديد"
            : "create new user"}
        </h2>
        {/* user info */}
        <UserInfo data={data} setData={setData} setMsg={setMsg} />
        {/* projects info */}
        <ProjectInfo
          projectInfo={projectInfo}
          setProjectInfo={setProjectInfo}
          cleintData={cleintData}
          setMsg={setMsg}
          data={data}
        />
      </div>
      {/* add project btn */}
      <div
        id="buttons"
        className=" w-full flex justify-center items-center gap-8 border-t-2 py-5
        md:flex-row
        sm:flex-col"
      >
        {/* cancel btn */}
        <SecondaryBtn
          name="cancel-btn"
          style="!px-20 !py-2 text-base"
          text={lang === "en" || lang === null ? "cancel" : "الغاء"}
          type="button"
          action={() => navigate(-1)}
        />
        <SecondaryBtn
          action={() => {
            AddProject({ setProjectInfo, projectInfo });
          }}
          text={lang === "ar" ? "اضف مشروع جديد" : "Add New Project"}
          type="button"
        />
        {/* create user btn */}
        <SecondaryBtn
          loading={loading}
          name="submit-btn"
          style="!px-20 !py-2 text-base"
          text={
            cleintData
              ? lang === "en" || lang === null
                ? "save edit"
                : "حفظ التعديلات"
              : lang === "en" || lang === null
              ? "create user"
              : "انشاء مستخدم"
          }
          type="submit"
        />
      </div>
    </form>
  );
};
