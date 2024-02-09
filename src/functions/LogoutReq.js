import { useCookies } from "react-cookie";
import cookie from "react-cookies";
import Report from "./ReportReq";

const Logout = () => {
  const [cookies] = useCookies(["user_token"]);
  // User Report
  Report();
  setTimeout(() => {
    // user logout
    cookie.remove("user_token", {
      path: "/",
      secure: true,
    });
    if (cookies.user_token.verified) {
      window.localStorage.removeItem("verify-email");
    }
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("session_time");
    window.location.assign("/");
  }, 3000);
};

export default Logout;
