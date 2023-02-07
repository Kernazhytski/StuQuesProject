import React from 'react';
import styles from './TextAreaOne.module.css'

const TextAreaOne = (props) => {
    return (
        <textarea className={styles.inp} {...props}></textarea>
    );
};

export default TextAreaOne;