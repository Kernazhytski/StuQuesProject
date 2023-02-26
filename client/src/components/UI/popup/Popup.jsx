import React from 'react';
import classNames from 'classnames';

import ButtonOne from "../buttons/button1/ButtonOne";

import styles from './Popup.module.css'
    
const Popup = ({active, setActive, popupText, popupButtonTextConfirm, popupButtonTextCancell, func}) => {  
    const closePopup = () => {
        setActive(false)
    }
    const confirm = () => {
        func()
        setActive(false)
    }
    return (
        <div className={classNames(styles.fon, active ? styles.activefon : null)} onClick={closePopup}>
            <div className={classNames(styles.form, active ? styles.formactive : null)} onClick={event => event.stopPropagation()}>
                <p className={styles.popupText}>{popupText}</p><br/>
                <div className={styles.btnCont}>
                    <ButtonOne width={"100px"} onClick={confirm}>{popupButtonTextConfirm}</ButtonOne>
                    <ButtonOne width={"100px"} onClick={closePopup}>{popupButtonTextCancell}</ButtonOne>                    
                </div>

            </div>
        </div>
    );
};

export default Popup;