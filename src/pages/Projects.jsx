import "../App.css";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import cookie from "react-cookies";
import { useEffect } from "react";

const folderName = import.meta.env.VITE_APP_PROJECTS_FOLDER;
const user_cookies = cookie.load("user_token");

export default function Projects() {
  const [data] = useOutletContext();

  const { projectId } = useParams();
  const navigate = useNavigate();
  const projects = data.projectInfo;

  const folder = projects?.map((project) => {
    return project.folderName;
  });

  const checkID = folder?.includes(projectId);

  useEffect(() => {
    if (!user_cookies) {
      window.location.assign("/");
    }
  }, []);

  return checkID ? (
    <iframe
      title="3dvista-user"
      src={`${folderName}${data?.userName}/${projectId}/index.htm`}
      name={data?.userName}
      className={`h-full w-full absolute top-0 z-50`}
    />
  ) : (
    navigate("/", { replace: true })
  );
}
