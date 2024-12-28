import axios from "axios";

const serverPath = import.meta.env.VITE_APP_API_BASE;

// handle submit for create password
export const HandleSubmit = async ({ user, setLoading, values, setPopUp }) => {
  setLoading(true);
  axios
    .put(`${serverPath}user/update-password/${user._id}`, {
      password: values.password,
    })
    .then(() => {
      setPopUp(true);
    })
    .catch((err) => setError(err.response.data.message))
    .finally(() => setLoading(false));
};
