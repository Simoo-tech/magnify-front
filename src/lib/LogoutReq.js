import cookie from "react-cookies";
// import Report from "./ReportReq";

const LogoutReq = () => {
  // Report();
  // user logout
  cookie.remove("user_token", {
    path: "/",
    secure: true,
  });
  setTimeout(() => {
    window.localStorage.removeItem("session_time");
    window.location.replace("/");
  }, 2000);
};

export default LogoutReq;
