import React, { useContext, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import classNames from 'classnames';

import { LOG_ROUTE, REG_ROUTE } from '../../utils/routes'
import ButtonOne from "../../components/UI/buttons/button1/ButtonOne";
import InputOne from "../../components/UI/inputs/loginInput/InputOne";
import {observer} from 'mobx-react-lite'
import styles from './AuthPage.module.css'
import { Context } from '../../index';
import PopupEmail from "../../components/UI/notifications/emailNotify/PopupEmail";

const AuthPage = () => {
  const loc = useNavigate();

  const loginClick=()=> {
      loc('/')
  }
  const loginPage = useLocation().pathname.split('/').reverse()[0];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [popupText, setPopupText] = useState('');

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
    if(String(nickname).length < 3 || String(nickname).length > 20) {
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

  const checkLogin = (email, password) => {
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
      <PopupEmail active={flag} setActive={setFlag} popupText={popupText}/>
        {
        loginPage !== 'register'
        ?
        <form className={styles.loginCard} onSubmit={(e) => {e.preventDefault()}} >
          <p className={styles.txt}>Электронная почта:</p>
          <p className={styles.mistake} ref={emailMistake}>Указанный адрес электронной почты не валиден.</p>
          <InputOne 
            width={"100%"} 
            placeholder={"Введите почту"} 
            value={email} 
            onChange={(e) => {setEmail(e.target.value)}}
            type={'text'}/>
          <p className={styles.txt}>Пароль:</p>
          <p className={styles.mistake} ref={passwordMistake}>Пароль должен содержать от 5 до 20 символов.</p>
          <InputOne 
            width={"100%"} 
            placeholder={"Введите пароль"} 
            value={password} 
            onChange={(e) => {setPassword(e.target.value)}} 
            type={'password'}/>
                    <p className={styles.link}>
            Нет аккаунта?
            <Link 
              to={REG_ROUTE}
              onClick={() => {
                setNickname('');
                setEmail('');
                setPassword('');
                passwordMistake.current.style.display = 'none';
                emailMistake.current.style.display = 'none';
              }}> 
              Зарегистрироваться
            </Link>
          </p>
          <ButtonOne width={"100%"} onClick={async () => {
            const response = checkLogin(email, password);
            if(response) {
              const response = await store.login(email, password);
              if(response.success) {
                setEmail('');
                setPassword('');
                loginClick()
              } 
              else {
                if(response.problem === 'email') {
                  emailMistake.current.innerHTML = response.message
                  emailMistake.current.style.display = 'block';
                }
                if(response.problem === 'password') {
                  passwordMistake.current.innerHTML = response.message
                  passwordMistake.current.style.display = 'block';
                }
                if(response.problem === undefined) {
                  setPopupText(response.message)
                  setFlag(true);
                }      
              }
            }
            }}>
              Авторизоваться
            </ButtonOne>
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
          <p className={styles.mistake} ref={passwordMistake}>Пароль должен содержать от 5 до 20 символов.</p>
          <InputOne 
            width={"100%"} 
            placeholder={"Введите пароль"} 
            value={password} 
            onChange={(e) => {setPassword(e.target.value)}}
            type={'password'}/>
          <p className={styles.link}>
            Есть аккаунт?
            <Link 
              to={LOG_ROUTE}
              onClick={() => {
                setNickname('');
                setEmail('');
                setPassword('');
                passwordMistake.current.style.display = 'none';
                emailMistake.current.style.display = 'none';
              }}> 
              Авторизоваться
            </Link>
          </p>
          <ButtonOne 
            width={"100%"}
            onClick={async () => {
              const response = checkRegister(email, password, nickname)
              if(response) {
                const response = await store.register(email, password, nickname);
                if(response.success) {
                  setPopupText('Ссылка отправлена на почту')
                  setFlag(true);
                  setEmail('');
                  setNickname('');
                  setPassword('');                  
                }
                else {
                  //console.log(response)
                  if(response.problem === 'email') {
                    emailMistake.current.innerHTML = response.message
                    emailMistake.current.style.display = 'block';
                  }
                  if(response.problem === 'password') {
                    passwordMistake.current.innerHTML = response.message
                    passwordMistake.current.style.display = 'block';
                  }
                  if(response.problem === undefined) {
                    setPopupText(response.message)
                    setFlag(true);
                  }
                }

              }
            }}>
              Зарегистрироваться
          </ButtonOne>
        </form>
        }
    </div>

  )
}

export default observer(AuthPage)