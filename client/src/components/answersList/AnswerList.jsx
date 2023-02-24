import React from 'react';
import styles from './AnswerList.module.css'
import AnswerMessage from "../answerMessage/AnswerMessage";

const AnswerList = ({answers}) => {
    return (
        <div>
            {
                answers.map((answer,key) => <AnswerMessage key={key} answer={answer}/>)
            }
        </div>
    );
};

export default AnswerList;