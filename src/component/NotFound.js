import React from "react";

export const NotFound = () => {
  return (
    <div
      id="page-not-found"
      className="h-full absolute top-0 w-full bg-color1 flex justify-center items-center"
    >
      <div
        className=" sm:w-full lg:w-4/6 h-5/6 bg-darkGrey rounded-lg py-10 px-5 flex flex-col
      sm:gap-10 justify-center items-center text-white "
      >
        <h1
          id="page-not-found-title"
          className="sm:text-4xl md:text-5xl lg:text-7xl uppercase font-bold text-center"
        >
          oops!
        </h1>
        <p className="sm:text-lg lg:text-xl font-thin text-center flex flex-col gap-5 ">
          That page can't be found or it will be Soon .
          <span className="sm:text-sm lg:text-lg font-thin  text-center">
            It looks like nothing was found at this location
          </span>
        </p>
      </div>
    </div>
  );
};
