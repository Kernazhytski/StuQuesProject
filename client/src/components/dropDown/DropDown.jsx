import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import ButtonOne from '../UI/buttons/button1/ButtonOne';

import styles from './DropDown.module.css'

const DropDown = ({...props}) => {
  //console.log(props.leaveAccount)
  return (
    <div className={styles.dropDown} onClick={e => e.stopPropagation()}>
        <ul>
            <li className={styles.listItem}>Настройки</li>
            <li className={styles.listItem}>Помощь</li>
            <li className={styles.listItem}>
              <ButtonOne width={"125px"} onClick={props.leaveAccount}>Выход</ButtonOne>
            </li>
        </ul>
    </div>
  )
}

export default DropDown