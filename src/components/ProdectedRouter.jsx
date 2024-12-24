import React from "react";
import { Loading } from "./Loading";
import { Navigate, Outlet } from "react-router-dom";
import cookie from "react-cookies";
import { useQuery } from "react-query";
import axios from "axios";

const serverPath = import.meta.env.VITE_APP_API_BASE;

const ProdectedRouter = () => {
  const userCookies = cookie.load("user_token");
  // Check if the user is already logged in
  if (userCookies) {
    const { isLoading, data: user } = useQuery(
      "checkUserLogged",
      () =>
        axios
          .get(`${serverPath}user/fetchUser/${userCookies}`)
          .then((res) => res.data),
      {
        refetchOnMount: false,
        retry: false,
      }
    );
    if (isLoading) return <Loading />;
    if (user?.isAdmin) {
      return <Navigate to={`/${userCookies}/dashboard`} replace />;
    } else {
      return <Navigate to={`/${userCookies}/tour-projects`} replace />;
    }
  }

  return <Outlet />;
};

export default ProdectedRouter;
