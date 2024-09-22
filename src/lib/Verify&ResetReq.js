import axios from "axios";
const serverPath = import.meta.env.VITE_APP_API_BASE;

// handle send reset password submit
export const HandleSendReset = async ({ email, setSending, setErr }) => {
  setSending(true);
  await axios
    .post(`${serverPath}user/send-reset-password`, { email })
    .then((res) => {
      return window.location.replace(`/check-email/${res.data.verifyLink}`);
    })
    .catch((err) => {
      setErr(err.response.data.message);
    })
    .finally(() => setSending(false));
};

// handle send verfiy email submit
export const HandleSendVerify = async ({ setSending, email }) => {
  setSending(true);
  await axios
    .post(`${serverPath}user/send-verify-email`, {
      email,
    })
    .then((res) => {
      return window.location.assign(`/check-email/${res.data.verifyLink}`);
    })
    .catch((err) => console.log(err))
    .finally(() => setSending(false));
};
