// src/App.jsx
import React from "react";
import Login from "./components/Login";
import AdminPage from "./AdminPage"
import EmployeePage from "./EmployeePage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Admin from "./pages/Admin/Admin";
import { Home } from "@mui/icons-material";
import Products from "./pages/Products/Products";
import Config from "./pages/Config/Config";
import Clients from "./pages/Clients/Clients";
import Sales from "./pages/Sales/Sales";
import Reports from "./pages/Reports/Reports";
import Deals from "./pages/Deals/Deals";
import Categories from "./pages/Categories/Category";
import Transactions from "./pages/Transactions/Transaction";


const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/employee" element={<EmployeePage />} />
      </Routes>
      <Routes>
        <Route path="/cadastro" element={<Admin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/produtos" element={<Products />} />
        <Route path="/categorias" element={<Categories />} />
        <Route path="/configuração" element={<Config />} />
        <Route path="/clientes" element={<Clients />} />
        <Route path="/vendas" element={<Sales />} />
        <Route path="/transacoes" element={<Transactions />} />
        <Route path="/relatorios" element={<Reports />} />
        <Route path="/balanços" element={<Deals />} />
      </Routes>
    </Router>
    </>
  );
};

export default App;
