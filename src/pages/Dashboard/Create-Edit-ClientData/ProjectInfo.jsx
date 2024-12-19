import React, { useCallback, useMemo, useState } from "react";
import { useLang } from "../../../context/LangContext";
import { LazyLoadImage } from "react-lazy-load-image-component";

// components
import {
  HandleAddAccess,
  HandleRemoveAccess,
  HandleUploadImg,
  ProjectRem,
} from "../../../lib/DashboardReq";
import { Input } from "../../../components/Input";
import { SecondaryBtn } from "../../../components/Btns";

// icons
import deleteIcon from "/assets/icon6.svg";
import { MdFileDownloadDone } from "react-icons/md";
import UploadImg from "../../../components/uploadImg";

export default function ProjectInfo({
  projectInfo,
  setProjectInfo,
  setMsg,
  data,
}) {
  const [lang] = useLang();
  const langDir = lang === "ar" ? "rtl" : "ltr";

  // handle change project
  const HandleChangeProject = useCallback(
    (e, i) => {
      const { name, value } = e.target;
      setProjectInfo((prevInfo) => {
        const updated = [...prevInfo];
        if (name === "projectStatus" && value === "done") {
          delete updated[i].projectSubDate;
        } else if (name === "projectStatus" && value === "in-progress") {
          delete updated[i].projectDate;
          updated[i].projectSubDate = [""];
        } else if (name === "projectStatus" && value === null) {
          delete updated[i].projectDate;
          delete updated[i].projectSubDate;
        }
        updated[i][name] = value;
        return updated;
      });
      setMsg({});
    },
    [setProjectInfo, setMsg]
  );
  //  handle delete project image
  const HandleDeleteProjectImg = useCallback(
    (i) => {
      setProjectInfo((prevInfo) => {
        const updated = [...prevInfo];
        delete updated[i].projectImg;
        return updated;
      });
    },
    [setProjectInfo]
  );
  // handle change project dates
  const HandleChangeDates = useCallback(
    (e, index, dateIndex) => {
      const { value } = e.target;
      setProjectInfo((prevInfo) => {
        const updated = [...prevInfo];
        updated[index].projectSubDate[dateIndex] = value;
        return updated;
      });
    },
    [setProjectInfo]
  );
  // handle delete project dates
  const HandleDeleteDates = useCallback(
    (index, dateIndex) => {
      setProjectInfo((prevInfo) => {
        const updated = [...prevInfo];
        updated[index].projectSubDate.splice(dateIndex, 1);
        return updated;
      });
    },
    [setProjectInfo]
  );

  // projects info inputs
  const renderProject = useMemo(() => {
    return projectInfo.map((project, index) => {
      // inputs fields
      const InputFields = [
        {
          type: "text",
          name: "projectNo",
          text: lang === "ar" ? "رقم المشروع" : "Project Number",
          value: project.projectNo || "",
          index,
        },
        {
          type: "text",
          name: "projectName",
          text: lang === "ar" ? "اسم المشروع " : "Project Name",
          value: project.projectName || "",
          index,
        },
        {
          type: "text",
          name: "projectLoc",
          text: lang === "ar" ? "موقع المشروع" : "Project Location",
          value: project.projectLoc || "",
          index,
        },
        {
          name: "projectType",
          type: "select",
          text: lang === "ar" ? "نوع المشروع" : "Project Type",
          value: project.projectType || "",
          index,
          chooses: [
            {
              value: "",
              text: lang === "ar" ? "...اختر النوع" : "select type...",
            },
            {
              value: "commercial",
              text: lang === "ar" ? "تجاري" : "Commercial",
            },
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
        },
        {
          type: "text",
          name: "projectArea",
          text: lang === "ar" ? "منطقة المشروع" : "Project Area",
          value: project.projectArea || "",
          index,
        },
        {
          type: "text",
          name: "projectHei",
          text: lang === "ar" ? "ارتفاع المشروع" : "Project Height",
          value: project.projectHei || "",
          index,
        },
        {
          type: "text",
          name: "consultant",
          text: lang === "ar" ? "مستشار" : "Consultant",
          value: project.consultant || "",
          index,
        },
        {
          type: "text",
          name: "projectDura",
          text: lang === "ar" ? "مدة المشروع" : "Project Duration",
          value: project.projectDura || "",
          index,
        },
        {
          type: "text",
          name: "folderName",
          text: lang === "ar" ? "ملف المشروع " : "Project Folder",
          value: project.folderName || "",
          index,
        },
        {
          name: "projectStatus",
          type: "select",
          text: lang === "ar" ? "حالة المشروع" : "Project status",
          value: project.projectStatus || "",
          index,
          chooses: [
            {
              value: "",
              text: lang === "ar" ? "...اختر النوع" : "select type...",
            },
            { value: "done", text: lang === "ar" ? "جاهز" : "Done" },
            {
              value: "in-progress",
              text: lang === "ar" ? "قيد الانشاء" : "In progress",
            },
          ],
        },
        // project dates
        {
          name: "projectDateByStatus",
        },
        // access user to show project
        {
          name: "accessUser",
          index,
        },
        {
          type: "file",
          name: "projectImg",
          accept: ".jpg, .png, .jpeg, .webp",
          index,
          value: project.projectImg || "",
          style: "col-span-full min-h-[200px]",
          desc: lang === "ar" ? "رفع صورة" : "Click to upload",
        },
      ];
      if (project.projectOwner !== data.userName) {
        return (
          <div
            key={index}
            id="project-access"
            className="collapse collapse-arrow bg-primary-color1 "
          >
            <input type="checkbox" />
            <h3
              className="collapse-title font-medium text-lightGreen rounded-lg capitalize text-ellipsis
            sm:text-xs
            md:text-md
            lg:text-base"
            >
              {lang === "ar"
                ? "مشروع"
                : ` ${project.projectOwner} is the owner for project ${project.projectName} `}
            </h3>
            <div className="collapse-content flex sm:flex-col lg:flex-row ">
              <LazyLoadImage
                className="rounded-2xl object-cover
                sm:w-full md:max-w-full lg:max-w-[400px] max-h-[200px]"
                src={project.projectImg.path}
                alt={project.projectImg.name}
              />
              <div className="grid md:grid-cols-2 w-full bg-white p-4 rounded-2xl place-content-center gap-3 ">
                {InputFields.filter(
                  (input) =>
                    input.name === "projectNo" ||
                    input.name === "projectLoc" ||
                    input.name === "projectType" ||
                    input.name === "projectArea" ||
                    input.name === "projectHei" ||
                    input.name === "consultant" ||
                    input.name === "projectDura" ||
                    input.name === "projectStatus"
                ).map((input, i) => (
                  <p
                    key={i}
                    className=" font-semibold capitalize
                    sm:text-xs
                    md:text-md
                    lg:text-base"
                  >
                    {input.name}:
                    <span className="font-medium ml-2 "> {input.value}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        );
      }
      return (
        <div
          key={index}
          id="project-info"
          dir={langDir}
          className={`${
            project.projectOwner !== data.userName &&
            "before:absolute before:w-full before:h-full before:bg-white/50 before:z-40 "
          } gap-7 flex flex-col border-t-2 pt-4 border-lineColor-color1 relative
          first-of-type:border-none first-of-type:p-0`}
        >
          {project.projectOwner !== data.userName && (
            <span className="absolute top-[50%] left-[50%] z-40 text-xl capitalize font-bold">
              {project.projectOwner}
            </span>
          )}
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
              <LazyLoadImage
                src={deleteIcon}
                alt="delete-icon"
                className="sm:w-[23px] md:w-[30px]"
              />
            </button>
          </div>
          {/* Project Info Inputs */}
          <div
            id="project-data"
            className="grid place-items-center justify-items-center md:grid-cols-2 pl gap-8"
          >
            {InputFields.map((input, i) => {
              // add user access by email
              if (input.name === "accessUser") {
                return (
                  <ProjectEmailAccess
                    key={i}
                    index={index}
                    project={project}
                    projectInfo={projectInfo}
                    setProjectInfo={setProjectInfo}
                    data={data}
                    setMsg={setMsg}
                  />
                );
              } else if (input.name === "projectDateByStatus") {
                /* Show Project Dates based on Status */
                return project.projectStatus === "done" ? (
                  <Input
                    key={i}
                    containerStyle="text-primary-color2 col-span-full"
                    text={lang === "ar" ? "تاريخ المشروع" : "Project Date"}
                    name="projectDate"
                    type="date"
                    placeholder={
                      lang === "ar" ? "تاريخ المشروع" : "project date"
                    }
                    onChangeHandle={(e) => {
                      {
                        HandleChangeProject(e, index);
                      }
                    }}
                    value={
                      project.projectDate
                        ? new Date(project?.projectDate)
                            .toISOString()
                            .split("T")[0]
                        : project.projectDate
                    }
                  />
                ) : (
                  <ProjectSubDates
                    key={i}
                    project={project}
                    projectInfo={projectInfo}
                    setProjectInfo={setProjectInfo}
                    HandleDeleteDates={HandleDeleteDates}
                    HandleChangeDates={HandleChangeDates}
                    lang={lang}
                    index={index}
                  />
                );
              } else if (input.type === "file") {
                return (
                  <UploadImg
                    {...input}
                    key={i}
                    forLabel={input.name + index}
                    name={input.name}
                    iconSize={50}
                    deleteImg={(e) => {
                      HandleDeleteProjectImg(input.index);
                    }}
                    i={input.index}
                    projectInfo={projectInfo}
                    setMsg={setMsg}
                    setProjectInfo={setProjectInfo}
                  />
                );
              } else {
                return (
                  <Input
                    {...input}
                    key={i}
                    forLabel={input.name + index}
                    name={input.name}
                    onChangeHandle={(e) => {
                      {
                        HandleChangeProject(e, input.index);
                      }
                    }}
                    containerStyle={`text-primary-color2 ${
                      input.name === "projectDate" && "col-span-full"
                    } ${input.style}`}
                  />
                );
              }
            })}
          </div>
        </div>
      );
    });
  }, [projectInfo, setProjectInfo]);

  return (
    renderProject.length > 0 && (
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
        {renderProject}
      </div>
    )
  );
}

const ProjectSubDates = ({
  project,
  projectInfo,
  setProjectInfo,
  HandleDeleteDates,
  HandleChangeDates,
  lang,
  index,
}) => {
  return (
    <div
      id="project-dates"
      className="w-full flex flex-col gap-2 col-span-full items-center"
    >
      <p
        className="text-primary-color2 px-4 m-0 text-start w-full 
  sm:text-xs md:text-sm lg:text-base md:!font-[18px]"
      >
        {lang === "ar" ? "تواريخ المشروع" : "Project Dates"}
      </p>
      <div
        id="dates-container"
        className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4 items-center center"
      >
        {project.projectSubDate &&
          project.projectSubDate.map((date, dateIndex) => (
            <div
              key={dateIndex}
              id="date"
              className="relative flex bg-lightGreen w-full h-fit items-center px-4 rounded-[48px]"
            >
              <Input
                require={true}
                onChangeHandle={(e) => {
                  HandleChangeDates(e, index, dateIndex);
                }}
                name="subProjectDate"
                type="date"
                placeholder={lang === "ar" ? "تاريخ المشروع" : "project date"}
                value={date ? new Date(date).toISOString().split("T")[0] : date}
              />
              {/* delete date from sub dates */}
              <button
                type="button"
                className={`${
                  lang === "ar" ? "border-r-2 pr-4" : "border-l-2 pl-4"
                }  border-primary-color2 `}
                title="delete date"
                onClick={() => {
                  HandleDeleteDates(index, dateIndex);
                }}
              >
                <LazyLoadImage
                  src={deleteIcon}
                  alt="delete-icon"
                  className="sm:w-[18px] md:w-[25px]"
                />
              </button>
            </div>
          ))}
        {/* Add a new date */}
        <SecondaryBtn
          action={() => {
            const onChange = [...projectInfo];
            if (onChange[index].projectStatus === "in-progress") {
              onChange[index].projectSubDate = [
                ...(onChange[index].projectSubDate || []),
                "",
              ];
            }
            setProjectInfo(onChange);
          }}
          type="button"
          text={
            lang === "ar" ? "اضف مشروع من خلال التاريخ" : "Add project by date"
          }
          style="w-full"
        />
      </div>
    </div>
  );
};

const ProjectEmailAccess = ({
  project,
  index,
  projectInfo,
  setProjectInfo,
  data,
  setMsg,
}) => {
  const [lang] = useLang();
  const [EmailAccErr, setEmailAccErr] = useState();

  return (
    <div className="flex col-span-full flex-col w-full items-center py-4 ">
      <span className="border-t-2 pt-4 border-lineColor-color1 mb-4 w-[95%]" />
      <h4
        className="font-semibold text-start w-full text-primary-color1 rounded-lg capitalize mb-3
        md:text-lg
        sm:text-base"
      >
        {lang === "ar"
          ? "اعطاء صلاحية لمشاهدة المشروع"
          : "Add Access To New Users"}
      </h4>
      <div
        id="emails"
        className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4 items-center center"
      >
        {project?.accessUser?.map((projectAccess, a) => {
          return (
            <div className="relative" key={a}>
              <Input
                name="access-user"
                type="email"
                inkey={a}
                value={projectAccess.email}
                placeholder={
                  lang === "ar" ? "ادخل بريد الكتروني" : "Enter email address"
                }
                onChangeHandle={(e) => {
                  const onChange = [...projectInfo];
                  onChange[index]["accessUser"][a].email = e.target.value;
                  setProjectInfo(onChange);
                  setMsg({});
                }}
                containerStyle={`w-full col-span-full `}
              />
              {/* add & remove email buttons */}
              <div
                className={`absolute h-full items-center flex gap-2 ${
                  lang === "ar" ? "left-4" : "right-4"
                } top-[50%] translate-y-[-50%]`}
              >
                {!projectAccess._id && (
                  <button
                    disabled={!projectAccess.email}
                    type="button"
                    title="add user"
                    onClick={() => {
                      setEmailAccErr(a);
                      HandleAddAccess({
                        projectID: project._id,
                        accessEmail: projectAccess.email,
                        projectOwner: data.userName,
                        setMsg,
                        setProjectInfo,
                        setEmailAccErr,
                      });
                    }}
                  >
                    <MdFileDownloadDone
                      size={28}
                      color="#65957f"
                      className="group-disabled:opacity-50 duration-300"
                    />
                  </button>
                )}
                <span className="h-[60%] rounded-xl w-[2px] bg-white" />
                <button
                  type="button"
                  title="delete project"
                  onClick={
                    !projectAccess._id
                      ? () => {
                          const onRemove = [...projectInfo];
                          onRemove[index]["accessUser"].splice(a, 1);
                          setProjectInfo(onRemove);
                        }
                      : () => {
                          HandleRemoveAccess({
                            projectID: project._id,
                            accessEmail: projectAccess.email,
                            index,
                            projectInfo,
                            setProjectInfo,
                            a,
                            setMsg,
                          });
                        }
                  }
                >
                  <LazyLoadImage
                    src={deleteIcon}
                    alt="delete-icon"
                    className="sm:w-[18px] md:w-[25px]"
                  />
                </button>
              </div>
            </div>
          );
        })}
        <SecondaryBtn
          name="add-email"
          action={() => {
            const onChange = [...projectInfo];
            onChange[index]["accessUser"] = [
              ...onChange[index]["accessUser"],
              { email: "" },
            ];
            setProjectInfo(onChange);
          }}
          type="button"
          text={lang === "ar" ? "ادخل بريد الكتروني اخر " : "Add Email Address"}
          style={`${project.accessUser?.length >= 5 && "!hidden"} w-full`}
        />
      </div>
    </div>
  );
};
