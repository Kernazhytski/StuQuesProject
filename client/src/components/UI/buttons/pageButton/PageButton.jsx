import React from 'react'
import classNames from 'classnames';

import styles from './PageButton.module.css'

const PageButton = ({children, isActive, onClick}) => {
  return (
    <button className={classNames(styles.btn, isActive ?  styles.active : null)} onClick={onClick}>
        {children}
    </button>
  )
}

export default PageButton