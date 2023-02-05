import React, { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ADD_QUES, ALL_USERS, MAIN_ROUTE, MY_ANSW, MY_QUES } from '../../utils/routes'

import styles from './SideBar.module.css'

export const SideBar = () => {
  const location = useLocation().pathname.split('/').reverse()[0];
  useMemo(() => {
    console.log(location)
  }, [])
  return (
    <aside className={styles.container}>
        <ul className={styles.list}>
          {
            location === '' 
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
            location === MY_QUES 
            ?            
            <li className={styles.listItemActive}>
              <Link to={MY_QUES} >Мои вопросы</Link> 
            </li>
            :
            <li className={styles.listItemPassive}>
              <Link to={MY_QUES} >Мои вопросы</Link> 
            </li>
          }
          {
            location === MY_ANSW 
            ?            
            <li className={styles.listItemActive}>
              <Link to={MY_ANSW} >Мои ответы</Link> 
            </li>
            :
            <li className={styles.listItemPassive}>
              <Link to={MY_ANSW} >Мои ответы</Link> 
            </li>
          }
          {
            location === ALL_USERS 
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
