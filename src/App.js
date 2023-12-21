import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import LanguageCon from "./Context";
import { useEffect, useState } from "react";
import { Header } from "./component/Header";
import { CreatePass } from "./pages/CreatePass";

function App() {
  // context value
  const [lang, setLang] = useState("");
  const LangValue = { lang, setLang };
  useEffect(() => {
    setLang(window.localStorage.getItem("lang"));
  }, []);
  console.log(window.localStorage.getItem("lang"));
  return (
    <Router>
      <LanguageCon.Provider value={LangValue}>
        <div className="App h-screen overflow-hidden">
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/create-password" element={<CreatePass />} />
          </Routes>
        </div>
      </LanguageCon.Provider>
    </Router>
  );
}

export default App;
