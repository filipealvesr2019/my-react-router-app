// src/App.jsx
import React from "react";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Products from "./pages/Products/Products";
import Admin from './pages/Admin/Admin';
import Categories from  "./pages/Categories/Category"
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
        <Route path="/Configuração" element={<Products />} />
        <Route path="/Clientes" element={<Products />} />
        <Route path="/Vendas" element={<Products />} />
        <Route path="/Transações" element={<Products />} />
        <Route path="/Relatórios" element={<Products />} />
        <Route path="/Balanços" element={<Products />} />



      </Routes>
    </>
  );
};

export default App;
