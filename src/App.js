import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import LanguageCon from "./Context";
import { useState } from "react";
import { Header } from "./component/Header";

function App() {
  // context value
  const [english, setEnglish] = useState(true);
  const LangValue = { english, setEnglish };

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
