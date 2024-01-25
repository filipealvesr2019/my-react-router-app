import React, { useState } from 'react'
import Transations from '../Financial/transations/Transations';
import Revenues from '../Financial/FinancialNavItems/Revenues.JSX';
import Expenses from '../Financial/expenses/expenses';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Menu from '@mui/material/Menu';
import Clients from '../Financial/Clients/Clients';
const Reports = () => {
  const [age, setAge] = useState('');  // Declare o estado age
  // Declare a função handleChange
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [activeNavItem, setActiveNavItem] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null); // Estado para controlar a posição do menu

  const handleClickOtherNavbar = (index, event) => {
    setActiveNavItem(index);
    setAnchorEl(event.currentTarget); // Defina a posição do menu no clique
  };

  const handleClose = () => {
    setAnchorEl(null); // Feche o menu
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
              {/* ... (restante do código) ... */}
              <li
                className={`cadastros ${
                  activeNavItem === 4 ? 'active-item' : ''
                }`}
                onClick={() => handleClickOtherNavbar(4)}
              >
                Fornecedores
              </li>
              <li
                className={`cadastros ${
                  activeNavItem === 4 ? 'active-item' : ''
                }`}
                onClick={() => handleClickOtherNavbar(4)}
              >
        
                {/* Componente de Dropdown */}
                <Box>
                  <div onClick={(event) => handleClickOtherNavbar(4, event)}>
                    Nome do Dropdown
                  </div>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Item 1</MenuItem>
                    <MenuItem onClick={handleClose}>Item 2</MenuItem>
                    <MenuItem onClick={handleClose}>Item 3</MenuItem>
                  </Menu>
                </Box>

              </li>
            </ul>
          </nav>
          <div className="content-container">{renderPage()}</div>
        </div>
      </div>
    </div>
  )
}

export default Reports