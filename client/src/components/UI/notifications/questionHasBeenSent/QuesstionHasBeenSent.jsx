import React from 'react';
import ButtonOne from "../../buttons/button1/ButtonOne";
import {useNavigate} from "react-router-dom";
import styles from './QuesstionHasBeenSent.module.css'

const QuesstionHasBeenSent = () => {
    let loc = useNavigate();

    const relocate = () => {
      loc('/')
    }

    return (
        <div className={styles.form}>
            <p>Вопрос успешно отправлен!</p>
            <ButtonOne width={"100px"} onClick={relocate}>Хорошо</ButtonOne>
        </div>
    );
};

export default QuesstionHasBeenSent;