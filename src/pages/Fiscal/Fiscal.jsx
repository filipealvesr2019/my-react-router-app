import React, { useState } from 'react'

import Box from '@mui/material/Box';



import Menu from '@mui/material/Menu';
import { MenuItem } from '@mui/material';



const Fiscal = () => {
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
        return <></>;
      case 1:
          return <></>;
      case 2:
          return <></>;

      case 3:
          return <></>;

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
              Clientes
            </li>
            {/* ... (restante do código) ... */}
            <li
              className={`cadastros ${
                activeNavItem === 1 ? 'active-item' : ''
              }`}
              onClick={() => handleClickOtherNavbar(1)}
            >
              Fornecedores
            </li>
            <li
              className={`cadastros ${
                activeNavItem === 2 ? 'active-item' : ''
              }`}
              onClick={() => handleClickOtherNavbar(2)}
            >
              Produtos
            </li>
            <li
              className={`cadastros ${
                activeNavItem === 3 ? 'active-item' : ''
              }`}
              onClick={() => handleClickOtherNavbar(3)}
            >
              Categorias
            </li>
            <li
           
            >
      
              {/* Componente de Dropdown */}
              <Box>
                <div onClick={(event) => handleClickOtherNavbar(4, event)}>
                  outros
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
export default Fiscal