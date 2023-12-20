import React, { useRef, useEffect, useState } from "react";
import "./AdminPage.css";
import { useAuth } from "./context/AuthContext";

const Navbar = ({ changePage }) => {
  return (
    <nav>
      <ul>
        <li>
          <button></button>
        </li>
        <li>
          <button></button>
        </li>
        <li>
          <button></button>
        </li>
      </ul>
    </nav>
  );
};

const Content = ({ currentPage }) => {
  switch (currentPage) {
    case "register":
      return <RegisterPage />;
    case "financial":
      return <FinancialPage />;
    case "stock":
      return <StockPage />;
    case "fiscal":
      return <FiscalPage />;
    case "reports":
      return <ReportsPage />;

    default:
      return <HomePage />;
  }
};

const HomePage = () => {
  return <div style={{ color: "white" }}>Home Page</div>;
};

const RegisterPage = () => {
  return <div style={{ color: "white" }}>Register Page</div>;
};

const FinancialPage = () => {
  return <div style={{ color: "white" }}>financial page</div>;
};
const StockPage = () => {
  return <div style={{ color: "white" }}>Stock Page</div>;
};

const FiscalPage = () => {
  return <div style={{ color: "white" }}>Fiscal Page</div>;
};
const ReportsPage = () => {
  return <div style={{ color: "white" }}>Reports Page </div>;
};

const AdminPage = () => {
  const { logout } = useAuth();
  const indicatorRef = useRef(null);

  useEffect(() => {
    // Obtendo todas as âncoras dentro do elemento nav
    const items = document.querySelectorAll("nav a");

    // Função para atualizar a posição e largura do indicador
    const marker = (e) => {
      indicatorRef.current.style.left = e.offsetLeft + "px";
      indicatorRef.current.style.width = e.offsetWidth + "px";
    };

    // Adicionando um event listener para cada âncora
    items.forEach((link) => {
      link.addEventListener("click", (e) => {
        marker(e.target);
      });
    });

    // Cleanup: removendo os event listeners quando o componente é desmontado
    return () => {
      items.forEach((link) => {
        link.removeEventListener("click", marker);
      });
    };
  }, []); // O array vazio significa que este efeito só é executado após a montagem inicial do componente
  const [currentPage, setCurrentPage] = useState("home");

  const changePage = (page) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <header>
        <a href="#" className="logo">
          Logo
        </a>
        <nav>
          {/* Ref para a div do indicador */}
          <div ref={indicatorRef} id="indicator"></div>
          <a href="#" onClick={() => changePage("home")}>
            Home
          </a>
          <a href="#" onClick={() => changePage("register")}>
            Cadastros
          </a>
          <a href="#" onClick={() => changePage("financial")}>
            Financeiro
          </a>
          <a href="#" onClick={() => changePage("stock")}>
            Estoque
          </a>
          <a href="#" onClick={() => changePage("fiscal")}>
            Fiscal
          </a>
          <a href="#" onClick={() => changePage("reports")}>
            Relatórios
          </a>
        </nav>
      </header>
      <Navbar changePage={changePage} />
      <Content currentPage={currentPage} />
    </div>
  );
};

export default AdminPage;
