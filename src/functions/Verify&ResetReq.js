import axios from "axios";

// handle reset password submit
export const HandleResetSubmit = async ({
  setSending,
  email,
  setVerified,
  setErr,
}) => {
  setSending(true);
  await axios
    .post(`${process.env.REACT_APP_API_URL}user/reset-password`, { email })
    .then((res) => {
      setVerified(true);
      window.localStorage.setItem("resetToken", res.data.PassToken);
      window.localStorage.setItem("resetUserID", res.data.userID);
    })
    .catch((err) => setErr(err.response.data.message))
    .finally(() => setSending(false));
};

// handle verfiy email submit
export const HandleVerifySubmit = async ({ setSending, user, setVerified }) => {
  setSending(true);
  await axios
    .post(`${process.env.REACT_APP_API_URL}user/verify-email`, {
      email: user.email,
    })
    .then((res) => {
      setVerified(true);
      window.localStorage.setItem("verify-email", res.data.PassToken);
    })
    .catch((err) => console.log(err))
    .finally(() => setSending(false));
};
