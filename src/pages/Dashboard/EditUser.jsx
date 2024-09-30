import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import cookie from "react-cookies";
import { CreateUser } from "./CreateUser.jsx";
import { Loading } from "../../component/Loading.jsx";

// const CreateUser = lazy(() => import("./CreateUser.jsx"));
const serverPath = import.meta.env.VITE_APP_API_BASE;
const userCookies = cookie.load("user_token");

export function EditUser() {
  const { cleintId } = useParams();
  const [userData, setUserData] = useState(null);

  // fetch client data
  const { isLoading } = useQuery(
    ["fetchClientEdit", { cleintId }],
    () => {
      return axios.get(`${serverPath}client/${cleintId}`, {
        refetchOnmount: false,
        headers: {
          token: `${userCookies}`,
          refetchOnmount: false,
          refetchOnReconnect: false,
          retry: false,
          refetchOnWindowFocus: false,
          staleTime: 1000 * 60 * 60 * 24,
        },
      });
    },
    {
      onSuccess: (res) => setUserData(res.data),
    }
  );

  if (isLoading) {
    return <Loading />;
  }

  return <CreateUser userData={userData} setUserData={setUserData} />;
}
