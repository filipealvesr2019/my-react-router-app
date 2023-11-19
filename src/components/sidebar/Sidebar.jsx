import "./sidebar.css";
import React from "react";
import "./sidebar.css";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import TimelineIcon from "@mui/icons-material/Timeline";
import CategoryIcon from "@mui/icons-material/Category";
import BarChartIcon from "@mui/icons-material/BarChart";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import AddCardIcon from "@mui/icons-material/AddCard";
import { Home } from "../../pages/home/Home";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Admin from "../../pages/Admin/Admin";
import Config from "../../pages/Config/Config";
import Products from "../../pages/Products/Products";
import Reports from "../../pages/Reports/Reports";
import Deals from "../../pages/Deals/Deals";
import Sales from "../../pages/Sales/Sales";
import Categories from "../../pages/Categories/Category";
import Clients from "../../pages/Clients/Clients";
import Transactions from "../../pages/Transactions/Transaction";


import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
export const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

 

  return (
    <>
      <div className="sidebarMobile">
      <div className="hamburger-menu">
      <div className="hamburger-icon " onClick={toggleMenu}>
        {menuOpen ? <CloseIcon /> : <MenuIcon />}
      </div>
      {menuOpen && (
        <div className="menu">
          {/* Adicione seus itens de menu aqui */}
          <div className="sidebar">
        <div className="sidebarWrapper">
          
          <div className="sidebarMenu ">
            <h3 className="sidebarTitle">Dashboard</h3>
            <ul className="sidebarList">
              <li className="sidebarlistItem ">
              <CloseIcon className="close-icon " onClick={toggleMenu}></CloseIcon>
                <Link to="/Home"  onClick={toggleMenu}>
                  <LineStyleIcon />
                </Link>

                <Link to="/Home" onClick={toggleMenu}>
                  {" "}
                  <span>Home</span>
                </Link>
              </li>
              <li className="sidebarlistItem">
                <Link to="/Produtos" onClick={toggleMenu}>
                  <AddCardIcon />
                </Link>

                <Link to="/Produtos" onClick={toggleMenu}>Produtos</Link>
              </li>
              <li className="sidebarlistItem">
                <Link to="/Categorias" onClick={toggleMenu}>
                  <CategoryIcon />
                </Link>

                <Link to="/Categorias" onClick={toggleMenu}>
                  {" "}
                  <span>Categorias</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Menu Rapido</h3>
            <ul className="sidebarList">
              <li className="sidebarlistItem">
                <Link to="/Administrador" onClick={toggleMenu}>
                  <SupervisorAccountIcon />
                </Link>
                <Link to="/Administrador" onClick={toggleMenu}>
                  {" "}
                  <span>Cadastro</span>
                </Link>
              </li>
              <li className="sidebarlistItem">
                <Link to="/Configuração" onClick={toggleMenu}>
                  {" "}
                  <SettingsIcon />
                </Link>

                <Link to="/Configuração" onClick={toggleMenu}>
                  {" "}
                  <span>configuração</span>
                </Link>
              </li>
              <li className="sidebarlistItem">
                <Link to="/Clientes" onClick={toggleMenu}>
                  <LocalMallIcon />
                </Link>

                <Link to="/Clientes" onClick={toggleMenu}>
                  <span>Clientes</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Financeiro</h3>
            <ul className="sidebarList">
              <li className="sidebarlistItem">
                <Link to="/Balanços" onClick={toggleMenu}>
                  {" "}
                  <BarChartIcon />
                </Link>

                <Link to="/Balanços" onClick={toggleMenu}>
                  {" "}
                  <span>Balanços</span>
                </Link>
              </li>
              <li className="sidebarlistItem">
                <Link to="/Vendas" onClick={toggleMenu}>
                  {" "}
                  <MonetizationOnIcon />
                </Link>

                <Link to="/Vendas" onClick={toggleMenu}>
                  {" "}
                  <span>Vendas</span>
                </Link>
              </li>
              <li className="sidebarlistItem">
                <Link to="/Transações" onClick={toggleMenu}>
                  <TimelineIcon />
                </Link>

                <Link to="/Transações" onClick={toggleMenu}>
                  {" "}
                  <span>Transações</span>
                </Link>
              </li>
              <li className="sidebarlistItem">
                <Link to="/Relatórios" onClick={toggleMenu}>
                  {" "}
                  <DataSaverOffIcon />
                </Link>

                <Link to="/Relatórios" onClick={toggleMenu}>
                  {" "}
                  <span>Relatórios</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
        </div>
      )}
    </div>
      </div>


      <div className="sidebar desktop">
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Dashboard</h3>
            <ul className="sidebarList">
              <li className="sidebarlistItem">
                <Link to="/Home">
                  <LineStyleIcon />
                </Link>

                <Link to="/Home">
                  {" "}
                  <span>Home</span>
                </Link>
              </li>
              <li className="sidebarlistItem">
                <Link to="/Produtos">
                  <AddCardIcon />
                </Link>

                <Link to="/Produtos">Produtos</Link>
              </li>
              <li className="sidebarlistItem">
                <Link to="/Categorias">
                  <CategoryIcon />
                </Link>

                <Link to="/Categorias">
                  {" "}
                  <span>Categorias</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Menu Rapido</h3>
            <ul className="sidebarList">
              <li className="sidebarlistItem">
                <Link to="/Administrador">
                  <SupervisorAccountIcon />
                </Link>
                <Link to="/Administrador">
                  {" "}
                  <span>Cadastro</span>
                </Link>
              </li>
              <li className="sidebarlistItem">
                <Link to="/Configuração">
                  {" "}
                  <SettingsIcon />
                </Link>

                <Link to="/Configuração">
                  {" "}
                  <span>configuração</span>
                </Link>
              </li>
              <li className="sidebarlistItem">
                <Link to="/Clientes">
                  <LocalMallIcon />
                </Link>

                <Link to="/Clientes">
                  <span>Clientes</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Financeiro</h3>
            <ul className="sidebarList">
              <li className="sidebarlistItem">
                <Link to="/Balanços">
                  {" "}
                  <BarChartIcon />
                </Link>

                <Link to="/Balanços">
                  {" "}
                  <span>Balanços</span>
                </Link>
              </li>
              <li className="sidebarlistItem">
                <Link to="/Vendas">
                  {" "}
                  <MonetizationOnIcon />
                </Link>

                <Link to="/Vendas">
                  {" "}
                  <span>Vendas</span>
                </Link>
              </li>
              <li className="sidebarlistItem">
                <Link to="/Transações">
                  <TimelineIcon />
                </Link>

                <Link to="/Transações">
                  {" "}
                  <span>Transações</span>
                </Link>
              </li>
              <li className="sidebarlistItem">
                <Link to="/Relatórios">
                  {" "}
                  <DataSaverOffIcon />
                </Link>

                <Link to="/Relatórios">
                  {" "}
                  <span>Relatórios</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/Administrador" element={<Admin />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Produtos" element={<Products />} />
        <Route path="/Categorias" element={<Categories />} />
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
