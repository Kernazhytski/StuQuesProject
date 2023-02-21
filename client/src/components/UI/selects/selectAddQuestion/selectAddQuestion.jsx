import React from 'react';
import styles from './selectAddQuestion.module.css'

const SelectAddQuestion = (props) => {
    return (
        <select className={styles.inp} {...props} required={true} >
            <option>Математика</option>
            <option>Философия</option>
            <option>Физика</option>
            <option>Программирование</option>
            <option>Казахский</option>
        </select>
    );
};

export default SelectAddQuestion;