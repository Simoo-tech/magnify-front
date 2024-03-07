import { useCookies } from "react-cookie";
import cookie from "react-cookies";
import Report from "./ReportReq";

const Logout = () => {
  const [cookies] = useCookies(["user_token"]);
  Report();
  // user logout
  setTimeout(() => {
    cookie.remove("user_token", {
      path: "/",
      secure: true,
    });
    if (cookies.user_token.verified) {
      window.localStorage.removeItem("verify-email");
    }
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("session_time");
    window.location.replace("/");
  }, 2000);
};

export default Logout;
