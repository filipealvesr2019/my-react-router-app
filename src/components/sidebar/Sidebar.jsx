import "./sidebar.css";

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
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../context/AuthContext";

import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
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
                          <CloseIcon
                            className="close-icon "
                            onClick={toggleMenu}
                          ></CloseIcon>
                          <Link to="/home" onClick={toggleMenu}>
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

                          <Link to="/produtos" onClick={toggleMenu}>
                            Produtos
                          </Link>
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
                          <Link to="/Configuracao" onClick={toggleMenu}>
                            {" "}
                            <SettingsIcon />
                          </Link>

                          <Link to="/Configuraco" onClick={toggleMenu}>
                            {" "}
                            <span>configuração</span>
                          </Link>
                        </li>
                        <li className="sidebarlistItem">
                          <Link to="/clientes" onClick={toggleMenu}>
                            <LocalMallIcon />
                          </Link>

                          <Link to="/clientes" onClick={toggleMenu}>
                            <span>Clientes</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="sidebarMenu">
                      <h3 className="sidebarTitle">Financeiro</h3>
                      <ul className="sidebarList">
                        <li className="sidebarlistItem">
                          <Link to="/balanços" onClick={toggleMenu}>
                            {" "}
                            <BarChartIcon />
                          </Link>

                          <Link to="/Balanços" onClick={toggleMenu}>
                            {" "}
                            <span>Balanços</span>
                          </Link>
                        </li>
                        <li className="sidebarlistItem">
                          <Link to="/vendas" onClick={toggleMenu}>
                            {" "}
                            <MonetizationOnIcon />
                          </Link>

                          <Link to="/vendas" onClick={toggleMenu}>
                            {" "}
                            <span>Vendas</span>
                          </Link>
                        </li>
                        <li className="sidebarlistItem">
                          <Link to="/transacoes" onClick={toggleMenu}>
                            <TimelineIcon />
                          </Link>

                          <Link to="/transacoes" onClick={toggleMenu}>
                            {" "}
                            <span>Transações</span>
                          </Link>
                        </li>
                        <li className="sidebarlistItem">
                          <Link to="/relatorios" onClick={toggleMenu}>
                            {" "}
                            <DataSaverOffIcon />
                          </Link>

                          <Link to="/relatorios" onClick={toggleMenu}>
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
                <Link to="/produtos">
                  <AddCardIcon />
                </Link>

                <Link to="/produtos">Produtos</Link>
              </li>
              <li className="sidebarlistItem">
                <Link to="/categorias">
                  <CategoryIcon />
                </Link>

                <Link to="/categorias">
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
                <Link to="/balancos">
                  {" "}
                  <BarChartIcon />
                </Link>

                <Link to="/balancos">
                  {" "}
                  <span>Balanços</span>
                </Link>
              </li>
              <li className="sidebarlistItem">
                <Link to="/vendas">
                  {" "}
                  <MonetizationOnIcon />
                </Link>

                <Link to="/vendas">
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
