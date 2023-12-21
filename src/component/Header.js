import React, { useContext } from "react";
import LanguageCon from "../Context";
import sublogo from "../assest/logo/logo-darkGreen.png";
import { Link } from "react-router-dom";
export const Header = () => {
  const { lang, setLang } = useContext(LanguageCon);
  console.log(lang);
  return (
    <div className="logo py-2 w-full flex justify-center h-fit bg-color1 relative">
      <div className="container flex justify-between items-center w-full">
        <Link to={"/"}>
          <img src={sublogo} alt="logo" className="w-[30px]" />
        </Link>
        <select
          value={lang}
          onChange={(event) => {
            setLang(event.target.value);
            window.localStorage.setItem("lang", event.target.value);
          }}
          name="languages"
          className="relative capitalize p-2 rounded-xl flex flex-col bg-darkGrey text-white
        "
        >
          <option
            className="flex justify-between capitalize w-[100px]"
            value={"en"}
          >
            en
          </option>
          <option className="flex justify-between capitalize" value={"ar"}>
            ar
          </option>
        </select>
      </div>
    </div>
  );
};
