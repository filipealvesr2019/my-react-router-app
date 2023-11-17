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
import Admin from "../../pages/Admin/Admin"
export const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Dashboard</h3>
            <ul className="sidebarList">
              <li className="sidebarlistItem">
                <LineStyleIcon />
                <Link to="/Home">
                  {" "}
                  <span>Home</span>
                </Link>
              </li>
              <li className="sidebarlistItem">
                <AddCardIcon />
                <Link to="/Produtos">Produtos</Link>
              </li>
              <li className="sidebarlistItem">
                <CategoryIcon />
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
                <SupervisorAccountIcon />
                <Link to="/Administrador">
                  {" "}
                  <span>Cadastro de Usuários</span>
                </Link>
              </li>
              <li className="sidebarlistItem">
                <SettingsIcon />
                <Link to="/Configuração">
                  {" "}
                  <span>configuração</span>
                </Link>
              </li>
              <li className="sidebarlistItem">
                <LocalMallIcon />

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
                <BarChartIcon />
                <Link to="/Balanços">
                  {" "}
                  <span>Balanços</span>
                </Link>
              </li>
              <li className="sidebarlistItem">
                <MonetizationOnIcon />
                <Link to="/Vendas">
                  {" "}
                  <span>Vendas</span>
                </Link>
              </li>
              <li className="sidebarlistItem">
                <TimelineIcon />
                <Link to="/Transações">
                  {" "}
                  <span>Transações</span>
                </Link>
              </li>
              <li className="sidebarlistItem">
                <DataSaverOffIcon />
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
      </Routes>
      
    </>
  );
};
