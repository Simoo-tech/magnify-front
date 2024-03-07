import React, { useContext } from "react";
import { LanguageCon } from "../Context";
import sublogo from "../assest/logo/logo-darkGreen.png";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useCookies } from "react-cookie";
import { Icon } from "@iconify/react";

export const Header = () => {
  const { lang, setLang } = useContext(LanguageCon);
  const navigate = useNavigate();
  // user cookies
  const [cookies] = useCookies(["user_token"]);

  const Logout = () => {
    navigate("/logout");
  };

  return (
    <div className="logo py-2 max-w-[97%] container flex justify-between h-fit relative">
      <img src={sublogo} alt="magnify-logo" className="w-[25px]" />
      <div className="flex gap-4">
        {/* <select
          id="languages"
          value={lang}
          onChange={(event) => {
            setLang(event.target.value);
            window.localStorage.setItem("lang", event.target.value);
          }}
          name="languages"
          className="relative capitalize py-2 px-4 rounded-xl justify-center items-center flex flex-col
           bg-darkGrey text-white outline-none "
        >
          <option
            id="english-language"
            className="flex justify-between capitalize w-[100px] "
            value={"en"}
          >
            en
          </option>
          <option
            id="arabic-language"
            className="flex justify-between capitalize"
            value={"ar"}
          >
            ar
          </option>
        </select> */}
        {lang === "ar" ? (
          <button
            className="flex items-center bg-white px-2 rounded-lg "
            onClick={() => {
              setLang("en");
              window.localStorage.setItem("lang", "en");
            }}
          >
            <Icon
              icon="ri:english-input"
              className="text-xl text-color1 font-bold"
            />
          </button>
        ) : (
          <button
            className="flex items-center bg-white px-2 rounded-lg "
            onClick={() => {
              setLang("ar");
              window.localStorage.setItem("lang", "ar");
            }}
          >
            <Icon
              icon="mdi:abjad-arabic"
              className="text-xl text-color1 font-bold"
            />
          </button>
        )}

        {cookies.user_token ? (
          <div className="flex items-center gap-6">
            <button
              onClick={Logout}
              className="relative duration-150 bg-white py-2 px-2 rounded-lg "
            >
              <FiLogOut size={20} color="red" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
