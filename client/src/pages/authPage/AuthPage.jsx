import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { LOG_ROUTE, REG_ROUTE } from '../../utils/routes'
import ButtonOne from "../../components/UI/buttons/button1/ButtonOne";
import InputOne from "../../components/UI/inputs/loginInput/InputOne";

import styles from './AuthPage.module.css'

const AuthPage = () => {
  const loginPage = useLocation().pathname.split('/').reverse()[0];
  return (
    <div className={styles.con}>
        {
        loginPage !== 'register'
        ?
        <form className={styles.loginCard} >
          <p className={styles.txt}>Электронная почта:</p>
          <InputOne width={"100%"} placeholder={"Введите почту"}/>
          <p className={styles.txt}>Пароль:</p>
          <InputOne width={"100%"} placeholder={"Введите пароль"}/>
          <p className={styles.link}>Нет аккаунта? <Link to={REG_ROUTE}> Зарегистрироваться</Link></p>
          <ButtonOne width={"100%"}>Авторизоваться</ButtonOne>
        </form>
        :
        <form className={styles.loginCard}>
          <p className={styles.txt}>Никнейм:</p>
          <InputOne width={"100%"} placeholder={"Введите никнейм"}/>
          <p className={styles.txt}>Электронная почта:</p>
          <InputOne width={"100%"} placeholder={"Введите почту"}/>
          <p className={styles.txt}>Пароль:</p>
          <InputOne width={"100%"} placeholder={"Введите пароль"}/>
          <p className={styles.link}>Есть аккаунт?<Link to={LOG_ROUTE}> Авторизоваться</Link></p>
          <ButtonOne width={"100%"}>Зарегистрироваться</ButtonOne>
        </form>
        }
    </div>

  )
}

export default AuthPage