import React from "react";

export const NotFound = () => {
  return (
    <div
      id="page-not-found"
      className="h-full absolute top-0 w-full bg-color1 flex justify-center items-center"
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
          That page can't be found or it will be Soon .
        </p>
        <span className="sm:text-sm lg:text-lg text-center">
          it looks like nothing was found at this location
        </span>
      </div>
    </div>
  );
};
