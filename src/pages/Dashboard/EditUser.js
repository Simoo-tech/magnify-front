import { lazy, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { GetUser } from "../../functions/DashboardReq.js";

const CreateUser = lazy(() => import("./CreateUser.js"));

export default function EditUser() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  // user cookies
  const [cookies] = useCookies(["user_token"]);

  useEffect(() => {
    GetUser({ cookies, id, setUserData });
  }, [id, cookies]);

  return (
    <div
      className={`w-full bg-color1 absolute flex pt-5 justify-center items-center left-0 bg-cover sm:flex-col h-full top-0`}
    >
      <CreateUser userData={userData} setUserData={setUserData} />
    </div>
  );
}
