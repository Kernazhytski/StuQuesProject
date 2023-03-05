import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import styles from './Burger.module.css'

const Burger = () => {
  const burger = useRef();
  const burgerContent = useRef();
  const body = document.querySelector('body');
  body.addEventListener('click', () => {
    burger.current.className = styles.burgerClose;
    burgerContent.current.style.display = 'none';
  })
  const burgerClick = (e) => {
    e.stopPropagation()
    if(burger.current.className === styles.burgerOpen) {
      burger.current.className = styles.burgerClose;
      burgerContent.current.style.display = 'none';
    }
    else if(burger.current.className === styles.burgerClose) {
      burger.current.className = styles.burgerOpen;
      burgerContent.current.style.display = 'block';
      
    }
  }
  return (
    <div>
      <div className={styles.burgerContainer} onClick={burgerClick}>
        <div className={styles.burgerClose} ref={burger}>
        </div>      
      </div>
      <div className={styles.burgerContent} ref={burgerContent} onClick={e => e.stopPropagation()}>
        <ul className={styles.burgerContent__menu}>
          <li className={styles.burgerContent__item}>
            <Link to={'/'}>Вопросы</Link>
          </li>
          <li className={styles.burgerContent__item}>
            <Link to={'/addQUestion'}>Задать вопрос</Link>
          </li>
          <li className={styles.burgerContent__item}>
            <Link to={'/myQuestions'}>Мои вопросы</Link>
          </li>
          <li className={styles.burgerContent__item}>
            <Link to={'/myAnswers'}>Мои ответы</Link>
          </li>
          <li className={styles.burgerContent__item}>
            <Link to={''}>Учётная запись</Link>
          </li>
          <li className={styles.burgerContent__item}>
            <Link to={'/allUsers'}>Пользователи</Link>
          </li>
        </ul>
      </div>      
    </div>
  )
}

export default Burger