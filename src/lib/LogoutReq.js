import cookie from "react-cookies";
// import Report from "./ReportReq";

const LogoutReq = () => {
  // Report();
  // user logout
  setTimeout(() => {
    cookie.remove("user_token", {
      path: "/",
      secure: true,
    });
    window.localStorage.removeItem("session_time");
    window.location.replace("/");
  }, 1500);
};

export default LogoutReq;
