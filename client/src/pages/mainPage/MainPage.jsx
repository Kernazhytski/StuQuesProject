import React from 'react'
import Footer from '../../components/footer/Footer';
import MenuBar from "../../components/menuBar/MenuBar";

import styles from './MainPage.module.css';

const MainPage = () => {
  return(
      <div className={styles.wrapper}>
        <MenuBar/>
        <main className={styles.main}>
          Контент
        </main>
        <Footer />
      </div>
  )
}
export default MainPage