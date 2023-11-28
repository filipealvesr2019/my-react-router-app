import AdminMenu from "./components/AdminMenu";
import UserList from './components/UserList';
import styles from "./AdminPage.module.css"
import Topbar from "./components/Topbar/Topbar"
import { Sidebar } from "./components/sidebar/Sidebar";

import './App.css';
const AdminPage = () => {
    // Sua lógica para a página do administrador aqui
    return (
      <div>
      <Topbar></Topbar>
      <div className={styles.container}>
        <Sidebar></Sidebar>
      </div>

    
    </div>
    )
  };
  
  export default AdminPage;