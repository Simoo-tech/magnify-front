import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useLang } from "./context/LangContext";
// pages
import { NotFound } from "./pages/NotFound";
import Login from "./pages/Login-with-email/Login";
import { CreateUser } from "./pages/Dashboard/CreateUser";
import { Dashboard } from "./pages/Dashboard/Dashbaord";
import { EditUser } from "./pages/Dashboard/EditUser";
import CreatePass from "./pages/CreatePass";
import UserProjects from "./pages/UserProjects";
import SendVerifyEmail from "./pages/Login-with-email/sendVerifyEmail";
import SendReset from "./pages/sendResetPass";
import Projects from "./pages/Projects";
import Upload from "./pages/Upload files/Upload";
import Logout from "./pages/Logout";
import CheckEmail from "./pages/Login-with-email/checkEmail";
import { PhoneLogin } from "./pages/login-with-phone/PhoneLogin";
import { VerifyOtp } from "./pages/login-with-phone/VerifyOtp";
import ProdectedRouter from "./components/ProdectedRouter";
import UploadPage from "./pages/Upload files/UploadPage";
import { preload } from "react-dom";

function App() {
  preload("./fonts/PNU-Regular.ttf", { as: "font" });
  preload("./fonts/Montserrat.ttf", { as: "font" });
  // set language
  const { lang } = useLang();
  return (
    <main
      id={lang === "ar" ? "arabic" : "english"}
      className="App relative flex h-dvh
      items-center flex-col"
    >
      <Routes>
        <Route element={<ProdectedRouter />}>
          <Route path="/" element={<Login />} />
          <Route path="/:email" element={<Login />} />
          <Route path="/phone-login" element={<PhoneLogin />} />
          <Route path="/verify-otp/:id" element={<VerifyOtp />} />
          <Route path="/create-password/:id" element={<CreatePass />} />
          <Route path="/reset-password/:id" element={<CreatePass />} />
          <Route path="/check-email/:id" element={<CheckEmail />} />
          <Route path="/verify-email/:id" element={<SendVerifyEmail />} />
          <Route path="/forgot-password" element={<SendReset />} />
        </Route>
        <Route path="/logout" element={<Logout />} />
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
        <Route path="/upload-files" element={<Upload />} />
        <Route path="/upload-files/missing-photo" element={<UploadPage />} />
        <Route path="/upload-files/session-data" element={<UploadPage />} />
      </Routes>
    </main>
  );
}

export default App;
