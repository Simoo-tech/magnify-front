// components
import {
  AddProject,
  HandleSubmitCreate,
  HandleSubmitEdit,
} from "../../lib/DashboardReq";
import { PrimaryBtn, SecondaryBtn } from "../../component/Btns";
// icons
import { IoIosClose } from "react-icons/io";
// libraryies
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "../../context/LangContext";
import UserInfo from "../../component/Create-Edit-ClientData/UserInfo";
import ProjectInfo from "../../component/Create-Edit-ClientData/ProjectInfo";

export function CreateUser({ userData }) {
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
  // context
  const [lang] = useLang();

  return (
    <section
      id="create-user"
      className={`absolute z-30 container max-w-full ${
        animation ? "top-14" : "top-96"
      } left-0 duration-200 ease-in-out bg-center w-full h-full z-30 bg-white overflow-y-scroll`}
    >
      {/* alert message */}
      {msg.active && (
        <span
          className={`fixed top-16 left-[50%] translate-x-[-50%] rounded-lg font-normal  truncate ${
            msg.type === "success" ? "bg-lightGreen" : "bg-errorContainer"
          } z-40  px-4 flex items-center text-black justify-center gap-2 
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
        userData={userData}
        lang={lang}
        animation={animation}
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
  userData,
  lang,
}) => {
  const navigate = useNavigate();
  // loading spinner
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="flex flex-col w-full pt-12 pb-24 items-center gap-16 lg:px-28"
      onSubmit={
        userData
          ? (e) => {
              e.preventDefault();
              HandleSubmitEdit({
                setLoading,
                data,
                projectInfo,
                userData,
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
      <h1
        className="truncate capitalize text-center font-bold text-primary-color1 
      md:text-2xl
      sm:text-xl"
      >
        {userData
          ? lang === "ar"
            ? "تعديل علي مستخدم "
            : "edit user"
          : lang === "ar"
          ? "انشاء مستخدم جديد"
          : "create a new user"}
      </h1>
      {/* user info */}
      <UserInfo data={data} setData={setData} setMsg={setMsg} />
      {/* projects info */}
      <ProjectInfo
        projectInfo={projectInfo}
        setProjectInfo={setProjectInfo}
        userData={userData}
        setMsg={setMsg}
        data={data}
      />
      {/* add project btn */}
      <div
        id="buttons"
        className=" w-full flex justify-center items-center gap-8 border-t-2 border-lineColor-color1 pt-10
        md:flex-row
        sm:flex-col"
      >
        <PrimaryBtn
          style="!text-primary-color1 !border-primary-color1 !py-2 !px-12 text-base
          hover:!bg-primary-color1 hover:!text-white "
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
            userData
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
