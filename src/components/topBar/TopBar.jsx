import React from 'react'
import styles from "./TopBar.module.css"
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
export default function topbar() {
  return (
    <div className={styles.topBar}>
        <div className={styles.topBarWrapper}>
            <div className={styles.topLeft}><span className={styles.logo}>Painel Administrativo</span></div>
            <div className={styles.topRight}>
              <div className={styles.topbarIconContainer}>
                <NotificationsNoneOutlinedIcon></NotificationsNoneOutlinedIcon>
                <span className={styles.topIconBag}>
                  2
                </span>
              </div>
              <div className={styles.topbarIconContainer}>
                <SettingsIcon></SettingsIcon>
              </div>
              <img src="https://i.ibb.co/dpx8MDY/user.png" alt="" className={styles.topAvatar} />
            </div>
        </div>
    </div>
  )
}
