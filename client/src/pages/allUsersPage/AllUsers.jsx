import React, { useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import MenuBar from "../../components/menuBar/MenuBar";
import {SideBar} from "../../components/sideBar/SideBar";
import Footer from "../../components/footer/Footer";

import styles from "./AllUsers.module.css";
import UserService from '../../service/UserService';
import SearchInput from '../../components/UI/inputs/searchInput/SearchInput.jsx';
import SelectOne from '../../components/UI/selects/selectOne/SelectOne';
import { useNavigate } from 'react-router-dom';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const loc = useNavigate();
  const getAllUsers = async() => {
    const response = await UserService.getAllUsers();
    const users = response.data


    users.push(users[0])
    users.push(users[0])
    users.push(users[0])
    users.push(users[0])
    users.push(users[0])
    users.push(users[0])
    users.push(users[0])
    users.push(users[0])
    users.push(users[0])
    users.push(users[0])
    users.push(users[0])
    users.push(users[0])
    users.push(users[0])
    users.push(users[0])
    users.push(users[0])
    users.push(users[0])
    users.push(users[0])
    users.push(users[0])
    users.push(users[0])


    return users
  }
  const userProfile = (userId) => {
    loc(`${userId}`)
  }
  useMemo(async () => {
      const response = await getAllUsers();
      setUsers(response)
      console.log(response)    
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
            <div className={styles.allUsers}>
            {
              users.map(user => <div className={styles.user} key={uuidv4()} onClick={() => userProfile(user.id)}>
                <img className={styles.userImg} src={process.env.REACT_APP_SERVER_URL + '/' + user.avatarImg}/>
                <div>
                  <p className={styles.userNickname}>{user.nickname}</p>
                  <p className={styles.score}>Очки: {user.score}</p>                  
                </div>


              </div>)
            }
            </div>
          </div>
        </main>
        <Footer />
      </div>
  )
}

export default AllUsers