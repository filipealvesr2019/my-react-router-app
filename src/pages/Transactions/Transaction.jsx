import React from 'react'
import { Sidebar } from '../../components/sidebar/Sidebar'
import LogoutIcon from '@mui/icons-material/Logout';

export default function Transaction() {
  return (
    <div className="sidebar">  
    <Sidebar/>
    <LogoutIcon></LogoutIcon>

    </div>
  )
}
