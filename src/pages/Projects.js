import "../App.css";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import UserChecker from "../functions/CheckUser";
import { useEffect } from "react";

export default function Projects() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["user_token"]);
  const user = cookies.user_token;
  const projects = user.projectInfo;

  const folder = projects.map((project) => {
    return project.folderName;
  });

  const checkID = folder.includes(id);

  useEffect(() => {
    UserChecker({ cookies });
  }, [cookies]);

  useEffect(() => {
    if (!user) {
      window.location.assign("/");
    }
  }, []);

  return checkID ? (
    <iframe
      title="3dvista-user"
      src={`${process.env.REACT_APP_FOLDER}${user.userName}/${id}/index.htm`}
      name={user.userName}
      allowFullScreen
      className={`h-full w-full absolute top-0 z-40`}
    />
  ) : (
    navigate("/", { replace: true })
  );
}
