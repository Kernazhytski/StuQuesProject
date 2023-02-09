import React from 'react';

import styles from './InputOne.module.css'

const InputOne = (props) => {
    return (
        <input className={styles.inp} {...props}></input>
    );
};

export default InputOne;