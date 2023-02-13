import React, {useEffect, useState} from 'react';
import QuestionLink from "../questionLink/QuestionLink";
import axios from 'axios'

import styles from "./QuestionsList.module.css"

const QuestionsList = () => {

    const [questions, setQuestions] = useState([])

    useEffect(() => {
        axios.get('http://localhost:2000/question/list')
            .then(response => {
                const data = response.data
                setQuestions(data)
            })
            .catch(error => {
                console.log(error)
            });
    }, [setQuestions])


    return (
        <div className={styles.spis}>
            {
                questions.length > 0
                    ?
                    questions.map((question) => <QuestionLink key={question.id}  question={question}/>)
                    :
                    <p>У матросов нет вопросов</p>
            }
        </div>
    );
};

export default QuestionsList;