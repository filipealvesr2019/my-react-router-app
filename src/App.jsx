// src/App.jsx
import React from "react";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Products from "./pages/Products/Products";
import Admin from './pages/Admin/Admin';
import Categories from  "./pages/Categories/Category"
import Clients from  "./pages/Clients/Clients"
import Reports from  "./pages/Reports/Reports"
import Sales from  "./pages/Sales/Sales"
import Config from  "./pages/Config/Config"
import Transactions from "./pages/Transactions/Transaction"
import Deals from "./pages/Deals/Deals"

import "./App.css";
const App = () => {
  return (
    <>
      <div>
        <Login />
      </div>
      <Routes>
        <Route path="/Produtos" element={<Products />} />
        <Route path="/Categorias" element={<Categories />} />
        <Route path="/Administrador" element={<Admin />} />
        <Route path="/Configuração" element={<Config />} />
        <Route path="/Clientes" element={<Clients />} />
        <Route path="/Vendas" element={<Sales />} />
        <Route path="/Transações" element={<Transactions />} />
        <Route path="/Relatórios" element={<Reports />} />
        <Route path="/Balanços" element={<Deals />} />
      </Routes>
    </>
  );
};

export default App;
