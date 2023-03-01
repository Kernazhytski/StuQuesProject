import React from 'react'
import classNames from 'classnames';

import styles from './Loader.module.css'
const Loader = () => {
  return (
    <figure>
        <div className={classNames(styles.dot, styles.white)}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
    </figure>
  )
}

export default Loader