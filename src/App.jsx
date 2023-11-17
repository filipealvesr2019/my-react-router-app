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
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/config" element={<Products />} />
        <Route path="/clients" element={<Products />} />
        <Route path="/sales" element={<Products />} />
        <Route path="/transactions" element={<Products />} />
        <Route path="/reports" element={<Products />} />


      </Routes>
    </>
  );
};

export default App;
