import React, { useCallback, useMemo, useState } from "react";
import { useLang } from "../../../context/LangContext";
import { LazyLoadImage } from "react-lazy-load-image-component";

// components
import {
  emailRemove,
  HandleUploadImg,
  ProjectRem,
} from "../../../lib/DashboardReq";
import { Input } from "../../../components/Input";
import { SecondaryBtn } from "../../../components/Btns";

// icons
import deleteIcon from "/assets/icon6.svg";

export default function ProjectInfo({
  projectInfo,
  setProjectInfo,
  setMsg,
  data,
}) {
  const [lang] = useLang();
  const langDir = lang === "ar" && "rtl";
  const [uploading, setUploading] = useState();

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
          name: "projectStatus",
          type: "select",
          text: lang === "ar" ? "حالة المشروع" : "Project status",
          value: project.projectStatus,
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
          {!project.projectOwner && (
            <p className="bg-primary-color2 text-white py-2 px-4 mt-5 rounded-2xl w-fit sm:text-xs md:text-sm">
              {lang === "ar"
                ? "هذا الحساب ليس مالك المشروع"
                : "This user is not the owner for this project"}
            </p>
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
            className="grid place-items-center md:grid-cols-2 pl gap-8"
          >
            {InputFields.map((input, i) => {
              // add user access by email
              if (input.name === "accessUser" && project.projectOwner) {
                return (
                  <div
                    key={i}
                    className="flex col-span-full flex-col w-full items-center py-4 "
                  >
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
                      {project.accessUser.map((email, a) => {
                        return (
                          <div className="relative">
                            <Input
                              name="access-user"
                              type="email"
                              inkey={a}
                              value={email.email}
                              placeholder={
                                lang === "ar"
                                  ? "ادخل بريد الكتروني"
                                  : "Enter email address"
                              }
                              onChangeHandle={(e) => {
                                const onChange = [...projectInfo];
                                onChange[index]["accessUser"][a].userName =
                                  data.userName;
                                onChange[index]["accessUser"][a].email =
                                  e.target.value;
                                onChange[index]["accessUser"][
                                  a
                                ].projectOwner = false;
                                setProjectInfo(onChange);
                                setMsg({});
                              }}
                              containerStyle={`w-full col-span-full`}
                            />
                            <button
                              type="button"
                              className={`absolute ${
                                lang === "ar" ? "left-4" : "right-4"
                              } top-[50%] translate-y-[-50%]`}
                              title="delete project"
                              onClick={() => {
                                emailRemove({
                                  index,
                                  projectInfo,
                                  setProjectInfo,
                                  a,
                                });
                              }}
                            >
                              <LazyLoadImage
                                src={deleteIcon}
                                alt="delete-icon"
                                className="sm:w-[18px] md:w-[25px]"
                              />
                            </button>
                          </div>
                        );
                      })}
                      <SecondaryBtn
                        action={() => {
                          const onChange = [...projectInfo];
                          onChange[index]["accessUser"] = [
                            ...onChange[index]["accessUser"],
                            { email: "" },
                          ];
                          setProjectInfo(onChange);
                        }}
                        type="button"
                        text={
                          lang === "ar"
                            ? "ادخل بريد الكتروني اخر "
                            : "Add Another Email Address"
                        }
                        style={`${
                          project.accessUser.length >= 5 && "!hidden"
                        } w-full`}
                      />
                    </div>
                  </div>
                );
              } else if (input.name === "projectDateByStatus") {
                /* Show Project Dates based on Status */
                return (
                  <>
                    {project.projectStatus === "done" && (
                      <Input
                        onChangeHandle={(e) => {
                          {
                            HandleChangeProject(e, index);
                          }
                        }}
                        text={lang === "ar" ? "تاريخ المشروع" : "Project Date"}
                        name="projectDate"
                        type="date"
                        placeholder={
                          lang === "ar" ? "تاريخ المشروع" : "project date"
                        }
                        value={
                          project.projectDate
                            ? new Date(project?.projectDate)
                                .toISOString()
                                .split("T")[0]
                            : project.projectDate
                        }
                        containerStyle="text-primary-color2 col-span-full"
                        labelStlye="sm:text-sm md:!font-[18px]"
                      />
                    )}
                    {project.projectStatus === "in-progress" && (
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
                                id="date"
                                className="relative flex bg-lightGreen w-full h-fit items-center px-4 rounded-[48px]"
                              >
                                <Input
                                  inkey={dateIndex}
                                  require={true}
                                  onChangeHandle={(e) => {
                                    HandleChangeDates(e, index, dateIndex);
                                  }}
                                  name="subProjectDate"
                                  type="date"
                                  placeholder={
                                    lang === "ar"
                                      ? "تاريخ المشروع"
                                      : "project date"
                                  }
                                  value={
                                    date
                                      ? new Date(date)
                                          .toISOString()
                                          .split("T")[0]
                                      : date
                                  }
                                />
                                {/* delete date from sub dates */}
                                <button
                                  type="button"
                                  className={`${
                                    lang === "ar"
                                      ? "border-r-2 pr-4"
                                      : "border-l-2 pl-4"
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
                              if (
                                onChange[index].projectStatus === "in-progress"
                              ) {
                                onChange[index].projectSubDate = [
                                  ...(onChange[index].projectSubDate || []),
                                  "",
                                ];
                              }
                              setProjectInfo(onChange);
                            }}
                            type="button"
                            text={
                              lang === "ar"
                                ? "اضف مشروع من خلال التاريخ"
                                : "Add project by date"
                            }
                            style="w-full"
                          />
                        </div>
                      </div>
                    )}
                  </>
                );
              } else {
                return (
                  <Input
                    inkey={i}
                    {...input}
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
                    containerStyle={`text-primary-color2 ${
                      input.name === "projectDate" && "col-span-full"
                    } ${input.style}`}
                    labelStlye="sm:text-sm md:!font-[18px]"
                    iconSize={50}
                    deleteImg={(e) => {
                      HandleDeleteProjectImg(input.index);
                    }}
                    uploading={uploading}
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
    projectInfo.length > 0 && (
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
