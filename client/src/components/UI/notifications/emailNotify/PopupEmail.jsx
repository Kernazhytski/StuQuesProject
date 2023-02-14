import React, { useMemo, useState } from 'react';
import ButtonOne from "../../buttons/button1/ButtonOne";

import styles from './PopupEmail.module.css'
    
const PopupEmail = ({active, setActive, popupText}) => {  
    const closePopup = () => {
        setActive(false)
    }
    return (
        <div className={active ? styles.activefon : styles.fon} onClick={closePopup}>
            <div className={active?  styles.formactive : styles.form} onClick={event => event.stopPropagation()}>
                <p>{popupText}</p><br/>
                <ButtonOne width={"100px"} onClick={closePopup}>Хорошо</ButtonOne>
            </div>
        </div>
    );
};

export default PopupEmail;