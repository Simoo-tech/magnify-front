import axios from "axios";
import cookie from "react-cookies";

const serverPath = import.meta.env.VITE_APP_API_BASE;

// login handle submit
export const HandleSubmit = async ({ setLoading, authData, setError }) => {
  setLoading(true);
  await axios
    .post(`${serverPath}auth/email`, authData)
    .then((res) => {
      const userLink = res.data.token;

      if (res.data.verified && res.data.passChanged) {
        cookie.save("user_token", userLink, {
          path: "/",
          secure: true,
          maxAge: 86400,
        });
      }
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
    })
    .catch((err) => {
      setError(err?.response?.data?.message);
    })
    .finally(() => setLoading(false));
};
