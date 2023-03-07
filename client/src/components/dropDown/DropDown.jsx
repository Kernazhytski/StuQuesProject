import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ButtonOne from '../UI/buttons/button1/ButtonOne';
import { observer } from 'mobx-react-lite';

import { Context } from '../../index';
import styles from './DropDown.module.css'

const DropDown = ({...props}) => {

  
  const {store} = useContext(Context);
  console.log(`allUsers/${store.user.id}`)
  return (
    <div className={styles.dropDown} onClick={e => e.stopPropagation()}>
        <ul>
            <li className={styles.listItem}>
              <Link to={`/allUsers/${store.user.id}`}>Учётная запись</Link>
            </li>
            <li className={styles.listItem}>
                <Link to={`/help`}>Помощь</Link>
            </li>
            <li className={styles.listItem}>
              <ButtonOne width={"125px"} onClick={props.leaveAccount}>Выход</ButtonOne>
            </li>
        </ul>
    </div>
  )
}

export default observer(DropDown)