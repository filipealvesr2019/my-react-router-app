import App from "./App.jsx";
import "./index.css";

// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
    <AuthProvider>
      <App />
    </AuthProvider>
    </ErrorBoundary>

  </React.StrictMode>
);
