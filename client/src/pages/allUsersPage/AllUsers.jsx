import React, { useMemo } from 'react'

import MenuBar from "../../components/menuBar/MenuBar";
import {SideBar} from "../../components/sideBar/SideBar";
import Footer from "../../components/footer/Footer";

import styles from "./AllUsers.module.css";
import UserService from '../../service/UserService';

const AllUsers = () => {
  useMemo(async () => {
      const response = await UserService.getAllUsers();
      console.log(response)    
  })
  const getAllUsers = async() => {
    const response = await UserService.getAllUsers();
    console.log(response) 
  }

  return (
      <div className={styles.wrapper}>
        <MenuBar/>
        <main className={styles.main}>
          <SideBar />
          <div className={styles.users}>
            <button onClick={getAllUsers}>sdfsfd</button>
          </div>
        </main>
        <Footer />
      </div>
  )
}

export default AllUsers