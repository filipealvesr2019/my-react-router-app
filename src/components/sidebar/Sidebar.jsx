import "./sidebar.css";
import React from "react";
import "./sidebar.css";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import TimelineIcon from "@mui/icons-material/Timeline";
import CategoryIcon from '@mui/icons-material/Category';
import BarChartIcon from '@mui/icons-material/BarChart';
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AddCardIcon from '@mui/icons-material/AddCard';
import {Home} from "../../pages/home/Home"

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
              <span>Home</span>
            </li>
            <li className="sidebarlistItem">
              <AddCardIcon />
              <span>Produtos</span>
            </li>
            <li className="sidebarlistItem">
              <CategoryIcon />
              <span>Categorias</span>
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Menu Rapido</h3>
          <ul className="sidebarList">
            <li className="sidebarlistItem">
              <SupervisorAccountIcon />
              <span>Cadastro de Usuários</span>
            </li>
            <li className="sidebarlistItem">
              <SettingsIcon />
              <span>configuração</span>
            </li>
            <li className="sidebarlistItem">
              <LocalMallIcon />
              <span>Clientes</span>
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Financeiro</h3>
          <ul className="sidebarList">
            <li className="sidebarlistItem">
              <BarChartIcon />
              <span>Balanços</span>
            </li>
            <li className="sidebarlistItem">
              <MonetizationOnIcon />
              <span>Vendas</span>
            </li>
            <li className="sidebarlistItem">
              <TimelineIcon />
              <span>Transações</span>
            </li>
            <li className="sidebarlistItem">
              <DataSaverOffIcon />
              <span>Relatórios</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Home></Home>
    </>
  );
};
