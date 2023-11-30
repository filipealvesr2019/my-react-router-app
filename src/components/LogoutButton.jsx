import React from 'react';
import axios from 'axios';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      // Chama a API para realizar o logout
      await axios.post('/logout');

      // Remove o cookie que armazena o token JWT
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      // Exibe uma mensagem de sucesso (opcional)
      alert('Deslogado com sucesso!');
    } catch (error) {
      // Trate o erro conforme necessário
      console.error('Erro ao fazer logout:', error);
      alert('Erro ao fazer logout. Por favor, tente novamente.');
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
