// import axios from "axios";
// import { useContext } from "react";
// // import { TimeSpent } from "../context/Context";
// import cookie from "react-cookies";

// const Report = async () => {
//   // const { TimeSpendCoun } = useContext(TimeSpent);
//   // user cookies
//   const user_cookies = cookie.load("user_token");
//   const user = user_cookies.user_token;
//   // handle logout
//   const year = new Date().toLocaleString().split(",")[0];

//   // user session  time
//   if (TimeSpendCoun.min > 1) {
//     await axios.post(`${process.env.VITE_APP_API_BASE}auth/report`, {
//       userName: user.fname + " " + user.lname,
//       email: user.email,
//       data: year,
//       timeSpent:
//         TimeSpendCoun.hour + " Hours " + TimeSpendCoun.min + " Minutes",
//     });
//   }
// };

// export default Report;
