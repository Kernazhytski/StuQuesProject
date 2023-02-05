import React from 'react';

import styles from './InputOne.module.css'

const InputOne = ({placeholder}) => {
    return (
        <input className={styles.inp} placeholder={placeholder}></input>
    );
};

export default InputOne;