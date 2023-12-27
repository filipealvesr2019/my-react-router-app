import React, { useRef, useEffect, useState } from "react";
import "./AdminPage.css";
import { useAuth } from "./context/AuthContext";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import User from "./pages/Cadastros/User";
import Products from "./pages/Cadastros/Products";
import Categories from "./pages/Cadastros/Categories";
import Config from "./pages/Config/Config"
import LogoutIcon from '@mui/icons-material/Logout';

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
  const { logout } = useAuth();
  const [activeNavItem, setActiveNavItem] = useState(null);

  const handleClickOtherNavbar = (index) => {
    setActiveNavItem(index);
  };
  
  const renderPage = () => {
    switch (activeNavItem) {
      case 0:
        return <User/>;
      case 1:
        return <Products />;
      case 2:
        return <Categories />;
      case 3:
        return <Config />;
      default:
        return null;
    }
  };
  return (
    <div className="page-container">
      <div className="navContainer">
        <nav>
          <ul>
            <li
              className={`cadastros ${
                activeNavItem === 0 ? "active-item" : ""
              }`}
              onClick={() => handleClickOtherNavbar(0)}
            >
              Usuarios
            </li>
            <li
              className={`cadastros ${
                activeNavItem === 1 ? "active-item" : ""
              }`}
              onClick={() => handleClickOtherNavbar(1)}
            >
              Produtos
            </li>
            <li
              className={`cadastros ${
                activeNavItem === 2 ? "active-item" : ""
              }`}
              onClick={() => handleClickOtherNavbar(2)}
            >
              Categorias
            </li>
            <li
              className={`cadastros ${
                activeNavItem === 3 ? "active-item" : ""
              }`}
              onClick={() => handleClickOtherNavbar(3)}
            >
              Configurações
            </li>
          </ul>

        </nav>
        <div className="content-container">{renderPage()}</div>
        <div className='button' onClick={logout}>
          <LogoutIcon />
          <span>Sair</span>
        </div>
      </div>

    </div>
  );
};

const FinancialPage = () => {
  return (
    <div style={{ marginTop: "5rem" }}>
      <div className="maintenance-container">
        <p className="maintenance-text">Ops. Página em construção!</p>
      </div>
    </div>
  );
};
const StockPage = () => {
  return (
    <div style={{ marginTop: "5rem" }}>
      <div className="maintenance-container">
        <p className="maintenance-text">Ops. Página em construção!</p>
      </div>
    </div>
  );
};

const FiscalPage = () => {
  return (
    <div style={{ marginTop: "5rem" }}>
      <div className="maintenance-container">
        <p className="maintenance-text">Ops. Página em construção!</p>
      </div>
    </div>
  );
};
const ReportsPage = () => {
  return (
    <div style={{ marginTop: "5rem" }}>
      <div className="maintenance-container">
        <p className="maintenance-text">Ops. Página em construção!</p>
      </div>{" "}
    </div>
  );
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

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  return (
    <div>
      <header>
        <div className="navbar">
          <div className="menu-icon" onClick={toggleMenu}>
            {isMenuOpen ? (
              <div>
                <CloseIcon
                  style={{
                    color: "white",
                    marginRight: "auto",
                    fontSize: "2rem",
                  }}
                />
              </div> // Ícone de fechar menu
            ) : (
              <div>
                <MenuIcon style={{ color: "white", fontSize: "2rem" }} />
              </div> // Ícone de três linhas
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
                    closeMenu();
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
                    closeMenu();
                    // Adicione mais lógica, se necessário
                  }}
                  className={activeLink === "register" ? "active" : ""}
                >
                  Cadastros
                </a>
                <a
                  href="#"
                  onClick={() => {
                    changePage("financial");
                    handleLinkClick("financial");
                    closeMenu();
                    // Adicione mais lógica, se necessário
                  }}
                  className={activeLink === "produtos" ? "active" : ""}
                >
                  Financeiro
                </a>
                <a
                  href="#"
                  onClick={() => {
                    changePage("stock");
                    handleLinkClick("stock");
                    // Adicione mais lógica, se necessário
                  }}
                  className={activeLink === "stock" ? "active" : ""}
                >
                  Estoque
                </a>
                <a
                  href="#"
                  onClick={() => {
                    changePage("fiscal");
                    handleLinkClick("fiscal");
                    closeMenu();
                    // Adicione mais lógica, se necessário
                  }}
                  className={activeLink === "fiscal" ? "active" : ""}
                >
                  Fiscal
                </a>
                <a
                  href="#"
                  onClick={() => {
                    changePage("reports");
                    handleLinkClick("reports");
                    closeMenu();
                    // Adicione mais lógica, se necessário
                  }}
                  className={activeLink === "reports" ? "active" : ""}
                >
                  Relatórios
                </a>
              </div>
            </div>
          )}
        </div>
        <h1 href="#" className="logo" onClick={() => changePage("home")}>
          Painel Administrativo
        </h1>
        <nav className="nav">
          {/* Ref para a div do indicador */}
          <div ref={indicatorRef}></div>
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
          <a
            href="#"
            onClick={() => {
              changePage("financial");
              handleLinkClick("financial");
              // Adicione mais lógica, se necessário
            }}
            className={activeLink === "financial" ? "active" : ""}
          >
            Financeiro
          </a>
          <a
            href="#"
            onClick={() => {
              changePage("stock");
              handleLinkClick("stock");
              // Adicione mais lógica, se necessário
            }}
            className={activeLink === "stock" ? "active" : ""}
          >
            Estoque
          </a>
          <a
            href="#"
            onClick={() => {
              changePage("fiscal");
              handleLinkClick("fiscal");
              // Adicione mais lógica, se necessário
            }}
            className={activeLink === "fiscal" ? "active" : ""}
          >
            Fiscal
          </a>
          <a
            href="#"
            onClick={() => {
              changePage("reports");
              handleLinkClick("reports");
              // Adicione mais lógica, se necessário
            }}
            className={activeLink === "reports" ? "active" : ""}
          >
            Relatórios
          </a>
        </nav>
      </header>
      <Content currentPage={currentPage} />
    </div>
  );
};

export default AdminPage;
