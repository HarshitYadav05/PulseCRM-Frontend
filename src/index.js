import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Bootstrap styles
import "react-toastify/dist/ReactToastify.css"; // ✅ Toastify styles
import "./index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "./context/ThemeContext"; // ✅ Import Theme Context

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* ✅ Inline CSS to enable smooth theme transition */}
    <style>
      {`
        body {
          transition: background-color 0.4s, color 0.4s;
        }
      `}
    </style>

    {/* ✅ Wrap App inside ThemeProvider so dark/light mode applies globally */}
    <ThemeProvider>
      <App />
      {/* ✅ Toast Container for global notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
