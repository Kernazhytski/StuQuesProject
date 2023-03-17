import React from 'react';
import styles from './selectGetQuestion.module.css'

const SelectGetQuestion = (props) => {
    return (
        <select className={styles.inp} {...props} required={true} >
            <option>Все</option>
            <option>Математика</option>
            <option>Философия</option>
            <option>Физика</option>
            <option>Программирование</option>
            <option>Русский</option>
            <option>Политология</option>
            <option>Инженерная графика</option>
            <option>Биология/Химия</option>
            <option>Иностранный</option>
        </select>
    );
};

export default SelectGetQuestion;