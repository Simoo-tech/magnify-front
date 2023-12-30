import "../App.css";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { NotFound } from "../component/NotFound";
import { useEffect } from "react";

export const Projects = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["user_token"]);
  const user = cookies.user_token;
  const projects = user.projectInfo;
  const folder = projects.map((project) => {
    return project.folderName;
  });
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  console.log(user);

  const checkID = folder.includes(id);
  return checkID ? <Outlet /> : <NotFound />;
};
