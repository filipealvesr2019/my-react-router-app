// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
 import Clients from "./pages/Financial/Clients/Clients"
import Login from "./components/Login";

import AdminPage from "./AdminPage";
import EmployeePage from "./EmployeePage";
import EditClients from "./pages/Financial/Clients/EditClients";
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <div className="containerLogin">
            <nav>
              <ul>
                <li>
                  <Link to="/"></Link>
                </li>
              </ul>
            </nav>

            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/employee" element={<EmployeePage />} />


            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
