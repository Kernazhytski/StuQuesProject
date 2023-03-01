import React, {useEffect, useState} from 'react';
import QuestionLink from "../questionLink/QuestionLink";
import axios from 'axios'
import styles from "./QuestionsList.module.css"
import QuestionsServise from "../../service/QuestionsService";

const QuestionsList = (props) => {

    const [questions, setQuestions] = useState([])


    useEffect(() => {
        console.log(props.user!==undefined)
        if (props.user) {
            console.log("dd")
            async function fetchData() {
                try {
                    const response = await QuestionsServise.getMyQuestions(props.user)
                    const data = response.data
                    setQuestions(data)
                } catch (e) {
                    console.log(e)
                }
            }
            fetchData();
        }
        else if(props.answers!==undefined){
            console.log("wwwwwwwwww")
            async function fetchData() {
                try {
                    const response = await QuestionsServise.getMyAnswers(props.answers)
                    const data = response.data
                    setQuestions(data)
                    console.log(data)
                } catch (e) {
                    console.log(e)
                }
            }
            fetchData();
        }
        else {
            async function fetchData() {
                try {
                    const response = await QuestionsServise.getAllQuestions(props.search, props.subjectS)
                    const data = response.data
                    setQuestions(data)
                } catch (e) {
                    console.log(e)
                }
            }
            fetchData();
        }
    }, [setQuestions, props.search, props.subjectS, props.user])


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