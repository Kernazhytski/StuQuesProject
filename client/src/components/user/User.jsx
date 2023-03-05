import React from 'react'

import styles from './User.module.css'

const User = ({user, click}) => {
    return (
        <div className={styles.user} onClick={click}>
            <img className={styles.userImg} src={process.env.REACT_APP_SERVER_URL + '/' + user.avatarImg}/>
            <div>
                <p className={styles.userNickname}>{user.nickname}</p>
                <p className={styles.score}>Очки: {user.score}</p>
                <p className={styles.rang}>Ранг: {user.rang}</p>
            </div>
        </div>
    )
}

export default User