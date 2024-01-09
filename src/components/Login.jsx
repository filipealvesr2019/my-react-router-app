import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminPage from '../AdminPage';
import EmployeePage from '../EmployeePage';
import LogoutIcon from '@mui/icons-material/Logout';
import './Login.css';
import ManagerPage from '../ManagerPage';

const Login = () => {
  const { loggedIn, isAdmin, isManager, login, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleLogin = () => {
    if (validateForm()) {
      login(email, password);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!email.trim()) {
      errors.email = 'Campo obrigatório';
    }

    if (!password.trim()) {
      errors.password = 'Campo obrigatório';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  if (loggedIn) {
    return (
      <div className='logout-container'>
        {isAdmin ? <AdminPage /> : (isManager ? <ManagerPage /> : <EmployeePage />)}
        <div className='button' onClick={logout}>
          <LogoutIcon />
          <span>Sair</span>
        </div>
      </div>
    );
  }

  return (
    <div className="body">
      <div className="container">
        <div className='loginStyle'>
          <h1>Login</h1>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Digite o email..."
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFormErrors((prevErrors) => ({ ...prevErrors, email: '' }));
            }}
            className={formErrors.email ? 'error' : ''}
          />
          {formErrors.email && <span className='error-message'>{formErrors.email}</span>}
          <br />
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            placeholder="Digite a senha..."
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setFormErrors((prevErrors) => ({ ...prevErrors, password: '' }));
            }}
            className={formErrors.password ? 'error' : ''}
          />
          {formErrors.password && <span className='error-message'>{formErrors.password}</span>}
          <br />
          <button className="loginButton" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
