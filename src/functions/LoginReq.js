import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const verify_email = window.localStorage.getItem("verify-email");

// if user loged
export const UserLoged = ({ navigate, userID, cookies }) => {
  const user = cookies.user_token;
  if (user) {
    if (user.isAdmin && user.verified && user.passChanged) {
      window.location.replace(`/${userID}/dashboard`);
    } else if (!user.isAdmin && user.verified && user.passChanged) {
      navigate(`/${userID}/tour-projects`, { replace: true });
    } else if (!user.verified && !user.passChanged) {
      navigate(`/verify-email/${userID}`, { replace: true });
    } else if (user.data.verified && !user.passChanged) {
      navigate(`/create-password/${verify_email}`, { replace: true });
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
export const HandleSubmit = async ({
  setLoading,
  authData,
  setCookies,
  setError,
  navigate,
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
        window.location.replace(`/${userID}/dashboard`);
      } else if (
        !res.data.isAdmin &&
        res.data.verified &&
        res.data.passChanged
      ) {
        navigate(`/${userID}/tour-projects`, { replace: true });
      } else if (!res.data.verified && !res.data.passChanged) {
        navigate(`/verify-email/${userID}`, { replace: true });
      } else if (res.data.verified && !res.data.passChanged) {
        navigate(`/create-password/${verify_email}`, { replace: true });
      }
    })
    .catch((err) => {
      setError(err.response.data.message);
    })
    .finally(() => setLoading(false));
};
