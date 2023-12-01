// src/EmployeePage.js
import React from 'react';
import { useAuth } from './context/AuthContext';

const EmployeePage = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Welcome to Employee Page</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default EmployeePage;
