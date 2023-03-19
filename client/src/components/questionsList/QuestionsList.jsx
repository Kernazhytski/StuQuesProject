import React, { useMemo, useState} from 'react';
import QuestionLink from "../questionLink/QuestionLink";
import styles from "./QuestionsList.module.css"
import QuestionsServise from "../../service/QuestionsService";
import {getPagesArray, getPagesCount} from '../../utils/pages';
import PaginationList from '../paginationList/PaginationList';
import Loader from '../../components/UI/loader/Loader';
import {useLocation} from 'react-router-dom';

const QuestionsList = (props) => {
    const location = useLocation().pathname.split('/').reverse()[0];
    const location2 = useLocation().pathname.split('/').reverse()[1];
    const [questions, setQuestions] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0)
    const [pagesArray, setPagesArray] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [loc, setLoc] = useState('')

    const getAllQuestions = async () => {
        try {
            const response = await QuestionsServise.getAllQuestions(props.search, props.subjectS, limit, page)
            const totalCount = response.headers['x-total-count']
            setTotalPages(getPagesCount(totalCount, limit));
            const data = response.data
            setQuestions(data)
        } catch (e) {
            console.log(e)
        }
    }
    const getMyQuestions = async () => {
        try {
            const response = await QuestionsServise.getMyQuestions(props.user, limit, page, props.search, props.subjectS)
            const totalCount = response.headers['x-total-count']
            setTotalPages(getPagesCount(totalCount, limit));
            const data = response.data
            setQuestions(data)

        } catch (e) {
            console.log(e)
        }
    }
    const getMyAnswers = async () => {
        try {
            //console.log(props.user, limit, page, props.search, props.subjectS)
            const response = await QuestionsServise.getMyAnswers(props.user, limit, page, props.search, props.subjectS)
            //console.log(response)
            const totalCount = response.headers['x-total-count']
            setTotalPages(getPagesCount(totalCount, limit));
            const data = response.data
            //console.log(data)
            setQuestions(data)
        } catch (e) {
            console.log(e)
        }
    }
    const changePage = async (page) => {
        localStorage.setItem('page', page)
        if (location2 == 'myQuestions') {
            localStorage.setItem('myQuestionsPages', page)
        } 
        else if (location2 == 'myAnswers') {
            //console.log(page)
            localStorage.setItem('myAnswersPages', page)
        } 
        else if (location == '') {
            localStorage.setItem('allQuestionsPages', page)
        }
        setPage(page)
    }

    useMemo(async () => {
        setIsLoading(true)
        if (location2 == 'myQuestions') {
            setPage(localStorage.getItem('myQuestionsPages') || 1)
            setLoc('myQuestionsPages')
            await getMyQuestions()
            setIsLoading(false)
            localStorage.setItem('myAnswersPages', 1)
            localStorage.setItem('allQuestionsPages', 1)
            localStorage.setItem('allUsersPages', 1)
        } else if (location2 == 'myAnswers') {
            setPage(localStorage.getItem('myAnswersPages') || 1)
            setLoc('myAnswersPages')
            await getMyAnswers()
            setIsLoading(false)
            localStorage.setItem('myQuestionsPages', 1)
            localStorage.setItem('allQuestionsPages', 1)
            localStorage.setItem('allUsersPages', 1)
        } else if (location == '') {
            setPage(localStorage.getItem('allQuestionsPages') || 1)
            setLoc('allQuestionsPages')
            await getAllQuestions()
            setIsLoading(false)
            localStorage.setItem('myQuestionsPages', 1)
            localStorage.setItem('myAnswersPages', 1)
            localStorage.setItem('allUsersPages', 1)
        }

        setPagesArray(getPagesArray(totalPages))

    }, [setQuestions, props.search, props.subjectS, props.user, totalPages, page])

    return (
        <div className={styles.spis}>
            {isLoading
                ?
                <Loader/>
                :
                <div>
                    {
                        questions.length > 0
                            ?
                            questions.map((question) => <QuestionLink key={question.id} question={question}/>)
                            :
                            <div>
                                {location == 'myAnswers'
                                    ?
                                    <p className={styles.noQuestions}>Ответов не найдено</p>
                                    :
                                    <p className={styles.noQuestions}>У матросов нет вопросов</p>
                                }
                            </div>


                    }

                </div>
            }
            {totalPages > 1
                ?
                <div style={isLoading ? {display: 'none'} : null}>
                    <PaginationList pagesArray={pagesArray} changePage={changePage} page={page} loc={loc}/>
                </div>
                :
                null
            }

        </div>
    );
};


export default QuestionsList;

