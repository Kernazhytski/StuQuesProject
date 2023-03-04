import React, { useMemo, useState} from 'react';
import QuestionLink from "../questionLink/QuestionLink";
import styles from "./QuestionsList.module.css"
import QuestionsServise from "../../service/QuestionsService";
import { getPagesArray, getPagesCount } from '../../utils/pages';
import PaginationList from '../paginationList/PaginationList';
import Loader from '../../components/UI/loader/Loader';

const QuestionsList = (props) => {

    const [questions, setQuestions] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0)
    const [pagesArray, setPagesArray] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const getAllQuestions = async () => {
        try {
            const response = await QuestionsServise.getAllQuestions(props.search, props.subjectS, limit, page)
            console.log(response)
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
            const response = await QuestionsServise.getMyQuestions(props.user)
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
        if (props.user) {
            await getMyQuestions()
            setIsLoading(false)
        } else {
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
                        <p>У матросов нет вопросов</p>
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
