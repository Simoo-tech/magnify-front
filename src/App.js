import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import LanguageCon from "./Context";
import { useEffect, useState } from "react";
import { Header } from "./component/Header";

function App() {
  // context value
  const [english, setEnglish] = useState("");
  const LangValue = { english, setEnglish };
  useEffect(() => {
    setEnglish(window.localStorage.getItem("lang"));
  }, []);
  return (
    <Router>
      <LanguageCon.Provider value={LangValue}>
        <div className="App h-screen overflow-hidden">
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      </LanguageCon.Provider>
    </Router>
  );
}

export default App;
