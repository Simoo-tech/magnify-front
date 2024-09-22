import axios from "axios";
const serverPath = import.meta.env.VITE_APP_API_BASE;

// handle submit for create password
export const HandleSubmit = async ({
  setError,
  data,
  setLoading,
  userPass,
  setPopUp,
}) => {
  setLoading(true);
  if (userPass.password !== userPass.passwordcon) {
    setError("password does not match");
    setLoading(false);
  } else {
    axios
      .put(`${serverPath}user/update-password/${data.data._id}`, {
        password: userPass.password,
      })
      .then(() => {
        setPopUp(true);
      })
      .catch((err) => setError(err.response.data.message))
      .finally(() => setLoading(false));
  }
};
