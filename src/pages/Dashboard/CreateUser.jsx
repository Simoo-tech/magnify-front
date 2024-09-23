// components
import {
  AddProject,
  HandleSubmitCreate,
  HandleSubmitEdit,
  HandleUploadImg,
  ProjectRem,
} from "../../lib/DashboardReq";
import { PrimaryBtn, SecondaryBtn } from "../../component/Btns";
import { Input } from "../../component/Input";
// icons
import { IoIosClose } from "react-icons/io";
import deleteIcon from "/assest/icon6.svg";
// libraryies
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "../../context/LangContext";

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
  const [uploading, setUploading] = useState();
  // styles
  const langDir = lang === "ar" && "rtl";

  // handle change user data
  const HandleChangeUser = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setMsg({});
  };
  // handle change project
  const HandleChangeProject = (e, i) => {
    const { name, value } = e.target;
    const onChange = [...projectInfo];
    onChange[i][name] = value;
    setProjectInfo(onChange);
    setMsg({});
  };
  const HandleDeleteProjectImg = (e, i) => {
    const onChange = [...projectInfo];
    delete onChange[i].projectImg;
    setProjectInfo(onChange);
  };

  // loading spinner
  const [loading, setLoading] = useState(false);
  // user info inputs
  const InputFieldsUserInfo = [
    {
      type: "text",
      name: "userName",
      style: "col-span-full",
      text: lang === "ar" ? "اسم المستخدم" : "User Name",
      value: data.userName,
      onChange: HandleChangeUser,
    },
    {
      type: "text",
      name: "fname",
      text: lang === "ar" ? "الاسم الاول" : "First Name",
      value: data.fname,
      onChange: HandleChangeUser,
    },
    {
      type: "text",
      name: "lname",
      text: lang === "ar" ? "الاسم الاخير" : "Last Name",
      value: data.lname,
      onChange: HandleChangeUser,
    },
    {
      type: "text",
      name: "email",
      text: lang === "ar" ? "البريد الالكتروني " : "E-mail",
      value: data.email,
      onChange: (e) => {
        const email = e.target.value.toLocaleLowerCase();
        setData({ ...data, email });
        setMsg({});
      },
    },
    {
      type: "phone",
      text: lang === "ar" ? "رقم الهالتف" : "Phone Number",
      value: `${data.phone}`,
      onChange: (e) => {
        setData({ ...data, phone: e });
        setMsg({});
      },
    },
  ];
  // projects info inputs
  const Projects = projectInfo.map((project, index) => {
    // inputs fields
    const InputFieldsProjectInfo = [
      {
        type: "text",
        name: "projectNo",
        text: lang === "ar" ? "رقم المشروع" : "Project Number",
        value: project.projectNo,
        index,
      },
      {
        type: "text",
        name: "projectName",
        text: lang === "ar" ? "اسم المشروع " : "Project Name",
        value: project.projectName,
        index,
      },
      {
        type: "text",
        name: "projectLoc",
        text: lang === "ar" ? "موقع المشروع" : "Project Location",
        value: project.projectLoc,
        index,
      },
      {
        name: "projectType",
        type: "select",
        text: lang === "ar" ? "نوع المشروع" : "Project Type",
        value: project.projectType,
        index,
        chooses: [
          {
            value: "",
            text: lang === "ar" ? "...اختر النوع" : "select type...",
          },
          { value: "commercial", text: lang === "ar" ? "تجاري" : "Commercial" },
          {
            value: "residential",
            text: lang === "ar" ? "سكني" : "Residential",
          },
          {
            value: "industrial",
            text: lang === "ar" ? "صناعي " : "Industrial",
          },
          {
            value: "infrastructure",
            text: lang === "ar" ? " بنية تحتية" : "Infrastructure",
          },
        ],
        onChange: "",
      },
      {
        type: "text",
        name: "projectArea",
        text: lang === "ar" ? "منطقة المشروع" : "Project Area",
        value: project.projectArea,
        index,
      },
      {
        type: "text",
        name: "projectHei",
        text: lang === "ar" ? "ارتفاع المشروع" : "Project Height",
        value: project.projectHei,
        index,
      },
      {
        type: "text",
        name: "consultant",
        text: lang === "ar" ? "مستشار" : "Consultant",
        value: project.consultant,
        index,
      },
      {
        type: "text",
        name: "projectDura",
        text: lang === "ar" ? "مدة المشروع" : "Project Duration",
        value: project.projectDura,
        index,
      },
      {
        type: "text",
        name: "folderName",
        text: lang === "ar" ? "ملف المشروع " : "Project Folder",
        value: project.folderName,
        index,
      },
      {
        type: "date",
        name: "projectDate",
        text: lang === "ar" ? "تاريخ المشروع" : "Project Date",
        value: project.projectDate
          ? new Date(project?.projectDate).toISOString().split("T")[0]
          : project.projectDate,
        index,
      },
      {
        type: "file",
        name: "projectImg",
        accept: ".jpg, .png, .jpeg",
        index,
        value: project.projectImg,
        style: "col-span-full min-h-[200px]",
        desc: lang === "ar" ? "رفع صورة" : "Click to upload",
      },
    ];
    return (
      <div
        key={index}
        id="project-info"
        dir={langDir}
        className=" gap-7 flex flex-col border-t-2 border-lineColor-color1
        first-of-type:border-none first-of-type:p-0"
      >
        {/*  project number and delete */}
        <div id="project-number" className="w-full justify-between flex ">
          <h3
            className="font-medium text-primary-color1 rounded-lg capitalize
          md:text-xl
          sm:text-lg "
          >
            {lang === "ar" ? "مشروع" : "project"}
            <span className="mx-3">
              {index + 1 < 10 ? "0" + (index + 1) : index + 1}
            </span>
          </h3>
          <button
            type="button"
            title="delete project"
            onClick={() => ProjectRem({ index, projectInfo, setProjectInfo })}
          >
            <img
              loading="lazy"
              src={deleteIcon}
              alt="delete-icon"
              className="sm:w-[23px] md:w-[30px]"
            />
          </button>
        </div>
        <div id="project-data" className="grid md:grid-cols-2 pl gap-8">
          {InputFieldsProjectInfo.map((input, i) => {
            return (
              <Input
                type={input.type}
                key={i}
                name={input.name}
                value={input.value}
                text={input.text}
                accept={input.accept}
                desc={input.desc}
                uploading={uploading}
                onChangeHandle={
                  input.type === "file"
                    ? (e) => {
                        HandleUploadImg({
                          e,
                          i: input.index,
                          projectInfo,
                          setMsg,
                          setProjectInfo,
                          setUploading,
                        });
                      }
                    : (e) => {
                        {
                          HandleChangeProject(e, input.index);
                        }
                      }
                }
                containerStyle={`text-primary-color2 ${input.style}`}
                labelStlye="sm:text-sm md:!font-[18px]"
                chooses={input.chooses}
                iconSize={50}
                deleteImg={(e) => {
                  HandleDeleteProjectImg(e, input.index);
                }}
              />
            );
          })}
        </div>
      </div>
    );
  });

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
      <div
        id="user-info"
        className="pb-10 w-full flex flex-col gap-10 
        md:px-10"
      >
        <h2
          dir={langDir}
          className="text-primary-color1 capitalize font-semibold 
          md:text-xl
          sm:text-lg"
        >
          {lang === "ar" ? "معلومات المستخدم" : "user information"}
        </h2>
        {/* inputs container */}
        <div id="user-data" className="grid md:grid-cols-2 gap-5 ">
          {InputFieldsUserInfo.map((input, i) => {
            return (
              <Input
                type={input.type}
                key={i}
                name={input.name}
                value={input.value}
                text={input.text}
                onChangeHandle={input.onChange}
                containerStyle={`text-primary-color2 ${input.style}`}
                inputContainerStyle="!px-6"
                labelStlye="sm:text-sm md:!font-[18px]"
              />
            );
          })}
        </div>
      </div>
      {/* projects info */}
      {projectInfo.length > 0 && (
        <div
          id="projects-info"
          className="pt-16 w-full flex flex-col gap-10 border-t-2 border-lineColor-color1
          md:px-10"
        >
          <h2
            dir={langDir}
            className="text-primary-color1 capitalize font-semibold mb-3
            md:text-xl
            sm:text-lg"
          >
            {lang === "ar" ? "معلومات المشروع" : "project information"}
          </h2>
          {Projects}
          {/* project inputs containers */}
        </div>
      )}
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
