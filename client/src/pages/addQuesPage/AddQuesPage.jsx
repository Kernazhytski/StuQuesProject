import React from 'react'
import styles from "./AddQues.module.css";
import MenuBar from "../../components/menuBar/MenuBar";
import {SideBar} from "../../components/sideBar/SideBar";
import Footer from "../../components/footer/Footer";

export const AddQuesPage = () => {
  return (
      <div className={styles.wrapper}>
        <MenuBar/>
        <main className={styles.main}>
          <SideBar />
          <div className={styles.addPanel}>

          </div>
        </main>
        <Footer />
      </div>
  )
}
