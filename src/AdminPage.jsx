import"./AdminPage.css";
import { useAuth } from "./context/AuthContext";

const AdminPage = () => {
  const { logout } = useAuth();
  // Sua lógica para a página do administrador aqui
  return (
    <div>
      <header className="headerMenu">
        <a href="#" className="logo">Logo</a>
        <nav>
          <div id="indicator"></div>
        <a href="#" >Home</a>
        <a href="#">Cadastros</a>
        <a href="#">Financeiro</a>
        <a href="#">Estoque</a>
        <a href="#">Fiscal</a>
        <a href="#">Relatórios</a>

        </nav>
      </header>
   

      <button className="button" onClick={logout}>Logout2</button>
    </div>
  );
};

export default AdminPage;
