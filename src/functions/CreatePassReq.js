import axios from "axios";
import cookie from "react-cookies";

// handle submit
export const HandleSubmit = async ({
  resetUserID,
  setError,
  user,
  setLoading,
  userPass,
}) => {
  setLoading(true);
  // if user want to reset password
  if (resetUserID) {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}user/update-password/${resetUserID}`,
        userPass
      )
      .then((res) => {
        alert(res.data.message);
        window.location.assign("/");
        window.localStorage.removeItem("resetUserID");
        window.localStorage.removeItem("resetToken");
        window.localStorage.removeItem("userID");
        window.localStorage.removeItem("session_time");
      })
      .catch((err) => setError(err.response.data.message))
      .finally(() => setLoading(false));
  } // new user password
  else {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}user/update-password/${user._id}`,
        userPass
      )
      .then(async (res) => {
        alert(res.data.message);
        setTimeout(() => {
          window.location.assign("/");
          cookie.remove("user_token", {
            path: "/",
            expires: new Date(Date.now() + 3600000),
            secure: true,
          });
        }, 1000);
        window.localStorage.removeItem("verify-email");
        window.localStorage.removeItem("userID");
        await axios
          .get(`${process.env.REACT_APP_API_URL}user/verify-email/${user._id}`)
          .catch((err) => console.log(err));
      })
      .catch((err) => setError(err.response.data.message))
      .finally(() => setLoading(false));
  }
};

// check if reset password token is valid
const resetToken = window.localStorage.getItem("resetToken");
export const ResetLinkToken = async ({ setValidateLink }) => {
  await axios
    .post(`${process.env.REACT_APP_API_URL}user/reset-password-token`, {
      token: resetToken,
    })
    .then()
    .catch((err) => {
      setValidateLink(false);
      window.localStorage.removeItem("resetUserID");
      window.localStorage.removeItem("resetToken");
    });
};
