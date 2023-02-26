import React from 'react';
import ButtonOne from "../buttons/button1/ButtonOne";

import styles from './Popup.module.css'
    
const Popup = ({active, setActive, popupText, popupButtonText, func}) => {  
    const closePopup = () => {
        func()
        setActive(false)
    }
    return (
        <div className={active ? styles.activefon : styles.fon} onClick={closePopup}>
            <div className={active?  styles.formactive : styles.form} onClick={event => event.stopPropagation()}>
                <p>{popupText}</p><br/>
                <ButtonOne width={"100px"} onClick={closePopup}>{popupButtonText}</ButtonOne>
            </div>
        </div>
    );
};

export default Popup;