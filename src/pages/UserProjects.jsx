import React, { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import cookie from "react-cookies";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
/////// components
import { Loading } from "../components/Loading";
import { useLang } from "../context/LangContext";
import { NotFound } from "../pages/NotFound";
import { NotFoundInList } from "../components/NotFoundInList";
import { QR } from "../components/Qr";
import { InputSearch } from "../components/inputSearch";
import { Line } from "../components/Line";
/////// layout
import MainLayout from "../Layout/MainLayout";
/////// icons
import { SecondaryBtn, SecondaryLink } from "../components/Btns";
import { PopUp } from "../components/PopUp";
import { CopyRight } from "../components/CopyRight";
import { preload } from "react-dom";

const serverPath = import.meta.env.VITE_APP_API_BASE;

export default function UserProjects() {
  preload("/assets/icon10.svg", {
    as: "image",
  });
  preload("/assets/background6.svg", {
    as: "image",
  });

  // user cookies

  const { lang } = useLang();
  const [search, setSearch] = useState("");
  const user_cookies = cookie.load("user_token");
  const { id } = useParams();
  const [listType, setListType] = useState(true);
  const [projectShowDates, setProjectShowDates] = useState([]);
  const [date, setDate] = useState();
  const navigate = useNavigate();
  // fetch user projects data
  const {
    isError,
    isLoading,
    data: filter,
  } = useQuery(
    "fetchUserProjects",
    () =>
      axios
        .get(`${serverPath}user/fetchUser/${user_cookies}`)
        .then((res) => res.data),
    {
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
  if (isLoading) {
    return <Loading />;
  }

  if (isError || id !== user_cookies || filter?.isAdmin) {
    return <NotFound />;
  }

  // user project filter and map
  const UserProjects = filter?.projectData
    ?.filter((project) => {
      if (search) {
        return project?.projectName?.toLowerCase().includes(search);
      } else {
        return project;
      }
    })
    .map((project, i) => {
      const {
        projectName,
        projectLoc,
        projectType,
        projectDate,
        projectArea,
        projectHei,
        projectDura,
        folderName,
        projectImg,
        accessUser,
        projectSubDate,
        projectOwner,
      } = project;
      const projectsInfoText = [
        {
          name: lang === "ar" ? "الموقع:" : `location:`,
          val: projectLoc,
        },
        {
          name: lang === "ar" ? "نوع المشروع:" : `type:`,
          val: projectType,
        },
        {
          name: lang === "ar" ? "التاريخ:" : `date:`,
          val: projectDate && new Date(projectDate).toISOString().split("T")[0],
        },
        {
          name: lang === "ar" ? "المساحة:" : `  area:`,
          val: projectArea,
        },
        {
          name: lang === "ar" ? "الارتفاع:" : ` height:`,
          val: projectHei,
        },
        {
          name: lang === "ar" ? "المدة:" : `duration:`,
          val: projectDura,
        },
      ];
      return (
        <div
          key={i}
          id="project-info"
          className={`grid w-full max-w-[300px] place-items-center rounded-3xl bg-lightGreen relative sm:mb-24 lg:mb-36 mt-10 grid-flow-row group`}
        >
          {/* project owner shape  */}
          {projectOwner !== filter.userName && (
            <div
              className="absolute -top-[40px] text-center capitalize text-primary-color1 text-base
              border-[3px] border-primary-color1 border-b-transparent rounded-t-3xl left-[50%] translate-x-[-50%] py-2
              w-[70%] max-w-[90%]
              lg:text-md
              md:text-sm
              sm:text-xs"
            >
              <span className="font-bold">Owner : </span>
              {projectOwner}
            </div>
          )}
          {/* image holder */}
          <div
            id="project-image-holder "
            className={`w-full h-full min-h-[200px] max-h-[300px] max-w-[300px] flex relative justify-between text-white capitalize rounded-3xl 
              before:top-0 before:invisible before:w-full before:h-full before:rounded-3xl before:absolute before:via-transparent before:ease-in-out
              before:to-transparent before:bg-gradient-to-t before:from-black/70 before:z-10 before:duration-300 before:opacity-0
              group-hover:before:visible group-hover:before:opacity-100
              `}
          >
            {projectImg?.path ? (
              <LazyLoadImage
                placeholderSrc="/assets/background6.svg"
                effect="opacity"
                className="rounded-3xl h-full w-full object-cover"
                src={projectImg?.path}
                alt={`project-image-${projectImg?.name}`}
              />
            ) : (
              <div
                className={`h-[150px] w-full bg-primary-color2 flex rounded-3xl justify-center items-center text-primary-color4 relative
              `}
              >
                No image to show
              </div>
            )}
            <span
              className={`absolute top-0 opacity-0 invisible duration-300 group-hover:visible group-hover:opacity-100 flex justify-center items-end pb-4 z-20 
            w-full h-full font-semibold rounded-b-3xl
            xl:lg
            lg:md
            md:text-sm
            sm:text-xs`}
            >
              {projectName}
            </span>
          </div>
          <Line h="0.5px" w="70%" />
          {/* project info */}
          <div className="flex flex-col w-full gap-4 justify-center items-center px-5 py-5">
            <div className="w-full grid grid-cols-2 place-items-center place-content-center gap-3">
              {projectsInfoText.map((project, li) => (
                <p
                  key={`${li}-list-info`}
                  className="gap-1 w-full font-semibold capitalize text-primary-color1 truncate
              lg:text-md
              md:text-sm
              sm:text-xs"
                >
                  {project.name}
                  <span className="font-normal ml-1 ">{project.val}</span>
                </p>
              ))}
            </div>
          </div>
          {accessUser.length >= 1 ? (
            accessUser.map((user, a) =>
              projectSubDate.length >= 1 ? (
                <SecondaryBtn
                  key={a}
                  text={
                    lang === "ar" ? "عرض تواريخ المشروع" : "show projects date"
                  }
                  style={`truncate !absolute 
                      sm:!left-[50%] sm:!translate-x-[-50%] sm:-bottom-16
                      ${
                        listType
                          ? "!bottom !left-[50%] !translate-x-[-50%] lg:-bottom-14 sm:-bottom-16"
                          : " md:bottom-3 md:left-[15%] md:translate-x-[-15%]"
                      }`}
                  action={() => {
                    setProjectShowDates({
                      folderName: folderName,
                      projectSubDate: projectSubDate,
                      userName: projectOwner,
                    });
                  }}
                />
              ) : (
                <SecondaryLink
                  key={a}
                  style={`truncate !absolute 
                    sm:!left-[50%] sm:!translate-x-[-50%] sm:-bottom-16
                    ${
                      listType
                        ? "!bottom !left-[50%] !translate-x-[-50%] lg:-bottom-14 sm:-bottom-16"
                        : " md:bottom-3 md:left-[15%] md:translate-x-[-15%]"
                    }`}
                  linkTo={`${projectOwner}/${folderName}`}
                  text={lang === "ar" ? "مشاهدة المشروع" : "view project"}
                />
              )
            )
          ) : projectSubDate.length >= 1 ? (
            <SecondaryBtn
              text={lang === "ar" ? "عرض تواريخ المشروع" : "show projects date"}
              style={`truncate !absolute 
                  sm:!left-[50%] sm:!translate-x-[-50%] sm:-bottom-16
                  ${
                    listType
                      ? "!bottom !left-[50%] !translate-x-[-50%] lg:-bottom-14 sm:-bottom-16"
                      : " md:bottom-3 md:left-[15%] md:translate-x-[-15%]"
                  }`}
              action={() => {
                setProjectShowDates({
                  folderName: folderName,
                  projectSubDate: projectSubDate,
                  userName: filter?.userName,
                });
              }}
            />
          ) : (
            <SecondaryLink
              style={`truncate !absolute 
                sm:!left-[50%] sm:!translate-x-[-50%] sm:-bottom-16
                ${
                  listType
                    ? "!bottom !left-[50%] !translate-x-[-50%] lg:-bottom-14 sm:-bottom-16"
                    : " md:bottom-3 md:left-[15%] md:translate-x-[-15%]"
                }`}
              linkTo={`${filter?.userName + "/" + folderName}`}
              text={lang === "ar" ? "مشاهدة المشروع" : "view project"}
            />
          )}
        </div>
      );
    });

  return (
    <MainLayout type="user-projects">
      <section className="h-fit  relative w-full flex flex-col items-center container max-w-full gap-8 ">
        <h3
          id="user-welcome"
          className=" w-full  text-primary-color1 pb-5 border-solid md:border-b-[1px] border-lineColor-color2 
          capitalize gap-2 font-bold
          xl:text-3xl
          lg:text-2xl
          md:text-xl md:text-center md:mb-0
          sm:text-lg sm:text-start sm:-mb-7"
        >
          {lang === "ar" ? "المشاريع" : "Your Projects "}
        </h3>
        <div className="grid place-items-start gap-8 w-full max-w-[2000px] ">
          {/* search by name */}
          <div className=" flex w-full items-center justify-start">
            {/* list  */}
            {/* <div
              id="list-type"
              className="flex gap-5 bg-zinc-300 p-[4px] rounded-lg relative
            before:w-[1px] before:h-[80%] before:bg-gray-950 before:absolute 
            before:left-[50%] before:translate-x-[-50%] before:top-[50%] before:translate-y-[-50%] 
            md:flex
            sm:hidden "
            >
              <span
                id="choose"
                className={`absolute top-[50%] translate-y-[-50%] bg-white w-7 h-7 rounded-md duration-200 ease-in-out
                ${
                  listType
                    ? lang === "ar"
                      ? "right-[5px]"
                      : "left-[5px]"
                    : lang === "ar"
                    ? "right-[60%]"
                    : "left-[60%]"
                }`}
              />
              <button
                onClick={() => setListType(true)}
                className="text-sm capitalize flex gap-3 items-center relative p-1 rounded-md"
              >
                <MdViewModule
                  className="cursor-pointer "
                  size={20}
                  color="black"
                />
              </button>
              <button
                onClick={() => setListType(false)}
                className="text-sm capitalize flex gap-3 items-center relative p-1 rounded-md"
              >
                <MdViewList
                  className="cursor-pointer "
                  size={20}
                  color="black"
                />
              </button>
            </div> */}
            <InputSearch
              style="lg:!order-1 flex "
              search={search}
              setSearch={setSearch}
              autoFocus={true}
              placeholder={lang === "ar" ? "ابحث" : "search by name "}
              onChangeHandle={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* no user found */}
          {UserProjects?.length && !isLoading >= 1 ? (
            <div
              id="projects"
              className="w-full gap-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center items-center content-center place-content-center
            "
            >
              {UserProjects}
            </div>
          ) : (
            <NotFoundInList
              text="no project found"
              color="#497B62"
              textStyle="text-primary-color1"
            />
          )}
        </div>
        {filter && <QR />}
        {/* show project dates  */}
        {projectShowDates.projectSubDate?.length >= 1 && (
          <ShowPorjectDates
            projectShowDates={projectShowDates}
            navigate={navigate}
            setDate={setDate}
            setProjectShowDates={setProjectShowDates}
            lang={lang}
            date={date}
          />
        )}
      </section>
    </MainLayout>
  );
}

const ShowPorjectDates = ({
  projectShowDates,
  navigate,
  setDate,
  setProjectShowDates,
  lang,
  date,
}) => (
  <PopUp
    type="yes-no"
    icon={<LazyLoadImage src="/assets/icon10.svg" width={100} />}
    btnText={lang === "ar" ? "مشاهدة المشروع" : "view project"}
    hidden={!date}
    yesAction={() => {
      navigate(
        projectShowDates.userName +
          "/" +
          projectShowDates.folderName +
          "/" +
          new Date(date).toISOString().split("T")[0]
      );
      setProjectShowDates([]);
      setDate();
    }}
    noAction={() => {
      setDate();
      setProjectShowDates([]);
    }}
  >
    <p
      className="font-semibold capitalize text-center 
sm:text-base
md:text-lg "
    >
      {lang === "ar" ? "اختر تاريخ المشروع" : "choose project date to show"}
    </p>
    {/* select date */}
    <div className=" w-full gap-8 flex items-center py-10 px-2 rounded-lg flex-col">
      <select
        className="select w-full border-2 outline-none focus:outline-none focus:border-primary-color2
border-primary-color1 rounded-[48px] "
        onChange={(e) => setDate(e.target.value)}
        value={date}
      >
        <option disabled selected className="capitalize " value="">
          {lang === "ar" ? "اختر تاريخ المشروع" : "choose project date to show"}
        </option>
        {projectShowDates.projectSubDate?.map((Showdate, i) => (
          <option
            className="capitalize text-primary-color2"
            key={i}
            value={Showdate}
          >
            {new Date(Showdate).toISOString().split("T")[0]}
          </option>
        ))}
      </select>
    </div>
  </PopUp>
);
