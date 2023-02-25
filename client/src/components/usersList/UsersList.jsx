import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'

import User from '../user/User'

import styles from './UsersList.module.css'

const UsersList = ({users}) => {
    const loc = useNavigate();
    const userProfile = (userId) => {
      loc(`${userId}`)
    }
    return (
        <div className={styles.allUsers}>
        {
        users.map(user => 
            <User user={user} key={uuidv4()} click={() => userProfile(user.id)}/>
        )
        }
        </div>
    )
}

export default UsersList