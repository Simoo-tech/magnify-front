import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoCheckmarkCircle } from "react-icons/io5";
import { RiMailAddFill } from "react-icons/ri";
import { Link } from "react-router-dom";

export const PrimaryBtn = ({ text, action, loading, type, style }) => {
  return (
    <button
      className={`btn border-[3px] capitalize py-3 rounded-[48px] min-w-[230px] border-lightGreen text-lightGreen
      ${style} flex justify-center bg-transparent
      hover:bg-lightGreen hover:border-darkGreen hover:text-darkGreen duration-300
      sm:text-md md:text-base lg:text-lg `}
      onClick={action && action}
      type={type}
    >
      {loading ? <span className="loading loading-spinner"></span> : text}
    </button>
  );
};

export const SecondaryBtn = ({
  text,
  action,
  loading,
  type,
  style,
  name,
  disabled,
  id,
}) => {
  return (
    <button
      disabled={disabled}
      id={id ? id : "focus-btn"}
      className={`btn capitalize py-3 rounded-[48px] bg-darkGreen text-white min-w-[230px] gap-2
      ${style} flex justify-center sm:text-xs md:text-sm lg:text-base
    hover:bg-white hover:text-darkGreen duration-300
    disabled:bg-darkGreen/50 disabled:text-white `}
      onClick={action && action}
      type={type}
    >
      {name === "verified" && <IoCheckmarkCircle size={25} />}
      {loading ? <span className="loading loading-spinner" /> : text}
      {name === "create-user" && <AiOutlineUserAdd size={20} />}
      {name === "add-email" && <RiMailAddFill size={25} />}
    </button>
  );
};
export const SecondaryLink = ({ text, loading, type, style, name, linkTo }) => {
  return (
    <Link
      to={linkTo}
      id="focus-btn"
      className={`btn px-10 capitalize py-3 rounded-[48px] bg-darkGreen text-white border-none 
      ${style} flex justify-center sm:text-xs md:text-sm lg:text-base  
    hover:bg-white hover:text-darkGreen duration-300
    disabled:bg-darkGreen/50 disabled:text-white `}
      type={type}
    >
      {loading ? <span className="loading loading-spinner"></span> : text}
      {name === "create-user" && <AiOutlineUserAdd size={20} />}
    </Link>
  );
};
