import "./App.css";
import { useEffect, useMemo } from "react";
import {
  Routes,
  Route,
  Navigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { useLang } from "./context/LangContext";
// pages
import { NotFound } from "./components/NotFound";
import Login from "./pages/Login-with-email/Login";
import { CreateUser } from "./pages/Dashboard/CreateUser";
import { Dashboard } from "./pages/Dashboard/Dashbaord";
import { EditUser } from "./pages/Dashboard/EditUser";
import CreatePass from "./pages/CreatePass";
import UserProjects from "./pages/UserProjects";
import SendVerifyEmail from "./pages/Login-with-email/sendVerifyEmail";
import SendReset from "./pages/sendResetPass";
import Projects from "./pages/Projects";
import MissingPhoto from "./pages/Upload files/MissingPhoto";
import SessionData from "./pages/Upload files/SessionData";
import UploadFiles from "./pages/Upload files/UploadFiles";
import Logout from "./pages/Logout";
import CheckEmail from "./pages/Login-with-email/checkEmail";
import { PhoneLogin } from "./pages/login-with-phone/PhoneLogin";
import { VerifyOtp } from "./pages/login-with-phone/VerifyOtp";

function App() {
  // set language
  const [lang, setLang] = useLang();
  const savedLang = window.localStorage.getItem("lang") || "en";
  setLang(savedLang);

  return (
    <main
      id={lang === "ar" ? "arabic" : "english"}
      className="App relative flex h-dvh
      items-center flex-col"
    >
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/:id" element={<Login />} />
        <Route path="/phone-login" element={<PhoneLogin />} />
        <Route path="/phone-login/:id" element={<VerifyOtp />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/:id/dashboard" element={<Dashboard />} />
        <Route path="/:id/dashboard/create-user" element={<CreateUser />} />
        <Route
          path="/:id/dashboard/:cleintUserName/edit-user"
          element={<EditUser />}
        />
        <Route path="/:id/tour-projects" element={<UserProjects />} />
        <Route
          path={"/:id/tour-projects/:projectName"}
          element={<Projects />}
        />
        <Route
          path={"/:id/tour-projects/:access/:projectName/:date"}
          element={<Projects />}
        />
        <Route
          path={"/:id/tour-projects/:projectName/:date"}
          element={<Projects />}
        />
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
