import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "./context/CurrentUserContext";
import { CurrentUserProfileProvider } from "./context/CurrentUserProfileContext";
import { LearningCategoryProvider } from "./context/LearninCategoryContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <CurrentUserProvider>
      <CurrentUserProfileProvider>
        <LearningCategoryProvider>
          <App />
          <ToastContainer
            position="top-right"
            theme="dark"
            autoClose="3000"
            style={{ padding: "30px 10px", width: "45%" }}
          />
        </LearningCategoryProvider>
      </CurrentUserProfileProvider>
    </CurrentUserProvider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
