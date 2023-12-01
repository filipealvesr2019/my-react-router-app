// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext();

// AuthContext.js
import { atom } from 'jotai';

export const loggedInAtom = atom(false);
export const isAdminAtom = atom(false);



export const AuthProvider = ({ children }) => {
  const storedToken = Cookies.get('token');
  const storedRole = Cookies.get('role');

  const [loggedIn, setLoggedIn] = useState(Boolean(storedToken));
  const [isAdmin, setIsAdmin] = useState(storedRole === 'administrador');

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
      } else if (response.data.user.role === 'funcionario') {
        setLoggedIn(true);
        setIsAdmin(false);
      } else {
        alert('Credenciais inválidas');
      }

      Cookies.set('token', response.data.user.token);
      Cookies.set('role', response.data.user.role);
    } catch (error) {
      console.error('Erro na solicitação de login', error);
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
    login,
    logout
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
