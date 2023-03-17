import React, {useState} from 'react'
import { useLocation } from 'react-router-dom'

import MenuBar from '../../components/menuBar/MenuBar'
import SideBar from '../../components/sideBar/SideBar'
import Footer from '../../components/footer/Footer'
import UserService from '../../service/UserService'
import Popup from '../../components/UI/popup/Popup'
import UserInfo from '../../components/userInfo/UserInfo'

import styles from './UserPage.module.css'

const UserPage = () => {
    const userId = useLocation().pathname.split('/').reverse()[0]
    const [ban, setBan] = useState(false)
    const [flag1, setFlag1] = useState(false)
    const [flag2, setFlag2] = useState(false)

    const banUser = () => {
        UserService.banUser(userId)
        setBan(true)
    }
    const unbannUser = () => {
        UserService.unbannUser(userId)
        setBan(false)
    }
    return (
        <div className={styles.wrapper}>
            <Popup active={flag1} setActive={setFlag1} popupText={'Забанить пользователя?'} popupButtonTextConfirm={'Да'} popupButtonTextCancell={'Нет'} func={() => banUser()}/>
            <Popup active={flag2} setActive={setFlag2} popupText={'Разбанить пользователя?'} popupButtonTextConfirm={'Да'} popupButtonTextCancell={'Нет'} func={() => unbannUser()}/>
            <MenuBar/>
            <main className={styles.main}>
            <SideBar/>
                <div className={styles.container}>
                    <UserInfo setFlag1={setFlag1} setFlag2={setFlag2} ban={ban} setBan={setBan} userId={userId} loc={'allUsersPages'}/>
                </div>            
            </main>
            <Footer/>
        </div>

    )
}

export default UserPage