import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { NotFound } from "../component/NotFound";
import { FaBuildingFlag } from "react-icons/fa6";
export const UserProjects = () => {
  const navigate = useNavigate();
  // id checker
  const { id } = useParams();
  // get user id
  const userID = window.localStorage.getItem("userID");
  // user cookies
  const [cookies] = useCookies(["user_token"]);
  const user = cookies.user_token;
  const project = user.projectInfo;
  const UserIdChecker = id === userID;
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });

  return UserIdChecker ? (
    <div className="section-h flex justify-center relative py-10 overflow-scroll ">
      <div className="container flex justify-center items-center flex-col h-fit w-full">
        <div className="user-info ">
          <h3 className="text-2xl text-center capitalize ">
            {user.fname + " " + user.lname}
          </h3>
          <p className="text-lg text-center">
            Email:
            <span className="text-blue-500 ml-[0.9px] underline">
              {user.email}
            </span>
          </p>
          <p className="text-lg text-center">
            Phone:<span className="ml-[0.9px]">{user.phone}</span>
          </p>
        </div>
        <div className="user-project-data w-full flex gap-5 mt-10 justify-center flex-wrap">
          {project.map((project) => (
            <div className="project flex flex-col w-5/12 ">
              <div className="top flex w-full bg-darkGrey py-2 justify-between items-center px-4 text-white capitalize rounded-t-xl">
                <h4 className="text-lg font-semibold">
                  name: {project.projectName}
                </h4>
                <p className="text-lg font-semibold">
                  number: {project.projectNo}
                </p>
              </div>
              <div className="middle bg-[#ddd] flex flex-wrap  py-2 px-4 border-4 border-darkGrey">
                <h4 className="w-full text-center my-5 text-xl underline capitalize  font-semibold">
                  project information
                </h4>
                <p className="flex w-6/12 font-semibold  text-base capitalize text-center mb-5">
                  location:
                  <span className="font-normal ml-1">{project.projectLoc}</span>
                </p>
                <p className="flex w-6/12 font-semibold  text-base capitalize text-center mb-5">
                  type:
                  <span className="font-normal ml-1">
                    {project.projectType}
                  </span>
                </p>
                <p className="flex w-6/12 font-semibold  text-base  capitalize text-center mb-5">
                  consultant:
                  <span className="font-normal ml-1">{project.consultant}</span>
                </p>
                <p className="flex w-6/12 font-semibold text-base capitalize text-center  mb-5">
                  area:
                  <span className="font-normal ml-1">
                    {project.projectArea}
                  </span>
                </p>
                <p className="flex w-6/12 font-semibold  text-base capitalize text-center mb-5">
                  height:
                  <span className="font-normal ml-1">{project.projectHei}</span>
                </p>
                <p className="flex w-6/12 font-semibold  text-base capitalize text-center mb-5">
                  duration:
                  <span className="font-normal ml-1">
                    {project.projectDura}
                  </span>
                </p>
              </div>
              <Link
                to={`/projects/${user.userName}/${project.folderName}`}
                target="_blank"
                className="bottom text-lg capitalize bg-darkGrey py-2 flex self-end gap-2 
                items-center justify-center w-fit px-4 text-white rounded-b-xl hover:bg-color1"
              >
                view project
                <FaBuildingFlag />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <NotFound />
  );
};
