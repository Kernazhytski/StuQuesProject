import React from 'react';
import styles from './PhotoPopap.module.css'
import ButtonOne from "../../buttons/button1/ButtonOne";

const PhotoPopap = ({active, setActive, imageURL}) => {

    const closePopup = () => {
        setActive(false)
    }
    return (
        <div className={active ? styles.activefon : styles.fon} onClick={closePopup}>
            <div className={active ? styles.formactive : styles.form} onClick={event => event.stopPropagation()}>
                <img className={styles.imag} src={imageURL}></img>
                <br/>
                <ButtonOne width={"100px"} onClick={closePopup}>Закрыть</ButtonOne>
            </div>
        </div>
    );
};

export default PhotoPopap;