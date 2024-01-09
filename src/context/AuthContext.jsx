// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAtom } from 'jotai';
import { isAdminAtom, loggedInAtom } from '../store/store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AuthContext = createContext();




export const AuthProvider = ({ children }) => {
  const storedToken = Cookies.get('token');
  const storedRole = Cookies.get('role');
  
  const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);
  const [isAdmin, setIsAdmin] = useAtom(isAdminAtom);
  const [isManager, setIsManager] = useState(storedRole === 'Gerente');



  useEffect(() => {
    setLoggedIn(Boolean(storedToken));
    setIsAdmin(storedRole === 'administrador');
  }, [storedToken, storedRole]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email: email,
        password: password
      });
     
  
      if (response.data.user.role === 'administrador') {
        setLoggedIn(true);
        setIsAdmin(true);
        setIsManager(false); // Certifique-se de definir isManager como false para administradores
      } else if (response.data.user.role === 'funcionario') {
        setLoggedIn(true);
        setIsAdmin(false);
        setIsManager(false); // Certifique-se de definir isManager como false para funcionários
      } else if (response.data.user.role === 'Gerente') {
        setLoggedIn(true);
        setIsAdmin(false);
        setIsManager(true);
      } else {
        alert('Credenciais inválidas');
      }
  
      Cookies.set('token', response.data.user.token);
      Cookies.set('role', response.data.user.role);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Erro, email ou senha invalidas!', { position: toast.POSITION.TOP_CENTER });
      } else {
        console.error('Erro na solicitação de login', error);
      }
    
      
    }
  };
  
  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('role');
    setLoggedIn(false);
    setIsAdmin(false);
  };

  const values = {
    loggedIn,
    isAdmin,
    isManager,
    login,
    logout
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
