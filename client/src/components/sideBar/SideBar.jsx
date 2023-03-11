import React, {useContext, useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ADD_QUES, ALL_USERS, MAIN_ROUTE, MY_ANSW, MY_QUES, USER_PAGE } from '../../utils/routes'
import SelectAddQuestion from "../UI/selects/selectAddQuestion/selectAddQuestion";
import styles from './SideBar.module.css'
import {Context} from "../../index";

const SideBar = (props) => {

    const location = "/"+useLocation().pathname.split('/').reverse()[0];
    const preLocation = "/"+useLocation().pathname.split('/').reverse()[1]
    const {store} = useContext(Context);

    return (
        <aside className={styles.container}>
            <ul className={styles.list}>
                {
                    location === '/'
                        ?
                        <li className={styles.listItemActive}>
                            <Link to={MAIN_ROUTE} >Вопросы</Link>
                        </li>
                        :
                        <li className={styles.listItemPassive}>
                            <Link to={MAIN_ROUTE} >Вопросы</Link>
                        </li>
                }
                {

                    location === ADD_QUES
                        ?
                        <li className={styles.listItemActive}>
                            <Link to={ADD_QUES} >Задать вопрос</Link>
                        </li>
                        :
                        <li className={styles.listItemPassive}>
                            <Link to={ADD_QUES} >Задать вопрос</Link>
                        </li>
                }
                {
                    preLocation === '/myQuestions'
                        ?
                        <li className={styles.listItemActive}>
                            <Link to={'/myQuestions/'+store.user.id} >Мои вопросы</Link>
                        </li>
                        :
                        <li className={styles.listItemPassive}>
                            <Link to={'/myQuestions/'+store.user.id} >Мои вопросы</Link>
                        </li>
                }
                {
                    preLocation === '/myAnswers'
                        ?
                        <li className={styles.listItemActive}>
                            <Link to={'/myAnswers/'+store.user.id} >Мои ответы</Link>
                        </li>
                        :
                        <li className={styles.listItemPassive}>
                            <Link to={'/myAnswers/'+store.user.id} >Мои ответы</Link>
                        </li>
                }
                {
                    location === ALL_USERS || preLocation === ALL_USERS
                        ?
                        <li className={styles.listItemActive}>
                            <Link to={ALL_USERS} >Пользователи</Link>
                        </li>
                        :
                        <li className={styles.listItemPassive}>
                            <Link to={ALL_USERS} >Пользователи</Link>
                        </li>
                }
            </ul>
        </aside>
    )
}

export default SideBar