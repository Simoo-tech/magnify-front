import axios from "axios";
import cookie from "react-cookies";

const serverPath = import.meta.env.VITE_APP_API_BASE;

// login handle submit
export const HandleSubmit = async ({
  setLoading,
  authData,
  setError,
  path,
}) => {
  setLoading(true);
  await axios
    .post(`${serverPath}auth/${path}`, authData)
    .then((res) => {
      const userLink = res.data.token;
      if (path === "phone-login") {
        window.location.assign(`/verify-otp/${res.data.verifyLink}`);
      } else if (path === "email-login") {
        // redirect to path
        if (res.data.isAdmin && res.data.verified && res.data.passChanged) {
          window.location.replace(`/${userLink}/dashboard`);
        } else if (
          !res.data.isAdmin &&
          res.data.verified &&
          res.data.passChanged
        ) {
          window.location.replace(`/${userLink}/tour-projects`);
        } else if (!res.data.verified && !res.data.passChanged) {
          window.location.replace(`/verify-email/${userLink}`);
        }
        if (res.data.verified && res.data.passChanged) {
          cookie.save("user_token", userLink, {
            path: "/",
            secure: true,
            maxAge: 86400,
          });
        }
      }
    })
    .catch((err) => {
      setError(err?.response?.data?.message);
    })
    .finally(() => setLoading(false));
};

export const HandleResendOtp = async ({ phoneNumber, setResLoading }) => {
  setResLoading((prev) => !prev);
  await axios
    .post(`${serverPath}auth/phone-login`, { phone: phoneNumber })
    .then((res) => {
      setResLoading((prev) => !prev);
      window.location.replace(`/verify-otp/${res.data.verifyLink}`);
    });
};

export const HandleSubmitOtp = async ({
  phoneNumber,
  otpVal,
  isAdmin,
  setCorrectOtp,
  setErrorOtp,
  setLoading,
}) => {
  setLoading(true);
  await axios
    .post(`${serverPath}auth/phone-login/verify`, {
      phoneNumber,
      otpVal,
    })
    .then((res) => {
      const userLink = res.data.token;
      setCorrectOtp(true);
      setLoading((prev) => !prev);
      setTimeout(() => {
        cookie.save("user_token", userLink, {
          path: "/",
          secure: true,
          maxAge: 86400,
        });
        window.location.replace(
          isAdmin ? `/${userLink}/dashboard` : `/${userLink}/tour-projects`
        );
      }, 500);
    })
    .catch((err) => {
      setErrorOtp("Incorrect otp");
      setLoading(false);
    });
};
