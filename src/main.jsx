
import App from "./App.jsx";
import "./index.css";

// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthContext.jsx';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <React.StrictMode>
  <AuthProvider>

       <App />
       </AuthProvider>,

 </React.StrictMode>
);