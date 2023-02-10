import React, { useContext, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames';

import { LOG_ROUTE, REG_ROUTE } from '../../utils/routes'
import ButtonOne from "../../components/UI/buttons/button1/ButtonOne";
import InputOne from "../../components/UI/inputs/loginInput/InputOne";
import {observer} from 'mobx-react-lite'
import styles from './AuthPage.module.css'
import { Context } from '../../index';
import EmailNotify from "../../components/UI/notifications/emailNotify/EmailNotify";

const AuthPage = () => {
  const loginPage = useLocation().pathname.split('/').reverse()[0];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  let success = true

  const emailMistake = useRef();
  const passwordMistake = useRef();
  const nicknameMistake = useRef();

  const [flag, setFlag] = useState(false)

  const validateEmail = (email) => {
    let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
  }

  const checkRegister = (email, password, nickname) => {
    if(String(nickname).length < 5 || String(nickname).length > 20) {
      nicknameMistake.current.style.display = 'block';
      success = false;
    }
    else {
      nicknameMistake.current.style.display = 'none';
    }
    if(!validateEmail(email)) {
      emailMistake.current.style.display = 'block';
      success = false;
    }
    else {
      emailMistake.current.style.display = 'none';
    }
    if(String(password).length < 5 || String(password).length > 20) {
      passwordMistake.current.style.display = 'block';               
      success = false;
    }
    else {
      passwordMistake.current.style.display = 'none';
    }
    return success
  }


  const {store} = useContext(Context);

  return (
    <div className={styles.con}>
      <EmailNotify active={flag} setActive={setFlag}/>
        {
        loginPage !== 'register'
        ?
        <form className={styles.loginCard} onSubmit={(e) => {e.preventDefault()}} >
          <p className={styles.txt}>Электронная почта:</p>
          <InputOne 
            width={"100%"} 
            placeholder={"Введите почту"} 
            value={email} 
            onChange={(e) => {setEmail(e.target.value)}}
            type={'text'}/>
          <p className={styles.txt}>Пароль:</p>
          <InputOne 
            width={"100%"} 
            placeholder={"Введите пароль"} 
            value={password} 
            onChange={(e) => {setPassword(e.target.value)}} 
            type={'password'}/>
          <p className={styles.link}>Нет аккаунта? <Link to={REG_ROUTE}> Зарегистрироваться</Link></p>
          <ButtonOne width={"100%"} onClick={() => store.login(email, password)}>Авторизоваться</ButtonOne>
        </form>
        :
        <form className={styles.loginCard} onSubmit={(e) => {e.preventDefault()}}>
          <p className={styles.txt}>Никнейм:</p>
          <p className={styles.mistake} ref={nicknameMistake}>Никнейм должен содержать от 3 до 20 символов.</p>
          <InputOne 
            width={"100%"} 
            placeholder={"Введите никнейм"} 
            value={nickname} 
            onChange={(e) => {setNickname(e.target.value)}}
            type={'text'}/>
          <p className={styles.txt}>Электронная почта:</p>
          <p className={styles.mistake} ref={emailMistake}>Указанный адрес электронной почты не валиден.</p>
          <InputOne 
            width={"100%"}
            placeholder={"Введите почту"}
            value={email}
            onChange={(e) => {setEmail(e.target.value)}}
            type={'text'}/>
          <p className={styles.txt}>Пароль:</p>
          <p className={styles.mistake} ref={passwordMistake}>Пароль должен содержать от 3 до 20 символов.</p>
          <InputOne 
            width={"100%"} 
            placeholder={"Введите пароль"} 
            value={password} 
            onChange={(e) => {setPassword(e.target.value)}}
            type={'password'}/>
          <p className={styles.link}>Есть аккаунт?<Link to={LOG_ROUTE}> Авторизоваться</Link></p>
          <ButtonOne 
            width={"100%"}
            onClick={() => {
              const response = checkRegister(email, password, nickname)
              if(response) {
                store.register(email, password, nickname);
              }
              setFlag(true);
            }}>
              Зарегистрироваться
          </ButtonOne>
        </form>
        }
    </div>

  )
}

export default observer(AuthPage)