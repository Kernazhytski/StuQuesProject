import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LOG_ROUTE, REG_ROUTE } from '../../utils/routes'
import ButtonOne from "../UI/buttons/button1/ButtonOne";


import logoL from '../../assets/pictures/logos/logo-light.png'
import styles from './MenuBar.module.css'

const MenuBar = () => {
  return(
      <div className={styles.containerHeader}>
          <div className={styles.logo}/>
          <ButtonOne width={"125px"} >О продукте</ButtonOne>
      </div>
  )
}

export default MenuBar