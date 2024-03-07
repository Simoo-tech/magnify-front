import "./App.css";
import { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageCon, TimeSpent } from "./Context";
import { useCookies } from "react-cookie";
import { Session, StartTimer } from "./functions/SessionTime";
import Layout from "./Layout";
import { Loading } from "./component/Loading";

const Login = lazy(() => import("./pages/Login"));
const CreatePass = lazy(() => import("./pages/CreatePass"));
const CreateUser = lazy(() => import("./pages/Dashboard/CreateUser"));
const Dashbaord = lazy(() => import("./pages/Dashboard/Dashbaord"));
const EditUser = lazy(() => import("./pages/Dashboard/EditUser"));
const UserProjects = lazy(() => import("./pages/UserProjects"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const ResetPass = lazy(() => import("./pages/ResetPass"));
const Projects = lazy(() => import("./pages/Projects"));
const MissingPhoto = lazy(() => import("./pages/Upload files/MissingPhoto"));
const SessionData = lazy(() => import("./pages/Upload files/SessionData"));
const UploadFiles = lazy(() => import("./pages/Upload files/UploadFiles"));
const GoodBye = lazy(() => import("./pages/GoodBye"));
const NotFound = lazy(() => import("./component/NotFound"));

function App() {
  // user session calculator
  const [TimeSpendCoun, setTimeSpendCoun] = useState({
    min: 0,
    hour: 0,
  });
  const TimeSpentVal = { TimeSpendCoun, setTimeSpendCoun };

  // set language
  const [lang, setLang] = useState("");
  const LangValue = { lang, setLang };

  const [cookies] = useCookies(["user_token"]);

  useEffect(() => {
    setLang(window.localStorage.getItem("lang"));
    if (cookies.user_token) {
      Session({ cookies });
      StartTimer({ setTimeSpendCoun, TimeSpendCoun });
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
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route element={<Layout />}>
                  <Route path={"/"} element={<Login />} />
                  <Route path={"/:id"} element={<Login />} />
                  <Route path={"*"} element={<NotFound />} />
                  <Route path="upload-files" element={<UploadFiles />}>
                    <Route path="missing-photo" element={<MissingPhoto />} />
                    <Route path="session-data" element={<SessionData />} />
                  </Route>
                  <Route path={`/${userID}/dashboard`} element={<Dashbaord />}>
                    <Route path="create-user" element={<CreateUser />} />
                    <Route path=":id/edit-user" element={<EditUser />} />
                  </Route>
                  <Route
                    path={`create-password/${verify_email}`}
                    element={<CreatePass />}
                  />
                  <Route
                    path={`reset-password/${resetToken}`}
                    element={<CreatePass />}
                  />
                  <Route
                    path={`verify-email/${userID}`}
                    element={<VerifyEmail />}
                  />
                  <Route path={`reset-password`} element={<ResetPass />} />
                </Route>
                <Route path="logout" element={<GoodBye />} />
                <Route
                  path={`/${userID}/tour-projects`}
                  element={<UserProjects />}
                >
                  <Route path=":id" element={<Projects />} />
                </Route>
              </Routes>
            </Suspense>
          </div>
        </TimeSpent.Provider>
      </LanguageCon.Provider>
    </Router>
  );
}

export default App;
