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

import { Link } from "react-router-dom";



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
        
        <>
        <div className="overlay" onClick={toggleMenu}></div>

        <div className="menu">
          {/* Adicione seus itens de menu aqui */}
          <div className="sidebar">
        <div className="sidebarWrapper">
          
          <div className="sidebarMenu ">
            <h3 className="sidebarTitle">Dashboard</h3>
            <ul className="sidebarList">
              <li className="sidebarlistItem ">
              <CloseIcon className="close-icon " onClick={toggleMenu}></CloseIcon>
                <Link to="/home"  onClick={toggleMenu}>
                  <LineStyleIcon />
                </Link>

                <Link to="/home" onClick={toggleMenu}>
                  {" "}
                  <span>Home</span>
                </Link>
              </li>
              <li className="sidebarlistItem">
                <Link to="/produtos" onClick={toggleMenu}>
                  <AddCardIcon />
                </Link>

                <Link to="/produtos" onClick={toggleMenu}>Produtos</Link>
              </li>
              <li className="sidebarlistItem">
                <Link to="/categorias" onClick={toggleMenu}>
                  <CategoryIcon />
                </Link>

                <Link to="/categorias" onClick={toggleMenu}>
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
                <Link to="/administrador" onClick={toggleMenu}>
                  <SupervisorAccountIcon />
                </Link>
                <Link to="/administrador" onClick={toggleMenu}>
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
            </>

      )}
    </div>
      </div>


      <div className="sidebar desktop">
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Dashboard</h3>
            <ul className="sidebarList">
              <li className="sidebarlistItem">
                <Link to="/home">
                  <LineStyleIcon />
                </Link>

                <Link to="/home">
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
                <Link to="/cadastro">
                  <SupervisorAccountIcon />
                </Link>
                <Link to="/cadastro">
                  {" "}
                  <span>Cadastro</span>
                </Link>
              </li>
              <li className="sidebarlistItem">
                <Link to="/configuracao">
                  {" "}
                  <SettingsIcon />
                </Link>

                <Link to="/configuracao">
                  {" "}
                  <span>configuração</span>
                </Link>
              </li>
              <li className="sidebarlistItem">
                <Link to="/clientes">
                  <LocalMallIcon />
                </Link>

                <Link to="/clientes">
                  <span>Clientes</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Financeiro</h3>
            <ul className="sidebarList">
              <li className="sidebarlistItem">
                <Link to="/balanços">
                  {" "}
                  <BarChartIcon />
                </Link>

                <Link to="/balanços">
                  {" "}
                  <span>Balanços</span>
                </Link>
              </li>
              <li className="sidebarlistItem">
                <Link to="/vendas">
                  {" "}
                  <MonetizationOnIcon />
                </Link>

                <Link to="/tendas">
                  {" "}
                  <span>Vendas</span>
                </Link>
              </li>
              <li className="sidebarlistItem">
                <Link to="/transacoes">
                  <TimelineIcon />
                </Link>

                <Link to="/transacoes">
                  {" "}
                  <span>Transações</span>
                </Link>
              </li>
              <li className="sidebarlistItem">
                <Link to="/relatorios">
                  {" "}
                  <DataSaverOffIcon />
                </Link>

                <Link to="/relatorios">
                  {" "}
                  <span>Relatórios</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
     
    </>
  );
};
