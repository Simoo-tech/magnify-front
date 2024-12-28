import axios from "axios";
import cookie from "react-cookies";

const serverPath = import.meta.env.VITE_APP_API_BASE;

// login handle submit
export const HandleEmailLogin = async ({
  setLoading,
  values,
  setError,
  getText,
}) => {
  setLoading(true);
  await axios
    .post(`${serverPath}auth/email-login`, values)
    .then((res) => {
      const userLink = res.data.token;
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
    })
    .catch((err) => {
      setError(
        getText(
          "Email or password is incorrect",
          "البريد الإلكتروني أو كلمة المرور غير صحيحة"
        )
      );
    })
    .finally(() => setLoading(false));
};

export const HandlePhoneLogin = async ({
  setLoading,
  values,
  setError,
  getText,
}) => {
  setLoading(true);
  await axios
    .post(`${serverPath}auth/phone-login`, values)
    .then((res) => {
      // redirect to path
      window.location.assign(`/verify-otp/${res.data.verifyLink}`);
    })
    .catch((err) => {
      setError(getText("Phone number not found", "رقم الهاتف غير موجود"));
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
  getText,
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
      setErrorOtp(
        getText("Incorrect otp try again", "الرمز خطا حاول مرة اخري")
      );
      setLoading(false);
    });
};
