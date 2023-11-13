import React from 'react'
import styles from "./TopBar.module.css"
export default function topbar() {
  return (
    <div className={styles.topBar}>
        <div className={styles.topBarWrapper}>
            <div className={styles.topLeft}>left</div>
            <div className={styles.topRight}>right</div>
        </div>
    </div>
  )
}
