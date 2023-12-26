import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { LanguageCon } from "./Context";
import { useEffect, useState } from "react";
import { Header } from "./component/Header";
import { CreatePass } from "./pages/CreatePass";
import { CreateUser, Dashbaord } from "./pages/Dashboard/Dashbaord";
import { UserProjects } from "./pages/UserProjects";
import { NotFound } from "./component/NotFound";
function App() {
  // context value
  const [lang, setLang] = useState("");

  const LangValue = { lang, setLang };
  useEffect(() => {
    setLang(window.localStorage.getItem("lang"));
  }, []);
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
            </Route>
            <Route path="/create-password" element={<CreatePass />} />
            <Route path="/:id/tour-projects" element={<UserProjects />} />
          </Routes>
        </div>
      </LanguageCon.Provider>
    </Router>
  );
}

export default App;
