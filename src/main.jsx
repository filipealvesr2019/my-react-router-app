import App from "./App.jsx";
import "./index.css";

// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
    <AuthProvider>
    <ToastContainer />

      <App />
    </AuthProvider>
    </ErrorBoundary>

  </React.StrictMode>
);
