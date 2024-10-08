import "./App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useLang } from "./context/LangContext";
// pages
import { NotFound } from "./component/NotFound";
import Login from "./pages/Login";
// import CreatePass from "./pages/CreatePass";
import { CreateUser } from "./pages/Dashboard/CreateUser";
import { Dashbaord } from "./pages/Dashboard/Dashbaord";
import { EditUser } from "./pages/Dashboard/EditUser";
import CreatePass from "./pages/CreatePass";
import UserProjects from "./pages/UserProjects";
import SendVerifyEmail from "./pages/sendVerifyEmail";
import SendReset from "./pages/sendResetPass";
import Projects from "./pages/Projects";
import MissingPhoto from "./pages/Upload files/MissingPhoto";
import SessionData from "./pages/Upload files/SessionData";
import UploadFiles from "./pages/Upload files/UploadFiles";
import Logout from "./pages/Logout";
import CheckEmail from "./pages/checkEmail";
import { Loading } from "./component/Loading";

function App() {
  // set language
  const [lang, setLang] = useLang();
  useEffect(() => {
    if (window.localStorage.getItem("lang")) {
      setLang(window.localStorage.getItem("lang"));
    }
  }, []);

  return (
    <main
      id={lang === "ar" && "arabic"}
      className="App h-dvh overflow-hidden relative flex 
          items-center flex-col"
    >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/:id" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/:id/dashboard" element={<Dashbaord />}>
          <Route path="create-user" element={<CreateUser />} />
          <Route path=":cleintId/edit-user" element={<EditUser />} />
        </Route>
        <Route path="/:id/tour-projects" element={<UserProjects />}>
          <Route path=":projectId" element={<Projects />} />
        </Route>
        <Route path="/upload-files" element={<UploadFiles />}>
          <Route path="missing-photo" element={<MissingPhoto />} />
          <Route path="session-data" element={<SessionData />} />
        </Route>
        <Route path="/create-password/:id" element={<CreatePass />} />
        <Route path="/reset-password/:id" element={<CreatePass />} />
        <Route path="/check-email/:id" element={<CheckEmail />} />
        <Route path="/verify-email/:id" element={<SendVerifyEmail />} />
        <Route path="/forgot-password" element={<SendReset />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </main>
  );
}

export default App;
