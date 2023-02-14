import React, {useEffect, useState} from 'react';
import QuestionLink from "../questionLink/QuestionLink";
import axios from 'axios'
import styles from "./QuestionsList.module.css"


const QuestionsList = (search,subject) => {

    const [questions, setQuestions] = useState([])


    useEffect(() => {
        console.log(search.search)
        console.log(subject.subject)
        axios.get('http://localhost:2000/question/list', {
            params: {
                titleSearch: search.search,
                sub: subject.subject
            }
        })
            //axios.get('http://localhost:2000/question/list?titleSearch=A')
            .then(response => {
                const data = response.data
                setQuestions(data)
            })
            .catch(error => {
                console.log(error)
            });
    }, [setQuestions, search.search,subject.subject])


    return (
        <div className={styles.spis}>
            {
                questions.length > 0
                    ?
                    questions.map((question) => <QuestionLink key={question.id} question={question}/>)
                    :
                    <p>У матросов нет вопросов</p>
            }
        </div>
    );
};

export default QuestionsList;