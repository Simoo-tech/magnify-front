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
  // user
  return (
    <Router>
      <LanguageCon.Provider value={LangValue}>
        <div className="App h-screen overflow-hidden">
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/:id/dashboard" element={<Dashbaord />}>
              <Route path="create-user" element={<CreateUser />} />
              <Route path="edit-user" element={<EditUser />} />
            </Route>
            <Route path="/verify-email" element={<Verify />} />
            <Route path="/create-password" element={<CreatePass />} />
            <Route path="/:id/tour-projects" element={<UserProjects />} />
            <Route
              path={`/projects/${user}/:id`}
              element={<Projects />}
            ></Route>
          </Routes>
        </div>
      </LanguageCon.Provider>
    </Router>
  );
}

export default App;
