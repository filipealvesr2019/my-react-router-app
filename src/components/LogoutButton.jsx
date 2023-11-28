// LogoutButton.jsx
import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from 'js-cookie';

const LogoutButton = ({ onLogout }) => {
  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('role');
    onLogout(); // Chama a função de logout fornecida pelo componente pai
  };

  return (
    <div className="button" onClick={handleLogout}>
      <LogoutIcon />
      <span>Sair</span>
    </div>
  );
};

export default LogoutButton;
