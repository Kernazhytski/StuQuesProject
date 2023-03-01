import React from 'react';
import styles from './AnswerList.module.css'
import AnswerMessage from "../answerMessage/AnswerMessage";

const AnswerList = ({answers,question}) => {
    return (
        <div>
            {
                answers.map((answer,key) => <AnswerMessage key={key} answer={answer} question={question}/>)
            }
        </div>
    );
};

export default AnswerList;