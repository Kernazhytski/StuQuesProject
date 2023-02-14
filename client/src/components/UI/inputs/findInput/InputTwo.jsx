import React from 'react';

import styles from './InputTwo.module.css'

const InputTwo = (props) => {
    return (
        <input className={styles.inp} style={{width:props.width}} placeholder={props.placeholder} {...props}/>
    );
};

export default InputTwo;