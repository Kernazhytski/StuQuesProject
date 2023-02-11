import React from 'react';
import ButtonOne from "../../buttons/button1/ButtonOne";
import {useNavigate} from "react-router-dom";
import styles from './QuesstionHasBeenSent.module.css'

const QuesstionHasBeenSent = ({active,setActive}) => {
    let loc = useNavigate();

    const relocate = () => {
        loc('/')
    }

    return (
        <div className={active ? styles.activefon : styles.fon} onClick={relocate}>
            <div className={active?  styles.formac : styles.form} onClick={event => event.stopPropagation()}>
                <p>Вопрос успешно отправлен!</p>
                <br/>
                <ButtonOne width={"100px"} onClick={relocate}>Хорошо</ButtonOne>
            </div>
        </div>
    );
};

export default QuesstionHasBeenSent;