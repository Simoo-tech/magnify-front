import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Oval } from "react-loader-spinner";

export const PrimaryBtn = ({ text, action, loading, type, style }) => {
  return (
    <button
      className={`border-[3px] px-20 capitalize py-3 rounded-[48px] min-w-[250px] border-lightGreen text-lightGreen
      ${style} flex justify-center
      hover:bg-lightGreen hover:border-darkGreen hover:text-darkGreen duration-300`}
      onClick={action && action}
      type={type}
    >
      {loading ? <Oval width={55} height={"25px"} color="white" /> : text}
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
}) => {
  return (
    <button
      disabled={disabled}
      id="focus-btn"
      className={`border-[3px] px-10 capitalize py-3 rounded-[48px] bg-darkGreen border-darkGreen text-white
      ${style} flex justify-center disabled:opacity-50 disabled:hover:bg-darkGreen disabled:hover:text-white
      hover:bg-white hover:border-darkGreen hover:text-darkGreen duration-300`}
      onClick={action && action}
      type={type}
    >
      {loading ? <Oval width={55} height={"25px"} color="white" /> : text}
      {name === "create-user" && <AiOutlineUserAdd size={20} />}
    </button>
  );
};
