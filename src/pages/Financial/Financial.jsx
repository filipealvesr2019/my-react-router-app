import React, { useState } from 'react';
import Revenues from './FinancialNavItems/Revenues.JSX';
import Transations from './transations/Transations';
import Expenses from './expenses/expenses';


const Financial = () => {
  const [activeNavItem, setActiveNavItem] = useState(0); // Initialize activeNavItem state

  const handleClickOtherNavbar = (index) => {
    setActiveNavItem(index);
  };

  const renderPage = () => {
    switch (activeNavItem) {
      case 0:
        return <Transations />;
      case 1:
        return <Revenues />;
      case 2:
        return <Expenses />;
      case 3:
        return <Clients />;
      case 4:
        return <Revenues />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="page-container">
        <div className="navContainer">
          <nav className="nav">
            <ul className="ul">
              <li
                className={`cadastros ${
                  activeNavItem === 0 ? 'active-item' : ''
                }`}
                onClick={() => handleClickOtherNavbar(0)}
              >
                Movimentações
              </li>
              <li
                className={`cadastros ${
                  activeNavItem === 1 ? 'active-item' : ''
                }`}
                onClick={() => handleClickOtherNavbar(1)}
              >
                Receitas
              </li>
              <li
                className={`cadastros ${
                  activeNavItem === 2 ? 'active-item' : ''
                }`}
                onClick={() => handleClickOtherNavbar(2)}
              >
                Despesas
              </li>
              <li
                className={`cadastros ${
                  activeNavItem === 3 ? 'active-item' : ''
                }`}
                onClick={() => handleClickOtherNavbar(3)}
    
              >
                Clientes
              </li>
              <li
                className={`cadastros ${
                  activeNavItem === 4 ? 'active-item' : ''
                }`}
                onClick={() => handleClickOtherNavbar(4)}

              >
                Fornecedores
              </li>
            </ul>
          </nav>
          <div className="content-container">{renderPage()}</div>
        </div>
      </div>
    </div>
  );
};

export default Financial;
