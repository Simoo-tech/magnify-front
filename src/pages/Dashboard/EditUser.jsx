import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import cookie from "react-cookies";
import { CreateUser } from "./CreateUser.jsx";
import { Loading } from "../../components/Loading.jsx";

const serverPath = import.meta.env.VITE_APP_API_BASE;
const userCookies = cookie.load("user_token");

export function EditUser() {
  const { cleintId } = useParams();

  // fetch client data
  const { isLoading, data: cleintData } = useQuery(
    ["fetchClientEdit", { cleintId }],
    () => {
      return axios
        .get(`${serverPath}client/${cleintId}`, {
          headers: {
            token: `${userCookies}`,
          },
        })
        .then((res) => res.data);
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return <Loading />;
  }

  return <CreateUser cleintData={cleintData} />;
}
