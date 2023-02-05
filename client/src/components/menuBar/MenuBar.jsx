import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LOG_ROUTE, REG_ROUTE } from '../../utils/routes'
import ButtonOne from "../UI/buttons/button1/ButtonOne";



import styles from './MenuBar.module.css'

const MenuBar = () => {
  return(
      <div className={styles.containerHeader}>
          <ButtonOne width={"30%"}>KEKEKE</ButtonOne>
      </div>
  )
}

export default MenuBar