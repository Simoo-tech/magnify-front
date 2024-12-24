import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import cookie from "react-cookies";
import { CreateUser } from "./CreateUser.jsx";
import { Loading } from "../../components/Loading.jsx";
import { NotFound } from "../NotFound.jsx";

const serverPath = import.meta.env.VITE_APP_API_BASE;
const userCookies = cookie.load("user_token");

export function EditUser() {
  const { cleintUserName } = useParams();

  // fetch client data
  const {
    error,
    isLoading,
    data: cleintData,
  } = useQuery(
    ["fetchClientEdit", { cleintUserName }],
    () =>
      axios
        .get(`${serverPath}client/${cleintUserName}`, {
          headers: {
            token: `${userCookies}`,
          },
        })
        .then((res) => res.data),
    {
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <NotFound />;
  }

  return <CreateUser cleintData={cleintData} />;
}
