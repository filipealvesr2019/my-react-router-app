// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';


import Login from './components/Login';
import Admin from "./pages/Admin/Admin";
import  {Home}  from "./pages/home/Home";
import Products from "./pages/Products/Products";
import Config from "./pages/Config/Config";
import Clients from "./pages/Clients/Clients";
import Sales from "./pages/Sales/Sales";
import Reports from "./pages/Reports/Reports";
import Deals from "./pages/Deals/Deals";
import Categories from "./pages/Categories/Category";
import Transactions from "./pages/Transactions/Transaction";
import {Sidebar} from "./components/sidebar/Sidebar";
import AdminPage from './AdminPage';
import EmployeePage from './EmployeePage';
import ErrorBoundary from "./errors/ErrorBoundary"
function App() {
  return (
    <Router>
      <ErrorBoundary>

      <AuthProvider>
        <div className='containerLogin'>
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
          <Routes>
        <Route path="/cadastro" element={<Admin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/produtos" element={<Products />} />
        <Route path="/categorias" element={<Categories />} />
        <Route path="/configuracao" element={<Config />} />
        <Route path="/clientes" element={<Clients />} />
        <Route path="/vendas" element={<Sales />} />
        <Route path="/transacoes" element={<Transactions />} />
        <Route path="/relatorios" element={<Reports />} />
        <Route path="/balancos" element={<Deals />} />
      </Routes>

        </div>
      </AuthProvider>
      </ErrorBoundary>

    </Router>
  );
}

export default App;
