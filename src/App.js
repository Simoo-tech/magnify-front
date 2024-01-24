import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { LanguageCon, TimeSpent } from "./Context";
import { useEffect, useState } from "react";
import { CreatePass } from "./pages/CreatePass";
import { CreateUser, Dashbaord, EditUser } from "./pages/Dashboard/Dashbaord";
import { UserProjects } from "./pages/UserProjects";
import { ResetPass, Verify } from "./pages/Verify&Reset";
import { Projects } from "./pages/Projects";
import { MissingPhoto, SessionData, UploadFiles } from "./pages/UploadFiles";
import { useCookies } from "react-cookie";
import cookie from "react-cookies";

import axios from "axios";

function App() {
  const [lang, setLang] = useState("");
  const [TimeSpendCoun, setTimeSpendCoun] = useState({
    min: 0,
    hour: 0,
  });

  const TimeSpentVal = { TimeSpendCoun, setTimeSpendCoun };
  const LangValue = { lang, setLang };

  // Session timeout
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

  // session Time
  let Newmin;
  let storeMin = window.localStorage.getItem("session_time");
  if (storeMin) {
    Newmin = parseInt(storeMin);
  } else {
    Newmin = 0;
  }

  const StartTimer = () => {
    setInterval(() => {
      Newmin = Newmin + 1;
      const NewHour = Math.floor(Newmin / 60);
      setTimeSpendCoun({ ...TimeSpendCoun, min: Newmin, hour: NewHour });
      window.localStorage.setItem("session_time", Newmin);
    }, 60000);
  };

  useEffect(() => {
    setLang(window.localStorage.getItem("lang"));
    if (cookies.user_token) {
      Session();
      StartTimer();
    }
  }, []);

  // user ID
  const userID = window.localStorage.getItem("userID");
  const verify_email = window.localStorage.getItem("verify-email");
  const resetToken = window.localStorage.getItem("resetToken");

  return (
    <Router>
      <LanguageCon.Provider value={LangValue}>
        <TimeSpent.Provider value={TimeSpentVal}>
          <div
            className="App h-screen overflow-hidden relative flex bg-color1
          items-center flex-col"
          >
            <Routes>
              <Route path={"/"} element={<Login />} />
              <Route path={"/:id"} element={<Login />} />
              <Route path={"*"} element={<Login />} />
              <Route path="/upload-files" element={<UploadFiles />}>
                <Route path="missing-photo" element={<MissingPhoto />} />
                <Route path="session-data" element={<SessionData />} />
              </Route>
              <Route path={`/${userID}/dashboard`} element={<Dashbaord />}>
                <Route path="create-user" element={<CreateUser />} />
                <Route path=":id/edit-user" element={<EditUser />} />
              </Route>
              <Route
                path={`/create-password/${verify_email}`}
                element={<CreatePass />}
              />
              <Route
                path={`/reset-password/${resetToken}`}
                element={<CreatePass />}
              />
              <Route path={`/verify-email/${userID}`} element={<Verify />} />
              <Route path={`/reset-password`} element={<ResetPass />} />
              <Route
                path={`/${userID}/tour-projects`}
                element={<UserProjects />}
              >
                <Route path=":id" element={<Projects />} />
              </Route>
            </Routes>
          </div>
        </TimeSpent.Provider>
      </LanguageCon.Provider>
    </Router>
  );
}

export default App;
