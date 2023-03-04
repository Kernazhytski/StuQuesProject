import React, { useMemo, useState } from "react";
import { v4 as uuidv4 } from 'uuid'
import classNames from 'classnames';

import PageButton from "../UI/buttons/pageButton/PageButton";

import styles from './PaginationList.module.css'

const PaginationList = ({pagesArray, changePage, page}) => {
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(9);
    const [retArray, setRetArray] = useState([])
    const changePagesButtons = (side) => {
        if (side == 'left' && startIndex - 9 >= 0) {
            setStartIndex(startIndex - 10);
            setEndIndex(endIndex - 9)
        }
        else if(side == 'right' && startIndex + 9 <= pagesArray.length) {
            setStartIndex(startIndex + 10);
            setEndIndex(endIndex + 9)                
        }
    }
    useMemo(() => {
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
            <PageButton width={'50px'} key={uuidv4()} isActive={p === page ? true : false} onClick={() => changePage(p)}>
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