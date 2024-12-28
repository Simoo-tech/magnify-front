import axios from "axios";
const serverPath = import.meta.env.VITE_APP_API_BASE;

// handle send reset password submit
export const HandleSendReset = async ({
  values,
  setSending,
  setErr,
  getText,
  email,
}) => {
  setSending(true);
  await axios
    .post(`${serverPath}user/send-reset-password`, values ? values : { email })
    .then((res) => {
      return window.location.replace(`/check-email/${res.data.verifyLink}`);
    })
    .catch(() => {
      setErr(getText("Email not found", "بريد الالكتروني غير موجود"));
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
