import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { LanguageCon } from "./Context";
import { useEffect, useState } from "react";
import { Header } from "./component/Header";
import { CreatePass } from "./pages/CreatePass";
import { CreateUser, Dashbaord, EditUser } from "./pages/Dashboard/Dashbaord";
import { UserProjects } from "./pages/UserProjects";
import { NotFound } from "./component/NotFound";
import { ResetPass, Verify } from "./pages/Verify";
import { Projects } from "./pages/Projects";
import { MissingPhoto, SessionData, UploadFiles } from "./pages/UploadFiles";
import { useCookies } from "react-cookie";
import cookie from "react-cookies";

import axios from "axios";

function App() {
  const [lang, setLang] = useState("");
  const LangValue = { lang, setLang };
  // Session expired
  const [cookies] = useCookies(["user_token"]);

  const Session = async () => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}auth/login-token-expire`, {
        token: cookies.user_token.token,
      })
      .then()
      .catch((err) => {
        cookie.remove("user_token", {
          path: "/",
          secure: true,
        });
        window.localStorage.removeItem("userID");
        window.location.assign("/");
      });
  };

  useEffect(() => {
    setLang(window.localStorage.getItem("lang"));
    if (cookies.user_token) {
      Session();
    }
  }, []);

  // user ID
  const userID = window.localStorage.getItem("userID");
  const verify_email = window.localStorage.getItem("verify-email");
  const resetToken = window.localStorage.getItem("resetToken");

  return (
    <Router>
      <LanguageCon.Provider value={LangValue}>
        <div className="App h-screen overflow-hidden relative">
          <Header />
          <Routes>
            <Route path={"/" || "/:id"} element={<Login />} />
            <Route path={"/:id"} element={<Login />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/upload-files" element={<UploadFiles />}>
              <Route path="missing-photo" element={<MissingPhoto />} />
              <Route path="session-data" element={<SessionData />} />
            </Route>
            <Route path={`/${userID}/dashboard`} element={<Dashbaord />}>
              <Route path="create-user" element={<CreateUser />} />
              <Route path="edit-user" element={<EditUser />} />
            </Route>
            <Route
              path={`/create-password/${verify_email}`}
              element={<CreatePass />}
            />
            <Route
              path={`/reset-password/${resetToken}`}
              element={<CreatePass />}
            />
            <Route path={`/${userID}/tour-projects`} element={<UserProjects />}>
              <Route path=":id" element={<Projects />} />
            </Route>
            <Route path={`/verify-email/${userID}`} element={<Verify />} />
            <Route path={`/reset-password`} element={<ResetPass />} />
          </Routes>
        </div>
      </LanguageCon.Provider>
    </Router>
  );
}

export default App;
