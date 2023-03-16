import React, {useContext, useMemo, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {observer} from 'mobx-react-lite'


import {Context} from '../../index';
import ButtonOne from "../UI/buttons/button1/ButtonOne";
import InputTwo from "../UI/inputs/findInput/InputTwo";
import DropDown from '../dropDown/DropDown';

import styles from './MenuBar.module.css'
import Burger from '../UI/burger/Burger';

const MenuBar = (props) => {
    const [state, setState] = useState("")

    const search = (e) => {
        e.preventDefault();
        if (props.changeS) {
            props.changeS(state)
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
        store.checkAuth3()
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
        loc('/login')
    }


    return (
        <header className={styles.containerHeader}>

            <div className={styles.container}>
                <div className={styles.burgerContainer}>
                    <Burger isAuth={store.isAuth} userId={store.user.id}  leaveAccount={leaveAccount}/>
                </div>
                
                <div className={styles.logo} onClick={logoClick}/>
                <div className={styles.containerInput}>
                    <form onSubmit={e => search(e)}>
                        <InputTwo value={state} placeholder={"Поиск"}
                                onChange={e => change(e)}></InputTwo>
                        <div className={styles.lupa}></div>                        
                    </form>

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
                        <div className={styles.btnCont}>
                           <ButtonOne width={"125px"} onClick={loginClick}>Вход</ButtonOne> 
                        </div>
                        
                }
            </div>


        </header>
    )
}


export default observer(MenuBar)