import React, { useContext } from 'react'
import { useNavigate} from 'react-router-dom'
import {observer} from 'mobx-react-lite'

import { Context } from '../../index';
import ButtonOne from "../UI/buttons/button1/ButtonOne";
import InputTwo from "../UI/inputs/findInput/InputTwo";

import styles from './MenuBar.module.css'



const MenuBar = () => {
    const loc = useNavigate();

    const logoClick=()=> {
        loc('/')
    }

    const {store} = useContext(Context);
    //console.log(store.user)
    return (
        <header className={styles.containerHeader}>

            <div className={styles.container}>
                <div className={styles.logo} onClick={logoClick}/>
                <div className={styles.containerInput}>
                    <InputTwo placeholder={"Поиск"}></InputTwo>
                    <div className={styles.lupa}></div>
                </div>

                {
                    store.isAuth
                    ?
                    <p style={{color: 'white', width: '125px', height: '40px'}}>{1/*store.user.nickname*/}</p>
                    :
                    <ButtonOne width={"125px"}>Вход</ButtonOne>
                }
            </div>


        </header>
    )
}


export default observer(MenuBar)