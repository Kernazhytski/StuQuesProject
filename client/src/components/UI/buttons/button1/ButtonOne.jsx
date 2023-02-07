import React from 'react';

import styles from './ButtonOne.module.css'

const ButtonOne = ({children,width}) => {
    return (
        <button className={styles.but} style={{width}}>{children}</button>
    );
};

export default ButtonOne;