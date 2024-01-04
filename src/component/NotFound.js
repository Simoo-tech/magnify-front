import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const NotFound = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["user_token"]);
  const user = cookies.user_token;
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });
  return (
    <div
      id="page-not-found"
      className="section-h w-full bg-color1 flex justify-center items-center"
    >
      <div
        className="container sm:w-full lg:w-4/6 h-5/6 bg-darkGrey rounded-lg py-10 px-5 flex flex-col
      gap-5 justify-center items-center text-white "
      >
        <h1
          id="page-not-found-title"
          className="sm:text-5xl md:text-6xl lg:text-7xl uppercase font-bold text-center"
        >
          oops!
        </h1>
        <p className="sm:text-lg lg:text-xl font-semibold">
          That page can't be found.
        </p>
        <span className="sm:text-sm lg:text-lg text-center">
          it looks like nothing was found at this location
        </span>
        <Link
          to={"/"}
          className="border-2 border-color1 text-lg py-2 px-6 rounded-xl capitalize 
          hover:bg-color1 hover:text-white duration-200 text-color1 font-semibold"
        >
          back to home page
        </Link>
      </div>
    </div>
  );
};
