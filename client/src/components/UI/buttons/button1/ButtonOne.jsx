import React from 'react';

import styles from './ButtonOne.module.css'

const ButtonOne = ({children,width,onClick,marginTop,height,float}) => {
    return (
        <button className={styles.but} style={{width,marginTop,height,float}} onClick={onClick}>{children} </button>
    );
};

export default ButtonOne;