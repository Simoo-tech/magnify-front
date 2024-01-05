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
import { Verify } from "./pages/Verify";
import { useCookies } from "react-cookie";
import { Projects } from "./pages/Projects";
import { UploadFiles } from "./pages/UploadFiles";

function App() {
  // context value
  const [lang, setLang] = useState("");
  const [cookies] = useCookies(["user_token"]);
  const LangValue = { lang, setLang };
  let user;

  useEffect(() => {
    setLang(window.localStorage.getItem("lang"));
  }, []);

  if (cookies.user_token) {
    user = cookies.user_token.userName;
  }
  // user ID
  const userID = window.localStorage.getItem("userID");
  return (
    <Router>
      <LanguageCon.Provider value={LangValue}>
        <div className="App h-screen overflow-hidden relative">
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/upload-files" element={<UploadFiles />} />
            <Route path="/:id/dashboard" element={<Dashbaord />}>
              <Route path="create-user" element={<CreateUser />} />
              <Route path="edit-user" element={<EditUser />} />
            </Route>
            <Route path="/create-password" element={<CreatePass />} />
            <Route path={`/${userID}/tour-projects`} element={<UserProjects />}>
              <Route path=":id" element={<Projects />} />
            </Route>
            <Route path={`/user/verify-email/${userID}`} element={<Verify />} />
          </Routes>
        </div>
      </LanguageCon.Provider>
    </Router>
  );
}

export default App;
