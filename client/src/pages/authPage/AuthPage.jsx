import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LOG_ROUTE, REG_ROUTE } from '../../utils/routes'

import classes from './AuthPage.module.css'
import ButtonOne from "../../components/UI/buttons/button1/ButtonOne";
import InputOne from "../../components/UI/inputs/input1/InputOne";

const AuthPage = () => {
  const loginPage = useLocation().pathname.split('/').reverse()[0];
  return (
    <div className={classes.con}>
        {
        loginPage !== 'register'
        ?
        <form className={classes.loginCard} >
          <p className={classes.txt}>Электронная почта:</p>
          <InputOne width={"100%"} placeholder={"Введите логин"}/>
          <p className={classes.txt}>Пароль:</p>
          <InputOne width={"100%"} placeholder={"Введите пароль"}/>
          <p className={classes.link}>Нет аккаунта? <Link to={REG_ROUTE}> Зарегистрироваться</Link></p>
          <ButtonOne width={"100%"}>Авторизоваться</ButtonOne>
        </form>
        :
        <form className={classes.loginCard}>
          <p className={classes.txt}>Никнейм:</p>
          <InputOne width={"100%"} placeholder={"Введите никнейм"}/>
          <p className={classes.txt}>Электронная почта:</p>
          <InputOne width={"100%"} placeholder={"Введите логин"}/>
          <p className={classes.txt}>Пароль:</p>
          <InputOne width={"100%"} placeholder={"Введите пароль"}/>
          <p className={classes.link}>Есть аккаунт?<Link to={LOG_ROUTE}> Авторизоваться</Link></p>
          <ButtonOne width={"100%"}>Зарегистрироваться</ButtonOne>
        </form>
        }
    </div>

  )
}

export default AuthPage