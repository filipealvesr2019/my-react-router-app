import AdminMenu from "./components/AdminMenu";
import UserList from './components/UserList';
import styles from "./AdminPage.module.css"
import Topbar from "./components/topBar/Topbar"
import { Sidebar } from "./components/sidebar/Sidebar";
import { useAuth } from './context/AuthContext';


import './App.css';
const AdminPage = () => {
  const { logout } = useAuth();
    // Sua lógica para a página do administrador aqui
    return (
      <div>
           <button onClick={logout}>Logout</button>
      <Topbar></Topbar>
      <div className={styles.container}>
        <Sidebar></Sidebar>
      </div>
    </div>
    )
  };
  
  export default AdminPage;