import React, { useRef, useEffect } from 'react';
import './AdminPage.css';
import { useAuth } from './context/AuthContext';

const AdminPage = () => {
  const { logout } = useAuth();
  const indicatorRef = useRef(null);

  useEffect(() => {
    const items = document.querySelectorAll('nav a');

    const marker = (e) => {
      indicatorRef.current.style.left = e.offsetLeft + 'px';
      indicatorRef.current.style.width = e.offsetWidth + 'px';
    };

    items.forEach((link) => {
      link.addEventListener('click', (e) => {
        marker(e.target);
      });
    });

    return () => {
      // Remove event listeners when the component unmounts
      items.forEach((link) => {
        link.removeEventListener('click', marker);
      });
    };
  }, []); // Empty dependency array ensures this effect runs once after initial render

  return (
    <div>
      <header>
        <a href="#" className="logo">
          Logo
        </a>
        <nav>
          <div ref={indicatorRef} id="indicator"></div>
          <a href="#">Home</a>
          <a href="#">Cadastros</a>
          <a href="#">Financeiro</a>
          <a href="#">Estoque</a>
          <a href="#">Fiscal</a>
          <a href="#">Relatórios</a>
        </nav>
      </header>
    </div>
  );
};

export default AdminPage;
