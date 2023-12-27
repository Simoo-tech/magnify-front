import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { NotFound } from "../component/NotFound";

export const UserProjects = () => {
  // id checker
  const { id } = useParams();
  // get user id
  const userID = window.localStorage.getItem("userID");
  const navigate = useNavigate();
  // user cookies
  const [cookies] = useCookies(["user_token"]);
  const UserIdChecker = id === userID;

  useEffect(() => {
    if (!cookies.user_token) {
      navigate("/");
    }
  });
  return UserIdChecker ? (
    <div className="user-projects relative pt-10">UserProjects</div>
  ) : (
    <NotFound />
  );
};
