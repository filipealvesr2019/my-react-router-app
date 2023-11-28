// src/App.jsx
import React from "react";
import Login from "./components/Login";
import AdminPage from "./AdminPage"
import EmployeePage from "./EmployeePage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/employee" element={<EmployeePage />} />
      </Routes>
    </Router>
    </>
  );
};

export default App;
