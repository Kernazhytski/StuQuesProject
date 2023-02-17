import React, {useEffect, useState} from 'react';
import QuestionLink from "../questionLink/QuestionLink";
import axios from 'axios'
import styles from "./QuestionsList.module.css"
import QuestionsServise from "../../service/QuestionsService";

const QuestionsList = (props) => {

    const [questions, setQuestions] = useState([])


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await QuestionsServise.getAllQuestions(props.search, props.subjectS)
                console.log(response)
                const data = response.data
                setQuestions(data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData();
    }, [setQuestions, props.search, props.subjectS])


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