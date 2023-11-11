import React from 'react'
import "./ButtonClose.css"
import LogoutIcon from '@mui/icons-material/Logout';
const ButtonClose = () => {
  return (
    <div className='button' > <LogoutIcon ></LogoutIcon>  <span>Sair</span></div>
  )
}

export default ButtonClose