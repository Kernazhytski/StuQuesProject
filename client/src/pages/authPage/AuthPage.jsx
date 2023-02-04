import React from 'react'

import classes from './AuthPage.module.css'

const AuthPage = () => {
  return (
    <div className={classes.container}>
      <div className={classes.loginCard}>
        <form>
          <input placeholder='Введите почту'/>
          <input placeholder='Введите пароль'/>
          <button>Авторизироваться</button>
        </form>
      </div>
    </div>
  )
}

export default AuthPage