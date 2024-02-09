import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// check user type and permission
const userID = window.localStorage.getItem("userID");
export const UserType = ({ cookie, navigate }) => {
  const user = cookie.user_token;

  // see if user is admin
  if (user && !user.verified && !user.passChanged) {
    navigate(`/verify-email/${userID}`);
  } else if (user && user.verified && user.passChanged) {
    if (user.isAdmin && user.verified && user.passChanged) {
      navigate(`/${userID}/dashboard`);
    } else if (!user.isAdmin && user.verified && user.passChanged) {
      navigate(`/${userID}/tour-projects`);
    }
  }
};

// login user with qr code
export const EmailLogin = async ({ setQREmail, id }) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}user/${id}`)
    .then((res) => setQREmail(res.data.email))
    .catch(() => console.error("not found"));
};

// login handle submit
// verify email
const verify_email = window.localStorage.getItem("verify-email");
export const HandleSubmit = async ({
  setLoading,
  authData,
  setCookies,
  setError,
}) => {
  setLoading(true);
  await axios
    .post(`${process.env.REACT_APP_API_URL}auth/login`, authData)
    .then((res) => {
      setCookies("user_token", res.data, {
        path: "/",
        secure: true,
        sameSite: "none",
      });
      // redirect to path
      const userID = uuidv4(res.data._id);
      window.localStorage.setItem("userID", userID);
      if (res.data.isAdmin && res.data.verified && res.data.passChanged) {
        window.location.assign(`/${userID}/dashboard`);
      } else if (
        !res.data.isAdmin &&
        res.data.verified &&
        res.data.passChanged
      ) {
        window.location.assign(`/${userID}/tour-projects`);
      } else if (!res.data.verified && !res.data.passChanged) {
        window.location.assign(`/verify-email/${userID}`);
      } else if (res.data.verified && !res.data.passChanged) {
        window.location.assign(`/create-password/${verify_email}`);
      }
    })
    .catch((err) => {
      setError(err.response.data.message);
    })
    .finally(() => setLoading(false));
};
