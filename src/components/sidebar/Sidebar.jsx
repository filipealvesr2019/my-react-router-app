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
                <Link to="/products">Productos</Link>
              </li>
              <li className="sidebarlistItem">
                <CategoryIcon />
                <Link to="/">
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
                <Link to="/">
                  {" "}
                  <span>Cadastro de Usuários</span>
                </Link>
              </li>
              <li className="sidebarlistItem">
                <SettingsIcon />
                <Link to="/">
                  {" "}
                  <span>configuração</span>
                </Link>
              </li>
              <li className="sidebarlistItem">
                <LocalMallIcon />

                <Link to="/">
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
                <Link to="/">
                  {" "}
                  <span>Balanços</span>
                </Link>
              </li>
              <li className="sidebarlistItem">
                <MonetizationOnIcon />
                <Link to="/">
                  {" "}
                  <span>Vendas</span>
                </Link>
              </li>
              <li className="sidebarlistItem">
                <TimelineIcon />
                <Link to="/">
                  {" "}
                  <span>Transações</span>
                </Link>
              </li>
              <li className="sidebarlistItem">
                <DataSaverOffIcon />
                <Link to="/">
                  {" "}
                  <span>Relatórios</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Home></Home>
    </>
  );
};
