import React from 'react';
import styles from './QuestionLink.module.css'
import {Link} from 'react-router-dom'


const QuestionLink = ({question}) => {
    return (
        <div className={styles.strip}>
            <Link  className={styles.title} to={'/question/'+question.id}>{question.title}</Link>
            <p className={styles.sub}>{question.subject}</p>
        </div>
    );
};

export default QuestionLink;