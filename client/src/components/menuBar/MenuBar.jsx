import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LOG_ROUTE, REG_ROUTE } from '../../utils/routes'
import ButtonOne from "../UI/buttons/button1/ButtonOne";
import InputTwo from "../UI/inputs/input2/InputTwo";

import styles from './MenuBar.module.css'

const MenuBar = () => {
  return(
      <header className={styles.containerHeader}>
          <div className={styles.container}>
              <div className={styles.logo}/>
              <div className={styles.containerInput}>
                  <InputTwo placeholder={"Поиск"}></InputTwo>
                  <div className={styles.lupa}></div>
              </div>
              <ButtonOne width={"125px"} >Вход</ButtonOne>
          </div>
      </header>
  )
}

export default MenuBar