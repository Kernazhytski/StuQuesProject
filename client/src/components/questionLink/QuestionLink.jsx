import React from 'react';
import styles from './QuestionLink.module.css'
import {Link} from 'react-router-dom'


const QuestionLink = ({question}) => {
    return (
        <div className={styles.strip}>
            <div className={styles.stripRow}>
                <h2 className={styles.title}>
                    <Link  to={'/question/'+question.id}>{question.title}</Link>
                </h2>
                
                {question.isAnswered&&<p className={styles.resh}>Решено</p>}
            </div>
            <br/>
            <p className={styles.sub}>{question.subject}</p>
        </div>
    );
};

export default QuestionLink;