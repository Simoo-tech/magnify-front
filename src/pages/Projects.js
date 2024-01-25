import "../App.css";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

export const Projects = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["user_token"]);
  const user = cookies.user_token;
  const projects = user.projectInfo;

  const folder = projects.map((project) => {
    return project.folderName;
  });

  const checkID = folder.includes(id);
  setTimeout(() => {
    setLoading(false);
  }, 5000);
  return checkID ? (
    <>
      {loading && (
        <div
          className={`${
            loading ? "flex" : "hidden"
          } h-full w-full absolute top-0 justify-center items-center bg-color1 z-50`}
        >
          {<Oval />}
        </div>
      )}

      <iframe
        title="3dvista-user"
        src={`${process.env.REACT_APP_FOLDER}${user.userName}/${id}/index.htm`}
        name={user.userName}
        allowFullScreen
        className={` h-full w-full absolute top-0 z-40`}
      />
    </>
  ) : (
    navigate("/")
  );
};
