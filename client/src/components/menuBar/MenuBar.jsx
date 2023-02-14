import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import ButtonOne from "../UI/buttons/button1/ButtonOne";
import InputTwo from "../UI/inputs/findInput/InputTwo";

import styles from './MenuBar.module.css'


const MenuBar = (props) => {
    let loc = useNavigate();

    const [state, setState] = useState("")

    const logoClick = () => {
        loc('/')
    }

    const keyPress = (e) => {
        if (e.keyCode == 13) {
            setState(e.target.value)
            console.log(e.target.value)
            props.changeS(e.target.value)
        }
    }

    const change = (e) => {
        setState(e.target.value)
    }

    return (
        <header className={styles.containerHeader}>

            <div className={styles.container}>
                <div className={styles.logo} onClick={logoClick}/>
                <div className={styles.containerInput}>
                    <InputTwo value={state} placeholder={"Поиск"} onKeyDown={e => keyPress(e)}
                              onChange={e => change(e)} value={state}></InputTwo>
                    <div className={styles.lupa}></div>
                </div>
                <ButtonOne width={"125px"}>Вход</ButtonOne>
            </div>


        </header>
    )
}


export default MenuBar