import React from 'react';
import styles from './selectAddQuestion.module.css'

const SelectAddQuestion = (props) => {
    return (
        <select className={styles.inp} {...props} required={true} >
            <option>Математика</option>
            <option>Философия</option>
            <option>Физика</option>
            <option>Программирование</option>
            <option>Русский</option>
            <option>Политология</option>
            <option>Инженерная графика</option>
            <option>Биология/Химия</option>
            <option>Иностранный</option>
            <option>История</option>
        </select>
    );
};

export default SelectAddQuestion;