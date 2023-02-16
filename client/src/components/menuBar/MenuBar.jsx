import React, {useContext, useMemo, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {observer} from 'mobx-react-lite'


import {Context} from '../../index';
import ButtonOne from "../UI/buttons/button1/ButtonOne";
import InputTwo from "../UI/inputs/findInput/InputTwo";
import DropDown from '../dropDown/DropDown';

import styles from './MenuBar.module.css'

const MenuBar = (props) => {
    const [state, setState] = useState("")

    const keyPress = (e) => {
        if (e.keyCode == 13) {
            setState(e.target.value)
            props.changeS(e.target.value)
        }
    }

    const change = (e) => {
        setState(e.target.value)
    }
    const [showDropDown, setShowDropdow] = useState(false);
    const triangle = useRef()
    const loc = useNavigate();
    const {store} = useContext(Context);
    const body = document.querySelector('body');
    if (triangle.current != undefined) {
        body.addEventListener('click', () => {
            if (triangle.current != null) {
                triangle.current.className = styles.trianglePassive
                setShowDropdow(false)
            }
        })
    }
    useMemo(async () => {
        store.checkAuth2()
        //console.log(store.user)
        //console.log(store.isAuth)
        /*.log(Boolean(localStorage.getItem('token')))
        if(localStorage.getItem('token') !== 'undefined') {
            setUserData(JSON.parse(localStorage.getItem('userData')).userData);
            console.log(store.isAuth)
            //await store.checkAuth()
        }*/

    }, [])
    const dropDownChange = (e) => {
        e.stopPropagation()
        if (!showDropDown) {
            triangle.current.className = styles.triangleActive
        } else {
            triangle.current.className = styles.trianglePassive
        }
        setShowDropdow(!showDropDown)
    }
    const logoClick = () => {
        loc('/')
    }
    const loginClick = () => {
        loc('/login')
    }
    const leaveAccount = async () => {
        await store.logout()
        //loc('/login')
    }


    return (
        <header className={styles.containerHeader}>

            <div className={styles.container}>
                <div className={styles.logo} onClick={logoClick}/>
                <div className={styles.containerInput}>
                    <InputTwo value={state} placeholder={"Поиск"} onKeyDown={e => keyPress(e)}
                              onChange={e => change(e)}></InputTwo>
                    <div className={styles.lupa}></div>
                </div>

                {
                    store.isAuth
                        ?
                        <div className={styles.userInfo}>
                            <img className={styles.userAvatar}
                                 src={`${process.env.REACT_APP_SERVER_URL}/${store.user.avatarImg}`}/>
                            <p className={styles.userNickname}>{store.user.nickname}</p>
                            <div className={styles.trianglePassive} onClick={e => dropDownChange(e)}
                                 ref={triangle}></div>
                            {
                                showDropDown
                                    ?
                                    <DropDown leaveAccount={leaveAccount}/>
                                    :
                                    null
                            }
                        </div>

                        :
                        <ButtonOne width={"125px"} onClick={loginClick}>Вход</ButtonOne>
                }
            </div>


        </header>
    )
}


export default observer(MenuBar)