import cookie from "react-cookies";
import axios from "axios";

// session Time
let Newmin;
let storeMin = window.localStorage.getItem("session_time");
if (storeMin) {
  Newmin = parseInt(storeMin);
} else {
  Newmin = 0;
}

export const StartTimer = ({ setTimeSpendCoun, TimeSpendCoun }) => {
  setInterval(() => {
    Newmin = Newmin + 1;
    const NewHour = Math.floor(Newmin / 60);
    setTimeSpendCoun({ ...TimeSpendCoun, min: Newmin, hour: NewHour });
    window.localStorage.setItem("session_time", Newmin);
  }, 60000);
};

// Session timeout
export const Session = async ({ cookies }) => {
  await axios
    .post(`${process.env.REACT_APP_API_URL}auth/login-token-expire`, {
      token: cookies.user_token.token,
    })
    .catch(() => {
      cookie.remove("user_token", {
        path: "/",
        secure: true,
      });
      window.localStorage.removeItem("userID");
      window.location.assign("/");
    });
};
