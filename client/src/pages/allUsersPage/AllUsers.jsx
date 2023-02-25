import React, { useMemo, useState } from 'react'

import MenuBar from "../../components/menuBar/MenuBar";
import SideBar from '../../components/sideBar/SideBar'
import Footer from "../../components/footer/Footer";

import styles from "./AllUsers.module.css";
import UserService from '../../service/UserService';
import SearchInput from '../../components/UI/inputs/searchInput/SearchInput.jsx';
import SelectOne from '../../components/UI/selects/selectOne/SelectOne';
import UsersList from '../../components/usersList/UsersList';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const getAllUsers = async() => {
    const response = await UserService.getAllUsers();
    const users = response.data

    return users
  }

  useMemo(async () => {
      const response = await getAllUsers();
      setUsers(response) 
  }, [])



  return (
      <div className={styles.wrapper}>
        <MenuBar/>
        <main className={styles.main}>
          <SideBar />
          <div className={styles.users}>
            <div className={styles.navigate}>
              <SearchInput placeholder={'Найти пользователя'}/>
              <SelectOne options={['Все', 'Новыe', 'Репутация']} />
            </div>
            <UsersList users={users}/>
          </div>
        </main>
        <Footer />
      </div>
  )
}

export default AllUsers