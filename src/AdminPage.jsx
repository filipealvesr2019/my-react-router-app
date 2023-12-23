import React, { useRef, useEffect, useState } from "react";
import "./AdminPage.css";
import { useAuth } from "./context/AuthContext";
import Admin from "./pages/Admin/Admin";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
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
  return <div style={{ marginTop: "5rem" }}>Home Page</div>;
};

const RegisterPage = () => {
  return (
    <div
      style={{ marginTop: "5rem", display: "flex", justifyContent: "center" }}
    >
      <Admin />
    </div>
  );
};

const FinancialPage = () => {
  return <div style={{}}>financial page</div>;
};
const StockPage = () => {
  return <div style={{}}>Stock Page</div>;
};

const FiscalPage = () => {
  return <div style={{}}>Fiscal Page</div>;
};
const ReportsPage = () => {
  return <div style={{}}>Reports Page </div>;
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

  const [activeLink, setActiveLink] = useState("home");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div>
      <header>
    
        <h1 href="#" className="logo" onClick={() => changePage("home")}>
          Painel Administrativo
        </h1>
        <nav className="nav">
          {/* Ref para a div do indicador */}
          <div ref={indicatorRef} ></div>
          <a
            href="#"
            onClick={() => {
              changePage("home");
              handleLinkClick("home");
              // Adicione mais lógica, se necessário
            }}
            className={activeLink === "home" ? "active" : ""}
          >
            Home
          </a>
          <a
            href="#"
            onClick={() => {
              changePage("register");
              handleLinkClick("register");
              // Adicione mais lógica, se necessário
            }}
            className={activeLink === "register" ? "active" : ""}
          >
            Cadastros
          </a>
          <a href="#"  onClick={() => {
              changePage("financial");
              handleLinkClick("financial");
              // Adicione mais lógica, se necessário
            }}
            className={activeLink === "financial" ? "active" : ""}>
            Financeiro
          </a>
          <a href="#" onClick={() => {
              changePage("stock");
              handleLinkClick("stock");
              // Adicione mais lógica, se necessário
            }}
            className={activeLink === "stock" ? "active" : ""}>
            Estoque
          </a>
          <a href="#" onClick={() => {
              changePage("fiscal");
              handleLinkClick("fiscal");
              // Adicione mais lógica, se necessário
            }}
            className={activeLink === "fiscal" ? "active" : ""}>
            Fiscal
          </a>
          <a href="#" onClick={() => {
              changePage("reports");
              handleLinkClick("reports");
              // Adicione mais lógica, se necessário
            }}
            className={activeLink === "reports" ? "active" : ""}>
            Relatórios
          </a>
        </nav>
        <div className="navbar">
      <div className="menu-icon" onClick={toggleMenu}>
        {isMenuOpen ? (
          <div><CloseIcon style={{color:"white",marginLeft:"7rem"}}/></div> // Ícone de fechar menu
        ) : (
          <div><MenuIcon style={{color:"white"}}/></div> // Ícone de três linhas
        )}
      </div>

      {/* Menu Navbar */}
      {isMenuOpen && (
        <div className="menu-items">
          <div className="mobileMenu">
         <a
            href="#"
            onClick={() => {
              changePage("home");
              handleLinkClick("home");
              // Adicione mais lógica, se necessário
            }}
            className={activeLink === "home" ? "active" : ""}
          >
            Home
          </a>
          <a
            href="#"
            onClick={() => {
              changePage("register");
              handleLinkClick("register");
              // Adicione mais lógica, se necessário
            }}
            className={activeLink === "register" ? "active" : ""}
          >
            Cadastros
          </a>
          <a href="#"  onClick={() => {
              changePage("financial");
              handleLinkClick("financial");
              // Adicione mais lógica, se necessário
            }}
            className={activeLink === "financial" ? "active" : ""}>
            Financeiro
          </a>
          <a href="#" onClick={() => {
              changePage("stock");
              handleLinkClick("stock");
              // Adicione mais lógica, se necessário
            }}
            className={activeLink === "stock" ? "active" : ""}>
            Estoque
          </a>
          <a href="#" onClick={() => {
              changePage("fiscal");
              handleLinkClick("fiscal");
              // Adicione mais lógica, se necessário
            }}
            className={activeLink === "fiscal" ? "active" : ""}>
            Fiscal
          </a>
          <a href="#" onClick={() => {
              changePage("reports");
              handleLinkClick("reports");
              // Adicione mais lógica, se necessário
            }}
            className={activeLink === "reports" ? "active" : ""}>
            Relatórios
          </a>
          </div>
        </div>
      )}
    </div>
      </header>
      <Content currentPage={currentPage} />
    </div>
  );
};

export default AdminPage;
