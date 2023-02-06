import React from 'react';
import styles from './selectAddQuestion.module.css'

const SelectAddQuestion = () => {
    return (
        <select className={styles.inp}>
            <option>Математика</option>
            <option>Философия</option>
            <option>Физика</option>
            <option>Программирование</option>
            <option>Казахский</option>
        </select>
    );
};

export default SelectAddQuestion;