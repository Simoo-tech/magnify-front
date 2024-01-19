import React, { useContext } from "react";
import { LanguageCon } from "../Context";
import sublogo from "../assest/logo/logo-darkGreen.png";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { FiLogOut } from "react-icons/fi";
import { useCookies } from "react-cookie";

export const Header = () => {
  const { lang, setLang } = useContext(LanguageCon);

  // user cookies
  const [cookies] = useCookies(["user_token"]);
  // handle logout
  const Logout = (e) => {
    e.preventDefault();
    cookie.remove("user_token", {
      path: "/",
      secure: true,
    });
    if (cookies.user_token.verified) {
      window.localStorage.removeItem("verify-email");
    }
    window.localStorage.removeItem("userID");
    window.location.assign("/");
  };

  // download qr code

  return (
    <div className="logo py-2 w-full flex justify-center h-fit bg-color1 relative">
      <div className="container flex justify-between items-center w-full">
        <Link to={"/"}>
          <img src={sublogo} alt="magnify-logo" className="w-[30px]" />
        </Link>
        <div className="flex gap-4">
          <select
            id="languages"
            value={lang}
            onChange={(event) => {
              setLang(event.target.value);
              window.localStorage.setItem("lang", event.target.value);
            }}
            name="languages"
            className="relative capitalize p-2 rounded-xl flex flex-col bg-darkGrey text-white outline-none
        "
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
          </select>
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
    </div>
  );
};
