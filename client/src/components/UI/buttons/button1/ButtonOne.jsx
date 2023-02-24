import React from 'react';

import styles from './ButtonOne.module.css'

const ButtonOne = ({children,width,onClick,marginTop}) => {
    return (
        <button className={styles.but} style={{width,marginTop}} onClick={onClick}>{children} </button>
    );
};

export default ButtonOne;