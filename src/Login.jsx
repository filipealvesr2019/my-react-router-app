import React, { useState } from 'react';
import axios from 'axios';
import AdminPage from './AdminPage';
import FuncionarioPage from './FuncionarioPage';
import  './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email: email,
        password: password
      });

      // Verifique a resposta do backend e defina o estado apropriado com base nela
      if (response.data.role === 'admin') {
        setLoggedIn(true);
        setIsAdmin(true);
      } else if (response.data.role === 'funcionario') {
        setLoggedIn(true);
        setIsAdmin(false);
      } else {
        alert('Credenciais inválidas');
      }
    } catch (error) {
      console.error('Erro na solicitação de login', error);
    }
  };

  // Renderização condicional com base no estado de loggedIn e isAdmin
  if (loggedIn) {
    if (isAdmin) {
      return <AdminPage />;
    } else {
      return <FuncionarioPage />;
    }
  }

  return (
    <div className="container">
    <div className='loginStyle'>
      <h1>Login</h1>
      <label for="email">Email</label>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <label for="password">Password</label>

      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button className="loginButton"  onClick={handleLogin}>Login</button>
    </div>
    </div>
  );
};

// Componentes AdminPage e FuncionarioPage devem ser importados aqui

export default Login;
