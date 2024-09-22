import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { LangProvider } from "./context/LangContext";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./fonts/PNU-Regular.ttf";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <LangProvider>
          <App />
        </LangProvider>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
