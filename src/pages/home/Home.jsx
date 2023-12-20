import About from "../../components/About/About"
import './Home.css'
import Topbar from "../../components/topBar/Topbar"
import LogoutIcon from '@mui/icons-material/Logout';

export const Home = () => {
  return (
    <>
    <Topbar></Topbar>
    <div className="containerHome">
    
    <div>

    </div>

    <About></About>
    <LogoutIcon></LogoutIcon>
  </div>
  </>
  )
}
