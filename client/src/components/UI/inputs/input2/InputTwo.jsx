import React from 'react';

import styles from './InputTwo.module.css'

const InputTwo = ({width,placeholder}) => {
    return (
        <input className={styles.inp} style={{width}} placeholder={placeholder}/>
    );
};

export default InputTwo;