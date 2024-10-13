import React, { Suspense, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import cookie from "react-cookies";
/////// components
import { Loading } from "../component/Loading";
import { useLang } from "../context/LangContext";
import { InputSearch } from "../component/inputSearch";
import { NotFound } from "../component/NotFound";
import { NotFoundInList } from "../component/NotFoundInList";
import { QR } from "../component/Qr";
/////// layout
import MainLayout from "../MainLayout";
/////// assest
import BackgroundImg from "/assest/background6.svg";
/////// icons
import { MdViewList, MdViewModule } from "react-icons/md";

const serverPath = import.meta.env.VITE_APP_API_BASE;
const projectSrc = import.meta.env.VITE_APP_PROJECTS_FOLDER;

export default function UserProjects() {
  // user cookies
  const [lang] = useLang();
  const [search, setSearch] = useState();
  const user_cookies = cookie.load("user_token");
  const [filter, setFilter] = useState([]);
  const { id } = useParams();
  const [listType, setListType] = useState(true);
  // fetch user projects data
  const { isLoading, error } = useQuery(
    "fetchUserProjects",
    () => {
      return axios.get(`${serverPath}user/${user_cookies}`);
    },
    {
      onSuccess: (res) => setFilter(res.data),
    }
  );
  if (isLoading) {
    return <Loading />;
  }

  const { projectInfo, userName, isAdmin } = filter;
  if (error || id !== user_cookies || isAdmin) {
    return <NotFound />;
  }

  // if user has one project
  if (projectInfo?.length === 1) {
    return (
      <>
        <iframe
          title="3dvista-user"
          src={`${projectSrc}${userName}/${projectInfo[0].folderName}/index.htm`}
          name={userName}
          allowFullScreen
          className="h-full w-full "
        />
        {filter && <QR />}
      </>
    );
  }

  const langDir = lang === "ar" && "rtl";

  // user project filter and map
  const UserProjects = projectInfo
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
          val: new Date(projectDate).toISOString().split("T")[0],
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
        <>
          {/* // list style */}
          <div
            id="project-info"
            className={`flex flex-col flex-wrap rounded-3xl bg-lightGreen relative        
          xl:w-[30%]
          lg:w-[40%]
          md:w-5/12
          sm:w-full sm:mb-16 sm:flex
            ${!listType && "md:hidden lg:hidden"} `}
          >
            {/* image holder */}
            <div
              id="project-image-holder "
              className="flex relative justify-between text-white capitalize rounded-3xl "
            >
              {projectImg?.path ? (
                <img
                  loading="eager"
                  className="rounded-3xl object-cover"
                  src={projectImg?.path}
                  style={{ width: "100%", maxHeight: "240px" }}
                  alt={`project-image-${projectImg?.name}`}
                />
              ) : (
                <div className="min-h-[240px] flex justify-center items-center w-full text-textColor">
                  No photos for your project
                </div>
              )}
              <span
                className="absolute top-0 left-0 flex justify-center items-end pb-4 from-black/70
            via-transparent to-transparent bg-gradient-to-t w-full h-full font-semibold rounded-b-3xl
            xl:text-[20px]
            lg:text-[18px]
            md:text-sm
            sm:text-xs"
              >
                {projectName}
              </span>
            </div>
            {/* project info */}
            <div className="middle flex flex-wrap py-5 gap-2 justify-center">
              {projectsInfoText.map((project, li) => (
                <p
                  key={`${li}-list-info`}
                  className="gap-1 flex w-5/12 font-semibold capitalize text-center mb-5 text-primary-color1 truncate
              lg:text-sm
              md:text-xs
              sm:text-[13px]"
                >
                  {project.name}
                  <span className="font-normal ml-1 ">{project.val}</span>
                </p>
              ))}
            </div>
            <Link
              to={`${folderName}`}
              className="bottom text-base capitalize truncate bg-primary-color1 py-2 px-10 gap-2 rounded-3xl
            text-white roundeda-xl duration-300
            absolute left-[50%] translate-x-[-50%]
            hover:bg-primary-color1/70
            lg:-bottom-14
            sm:-bottom-16"
            >
              {lang === "ar" ? "مشاهدة المشروع" : "view project"}
            </Link>
          </div>
          {/* // gallery style */}
          <div
            id="project-info"
            className={`w-full rounded-3xl bg-lightGreen relative 
            sm:hidden
          ${!listType && "md:flex lg:flex"} `}
          >
            {/* image holder */}
            <div
              id="project-image-holder "
              className="flex relative justify-between text-white capitalize rounded-3xl w-5/12 before:absolute before:rounded-3xl
            before:w-full before:h-full before:from-black/70 before:bg-gradient-to-t before:to-transparent  before:via-transparent"
            >
              {projectImg?.path ? (
                <img
                  loading="eager"
                  className="rounded-3xl object-cover"
                  src={projectImg?.path}
                  style={{ width: "100%", maxHeight: "270px" }}
                  alt={`project-image-${projectImg?.name}`}
                />
              ) : (
                <div className="min-h-[270px] flex justify-center items-center w-full text-textColor">
                  No photos for your project
                </div>
              )}
              <Link
                to={`${folderName}`}
                className="absolute bottom-3 left-[50%] translate-x-[-50%] truncate
              text-sm capitalize bg-primary-color1 py-2 px-16 gap-2 rounded-3xl duration-300
              hover:bg-primary-color1/70"
              >
                {lang === "ar" ? "مشاهدة المشروع" : "view project"}
              </Link>
            </div>
            {/* project info */}
            <div className="middle flex flex-col p-10 py-5 gap-10 justify-center w-8/12">
              <span
                className="flex w-full  text-primary-color1 capitalize font-semibold rounded-b-3xl
            lg:text-lg
            md:text-base"
              >
                {projectName}
              </span>
              <div id="infos" className="flex flex-wrap ">
                {projectsInfoText.map((project, gi) => (
                  <div
                    key={`${gi}-gallery-info`}
                    id="info"
                    className="flex w-4/12 gap-1 font-semibold capitalize text-center
                  lg:text-sm
                  md:text-xs"
                  >
                    <p className="mb-5 text-primary-color1">{project.name}</p>
                    <span className="font-normal ml-1">{project.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      );
    });

  // if user has more than 1 project
  return !user_cookies ? (
    <Navigate to="/" replace />
  ) : (
    <MainLayout overFlow="scroll">
      <section
        style={{ backgroundImage: `url(${BackgroundImg})` }}
        id="projects-page"
        dir={langDir}
        className="flex flex-col container max-w-full bg-center
      items-center justify-start relative gap-8 h-full min-h-fit py-10   
      lg:bg-cover
      sm:bg-[length:100%]"
      >
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
        {/* search by name */}
        <div className=" flex w-full items-center justify-between sm:flex-row md:flex-row-reverse">
          {/* list  */}
          <div
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
              <MdViewList className="cursor-pointer " size={20} color="black" />
            </button>
          </div>
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
        {UserProjects?.length >= 1 ? (
          <div
            id="projects"
            className="w-full flex flex-wrap min-h-[426px] h-fit justify-center items-center
            lg:gap-14
            md:gap-12
            sm:gap-10"
          >
            {UserProjects}
          </div>
        ) : (
          <NotFoundInList
            text="no project found"
            color="#497B62"
            textStyle="text-primary-color1"
            height="h-full sm:max-h-full lg:max-h-[400px]"
          />
        )}
        {filter && <QR />}
      </section>
      <Suspense fallback={<Loading />}>
        <Outlet context={[filter]} />
      </Suspense>
    </MainLayout>
  );
}
