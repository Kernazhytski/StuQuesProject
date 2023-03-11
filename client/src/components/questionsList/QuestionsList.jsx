import React, {useContext, useMemo, useState} from 'react';
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
            const response = await QuestionsServise.getMyAnswers(props.user, limit, page, props.search, props.subjectS)
            const totalCount = response.headers['x-total-count']
            setTotalPages(getPagesCount(totalCount, limit));
            const data = response.data
            setQuestions(data)

        } catch (e) {
            console.log(e)
        }
    }
    const changePage = (page) => {
        setPage(page)
    }

    useMemo(async () => {
        setIsLoading(true)


        if (location2 == 'myQuestions') {

            await getMyQuestions()
            setIsLoading(false)
        } else if (location2 == 'myAnswers') {


            await getMyAnswers(props.answer)
            setIsLoading(false)
        } else if (location == '') {
            await getAllQuestions()
            setIsLoading(false)
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
                    <PaginationList pagesArray={pagesArray} changePage={changePage} page={page}/>
                </div>
                :
                null
            }

        </div>
    );
};


export default QuestionsList;

