import React, {useEffect, useMemo, useState} from 'react';
import QuestionLink from "../questionLink/QuestionLink";
import axios from 'axios'
import styles from "./QuestionsList.module.css"
import QuestionsServise from "../../service/QuestionsService";
import { getPagesArray, getPagesCount } from '../../utils/pages';
import { v4 as uuidv4 } from 'uuid'
import PageButton from '../UI/buttons/pageButton/PageButton';
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
            setIsLoading(true)
            const response = await QuestionsServise.getMyQuestions(props.user)
            const data = response.data
            setIsLoading(false)
            setQuestions(data)
            
        } catch (e) {
            console.log(e)
        }
    }
    const changePage = (page) => {
        setPage(page)
    }

    useMemo(async () => {
        //setIsLoading(true)
        if (props.user) {
            await getMyQuestions()
        } else {
            await getAllQuestions()   
        }    
        setPagesArray(getPagesArray(totalPages))
        //setIsLoading(false)
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

            <PaginationList pagesArray={pagesArray} changePage={changePage} page={page}/>
        </div>
    );
};


export default QuestionsList;

/*import React, {useEffect, useMemo, useState} from 'react';
import QuestionLink from "../questionLink/QuestionLink";
import axios from 'axios'
import styles from "./QuestionsList.module.css"
import QuestionsServise from "../../service/QuestionsService";
import { getPagesArray, getPagesCount } from '../../utils/pages';
import { v4 as uuidv4 } from 'uuid'
import PageButton from '../UI/buttons/pageButton/PageButton';
import PaginationList from '../paginationList/PaginationList';
import Loader from '../../components/UI/loader/Loader';

const QuestionsList = (props) => {

    const [questions, setQuestions] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0)
    const [pagesArray, setPagesArray] = useState([])
    const [isLoading, setIsLoading] = useState(false);


    const changePage = (page) => {
        setPage(page)
    }

    useMemo(async () => {
        setIsLoading(true)

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
                    const response = await QuestionsServise.getAllQuestions(props.search, props.subjectS, limit, page)
                    const totalCount = response.headers['x-total-count']
                    setTotalPages(getPagesCount(totalCount, limit));
                    const data = response.data
                    setQuestions(data)
                } catch (e) {
                    console.log(e)
                }
            }
            await fetchData();
            setPagesArray(getPagesArray(totalPages))
        }
        setIsLoading(false)
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
                    <PaginationList pagesArray={pagesArray} changePage={changePage} page={page}/>              
              </div>
            }
        </div>
    );
};

export default QuestionsList;*/ 