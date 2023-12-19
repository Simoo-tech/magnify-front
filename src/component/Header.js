import React, { useContext } from "react";
import LanguageCon from "../Context";
import sublogo from "../assest/logo/logo-darkGreen.png";
export const Header = () => {
  const { english, setEnglish } = useContext(LanguageCon);
  return (
    <div className="logo py-2 w-full flex justify-center h-fit bg-[#647d6866] relative">
      <div className="container flex justify-between items-center w-full">
        <img src={sublogo} alt="logo" className="w-[30px]" />
        <select
          value={english}
          name="languages"
          className="relative capitalize bg-white py-3 px-5 rounded-xl flex flex-col"
        >
          <option
            className="flex justify-between capitalize"
            onClick={(e) => {
              setEnglish("en");
              window.localStorage.setItem("lang", "en");
            }}
          >
            en
          </option>
          <option
            className="flex justify-between capitalize"
            onClick={(e) => {
              setEnglish("ar");
              window.localStorage.setItem("lang", "ar");
            }}
          >
            ar
          </option>
        </select>
      </div>
    </div>
  );
};
