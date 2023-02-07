import React from 'react'
import { useNavigate} from 'react-router-dom'

import ButtonOne from "../UI/buttons/button1/ButtonOne";
import InputTwo from "../UI/inputs/findInput/InputTwo";

import styles from './MenuBar.module.css'

const MenuBar = () => {
    let loc = useNavigate();

    const logoClick=()=> {
        loc('/')
    }
    return (
        <header className={styles.containerHeader}>

            <div className={styles.container}>
                <div className={styles.logo} onClick={logoClick}/>
                <div className={styles.containerInput}>
                    <InputTwo placeholder={"Поиск"}></InputTwo>
                    <div className={styles.lupa}></div>
                </div>
                <ButtonOne width={"125px"}>Вход</ButtonOne>
            </div>


        </header>
    )
}


export default MenuBar