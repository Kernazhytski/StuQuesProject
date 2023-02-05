import React from 'react'

import styles from './Footer.module.css'
const Footer = () => {
  return (
    <footer className={styles.footer}>
        <div className={styles.container}>
            <div className={styles.column}>
                <div className={styles.socialMedia}>
                    <div className={styles.pictInst}></div>
                    <div className={styles.pictVk}></div>
                    <div className={styles.pictTg}></div>
                    <div className={styles.pictTwit}></div>
                </div>
                <div className={styles.info}>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>Контакты</li>
                        <li className={styles.listItem}>О нас</li>
                        <li className={styles.listItem}>FAQs</li>
                        <li className={styles.listItem}></li>
                        <li className={styles.listItem}></li>
                    </ul>
                </div>        
            </div>
        </div>
    </footer>
  )
}

export default Footer