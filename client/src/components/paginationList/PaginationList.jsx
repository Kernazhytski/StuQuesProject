import React, { useMemo, useState } from "react";
import { v4 as uuidv4 } from 'uuid'

import PageButton from "../UI/buttons/pageButton/PageButton";

import styles from './PaginationList.module.css'

const PaginationList = ({pagesArray, changePage, page, loc}) => {
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(9);
    const [retArray, setRetArray] = useState([]);
    const [arrow, serArrow] = useState(false)
    const changePagesButtons = (side) => {
        serArrow(true);
        if (side == 'left' && startIndex - 9 >= 0) {
            setStartIndex(startIndex - 10);
            setEndIndex(endIndex - 9)
        }
        
        else if(side == 'right' && startIndex + 9 <= pagesArray.length) {
            //console.log(999)
            setStartIndex(startIndex + 10);
            setEndIndex(endIndex + 9)                
        }
    }
    useMemo(() => {
        let end = endIndex;
        //let start = startIndex
        let page;
        if (loc == 'myQuestionsPages') {
            page = localStorage.getItem('myQuestionsPages')
        } 
        else if (loc == 'myAnswersPages') {
            page = localStorage.getItem('myAnswersPages')
        } 
        else if (loc == 'allQuestionsPages') {
            page = localStorage.getItem('allQuestionsPages')
        }
        else if (loc == 'allUsersPages') {
            page = localStorage.getItem('allUsersPages')
        }
        if(page == undefined || page == null) {
            page = 1;
        }
        while (page > end + 1 && !arrow){
            
            setEndIndex(endIndex + 9)
            setStartIndex(startIndex + 10)
            end += 10
        }
        setRetArray(pagesArray.slice(startIndex, endIndex + 1))
    }, [pagesArray, startIndex])
    return(
        <div className={styles.pagesCont}>
            {startIndex - 9 >= 0 && pagesArray.length > 0
            ?
                <div className={styles.leftArrow} onClick={() => changePagesButtons('left')}/>
            :
                null
            }
            {retArray.map(p => 
            <PageButton width={'50px'} key={uuidv4()} isActive={p === +page ? true : false} onClick={() => changePage(p)}>
                {p}
            </PageButton>)
            }   
            {startIndex + 9 <= pagesArray.length && pagesArray.length > 0
            ?
                <div className={styles.rightArrow} onClick={() => changePagesButtons('right')}/>  
            :
                null
            }
                      
        </div>  
    )
}

export default PaginationList