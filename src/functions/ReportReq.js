import axios from "axios";
import { useContext } from "react";
import { TimeSpent } from "../Context";
import { useCookies } from "react-cookie";

const Report = async () => {
  const { TimeSpendCoun } = useContext(TimeSpent);
  // user cookies
  const [cookies] = useCookies(["user_token"]);
  const user = cookies.user_token;
  // handle logout
  const year = new Date().toLocaleString().split(",")[0];

  // user session  time
  if (TimeSpendCoun.min > 1) {
    await axios
      .post(`${process.env.REACT_APP_API_URL}auth/report`, {
        userName: user.fname + " " + user.lname,
        email: user.email,
        data: year,
        timeSpent:
          TimeSpendCoun.hour + "Hours" + " " + TimeSpendCoun.min + " Minutes",
      })
      .then((res) => {
        console.log("sdw");
      })
      .catch((err) => console.log(err));
  }
};

export default Report;
