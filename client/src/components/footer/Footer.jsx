import React from 'react'

import styles from './Footer.module.css'
import {Link} from "react-router-dom";

const Footer = () => {

    const vk = () => {
        window.location.href='https://vk.com/stuques';
    }

    const twt = () => {
        window.location.href='https://twitter.com/CrossoWar';
    }

    const inst = () => {
        window.location.href='https://www.instagram.com/kernozh1607/';
    }

    const teleg = () => {
        window.location.href='https://t.me/vavilenTat';
    }

  return (
    <footer className={styles.footer}>
        <div className={styles.container}>
            <div className={styles.column}>
                <div className={styles.socialMedia}>
                    <div className={styles.pictInst} onClick={inst}></div>
                    <div className={styles.pictVk} onClick={vk}></div>
                    <div className={styles.pictTg} onClick={teleg}></div>
                    <div className={styles.pictTwit} onClick={twt}></div>
                </div>
                <div className={styles.info}>
                    <ul className={styles.list}>
                        <li className={styles.listItem} ><Link to={`/contacts`}>Контакты</Link></li>
                        <li className={styles.listItem}><Link to={`/rules`}>Правила</Link></li>
                        <li className={styles.listItem} ><Link to={`/help`}>FAQs</Link></li>
                    </ul>
                </div>        
            </div>
        </div>
    </footer>
  )
}

export default Footer