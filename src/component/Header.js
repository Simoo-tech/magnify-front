import React, { useContext } from "react";
import { LanguageCon, TimeSpent } from "../Context";
import sublogo from "../assest/logo/logo-darkGreen.png";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { FiLogOut } from "react-icons/fi";
import { useCookies } from "react-cookie";
import axios from "axios";
export const Header = () => {
  const { lang, setLang } = useContext(LanguageCon);
  const { TimeSpendCoun } = useContext(TimeSpent);

  // user cookies
  const [cookies] = useCookies(["user_token"]);
  const user = cookies.user_token;
  // handle logout
  const year = new Date().toLocaleString().split(",")[0];
  const Logout = async (e) => {
    e.preventDefault();
    // user session  time
    await axios
      .post(`http://localhost:8000/api/auth/report`, {
        userName: user.fname + " " + user.lname,
        email: user.email,
        data: year,
        timeSpent:
          TimeSpendCoun.hour + " Hours" + " " + TimeSpendCoun.min + " Minutes",
      })
      .then((res) => {
        cookie.remove("user_token", {
          path: "/",
          secure: true,
        });
        if (cookies.user_token.verified) {
          window.localStorage.removeItem("verify-email");
        }
        window.localStorage.removeItem("userID");
        window.location.assign("/");
        window.localStorage.removeItem("session_time");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="logo py-2 max-w-[97%] container flex justify-between h-fit relative">
      <Link to={"/"}>
        <img src={sublogo} alt="magnify-logo" className="w-[25px]" />
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
          className="relative capitalize py-2 px-4 rounded-xl justify-center items-center flex flex-col bg-darkGrey text-white outline-none
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
  );
};
