import React, { useMemo, useState } from 'react';
import ButtonOne from "../../buttons/button1/ButtonOne";

import styles from './PopupEmail.module.css'
import {useNavigate} from "react-router-dom";
    
const PopupEmail = ({active, setActive, popupText,locat}) => {
    const closePopup = () => {
        setActive(false)
        relocate()
        //action()
    }

    let loc = useNavigate();

    const relocate = () => {
        loc(locat)
    }

    return (
        <div className={active ? styles.activefon : styles.fon} onClick={closePopup}>
            <div className={active?  styles.formactive : styles.form} onClick={event => event.stopPropagation()}>
                <div className={styles.txt}>{popupText}</div><br/>
                <ButtonOne width={"100px"} onClick={closePopup}>Хорошо</ButtonOne>
            </div>
        </div>
    );
};

export default PopupEmail;