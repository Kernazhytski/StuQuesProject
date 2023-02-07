import React from 'react';

import styles from './ButtonOne.module.css'

const ButtonOne = ({children,width,onClick}) => {
    return (
        <button className={styles.but} style={{width}} onClick={onClick}>{children} </button>
    );
};

export default ButtonOne;