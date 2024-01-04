import "../App.css";
import { useNavigate, useParams } from "react-router-dom";
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
  return (
    <div className="h-full w-full absolute -top-[65px]">
      {checkID ? (
        <iframe
          src={`${process.env.REACT_APP_FOLDER}${user.userName}/${id}/index.htm`}
          name="myiFrame"
          scrolling="no"
          frameborder="1"
          marginheight="0px"
          marginwidth="0px"
          height="100%"
          width="100%"
          allowfullscreen
        />
      ) : (
        <NotFound />
      )}
    </div>
  );
};
