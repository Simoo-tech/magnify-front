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
import { UploadFiles } from "./pages/UploadFiles";

function App() {
  // context value
  const [lang, setLang] = useState("");
  const LangValue = { lang, setLang };

  useEffect(() => {
    setLang(window.localStorage.getItem("lang"));
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
            <Route path="/" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/upload-files" element={<UploadFiles />} />
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
