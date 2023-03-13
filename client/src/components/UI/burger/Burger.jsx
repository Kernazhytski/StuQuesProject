import React, { useMemo, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ADD_QUES, ALL_USERS, MAIN_ROUTE, MY_ANSW, MY_QUES } from '../../../utils/routes';
import ButtonOne from '../buttons/button1/ButtonOne';
import styles from './Burger.module.css'

const Burger = ({isAuth, userId, leaveAccount}) => {
  const location = "/"+useLocation().pathname.split('/').reverse()[0];
  const preLocation = "/"+useLocation().pathname.split('/').reverse()[1]
  const loc = useNavigate();
  const burger = useRef();
  const burgerContent = useRef();
  const body = document.querySelector('body');
  body.addEventListener('click', () => {
    if(burger.current) {
      burger.current.className = styles.burgerClose;
      burgerContent.current.style.display = 'none';      
    }

  })      
  const burgerClick = (e) => {
    e.stopPropagation()
    if(burger.current.className === styles.burgerOpen) {
      burger.current.className = styles.burgerClose;
      burgerContent.current.style.display = 'none';
    }
    else if(burger.current.className === styles.burgerClose) {
      burger.current.className = styles.burgerOpen;
      burgerContent.current.style.display = 'flex';
    }
  }
  const loginClick = () => {
    console.log(loc)
    loc('/login')
}
  return (
    <div>
      <div className={styles.burgerContainer} onClick={burgerClick}>
        <div className={styles.burgerClose} ref={burger}>
        </div>      
      </div>
      <div className={styles.burgerContent} ref={burgerContent} onClick={e => e.stopPropagation()}>
        <ul className={styles.burgerContent__menu}>
        {
          location === '/'
          ?
            <li className={styles.burgerContent__itemActive}>
              <Link to={MAIN_ROUTE} >Вопросы</Link>
            </li>
          :
            <li className={styles.burgerContent__item}>
              <Link to={MAIN_ROUTE} >Вопросы</Link>
            </li>
        }          
        {
          location === ADD_QUES
          ?
            <li className={styles.burgerContent__itemActive}>
              <Link to={ADD_QUES} >Задать вопрос</Link>
            </li>
          :
            <li className={styles.burgerContent__item}>
              <Link to={ADD_QUES} >Задать вопрос</Link>
            </li>
        }   
        {
          preLocation === '/myQuestions'
          ?
            <li className={styles.burgerContent__itemActive}>
              <Link to={'/myQuestions/'+userId} >Мои вопросы</Link>
            </li>
          :
            <li className={styles.burgerContent__item}>
              <Link to={'/myQuestions/'+userId} >Мои вопросы</Link>
            </li>
        }  
        {
          preLocation === '/myAnswers'
          ?
            <li className={styles.burgerContent__itemActive}>
              <Link to={'/myAnswers/'+userId} >Мои ответы</Link>
            </li>
          :
            <li className={styles.burgerContent__item}>
              <Link to={'/myAnswers/'+userId} >Мои ответы</Link>
            </li>
        }        
        {
          location === ALL_USERS
          ?
            <li className={styles.burgerContent__itemActive}>
              <Link to={ALL_USERS} >Пользователи</Link>
            </li>
          :
            <li className={styles.burgerContent__item}>
              <Link to={ALL_USERS} >Пользователи</Link>
            </li>
        } 
          {isAuth
            ?     
            <div>
            {
              preLocation === ALL_USERS
                  ?
                  <li className={styles.burgerContent__itemActive}>
                      <Link to={`/allUsers/${userId}`} >Учётная запись</Link>
                  </li>
                  :
                  <li className={styles.burgerContent__item}>
                      <Link to={`/allUsers/${userId}`} >Учётная запись</Link>
                  </li>
            }      
            <li className={styles.burgerContent__item}>
              <ButtonOne width={"175px"} onClick={leaveAccount}>Выход</ButtonOne>
            </li>
            </div>     

            :
              <li className={styles.burgerContent__item}>
                <ButtonOne width={"175px"} onClick={loginClick}>Вход</ButtonOne>
              </li>
              
          }


        </ul>
      </div>      
    </div>
  )
}

export default Burger