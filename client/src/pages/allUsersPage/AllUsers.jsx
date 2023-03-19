import React, {useMemo, useState} from 'react'

import MenuBar from "../../components/menuBar/MenuBar";
import SideBar from '../../components/sideBar/SideBar'
import Footer from "../../components/footer/Footer";
import Loader from '../../components/UI/loader/Loader';

import styles from "./AllUsers.module.css";
import UserService from '../../service/UserService';
import SearchInput from '../../components/UI/inputs/searchInput/SearchInput.jsx';
import SelectOne from '../../components/UI/selects/selectOne/SelectOne';
import UsersList from '../../components/usersList/UsersList';
import PaginationList from '../../components/paginationList/PaginationList';
import {getPagesArray, getPagesCount} from '../../utils/pages';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [limit, setLimit] = useState(20);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pagesArray, setPagesArray] = useState([]);
    const [search, setSearch] = useState('');
    const [criterion, setCriterion] = useState('Все');

    const changeUsers = async (e) => {
        if (e.key == 'Enter') {
            localStorage.setItem('allUsersPages', 1)
            setTotalPages([])
        }
    }
    function changeCriterion(value) {
        localStorage.setItem('allUsersPages', 1)
        setCriterion(value)
    }
    const getAllUsers = async () => {
        try {

            const response = await UserService.getAllUsers(limit, page, search, criterion);
            const totalCount = response.headers['x-total-count']
            setTotalPages(getPagesCount(totalCount, limit));
            const users = response.data;    
            setUsers(users)
            setPagesArray(getPagesArray(totalPages))     
        }
        catch(e) {
            console.log(e)
        }

        
    }
    const changePage = (page) => {
        setPage(page)
        localStorage.setItem('allUsersPages', page)
    }


    useMemo(async () => {
        localStorage.setItem('myQuestionsPages', 1)
        localStorage.setItem('myAnswersPages', 1)
        localStorage.setItem('allQuestionsPages', 1)
        setPage(localStorage.getItem('allUsersPages') || 1)
        setIsLoading(true)
        await getAllUsers();
        setIsLoading(false)

    }, [totalPages, page, criterion])

    function changeSearch(value) {
        setSearch(value)
        setTotalPages([])
    }

    return (
        <div className={styles.wrapper}>
            <MenuBar changeS={changeSearch}/>
            <main className={styles.main}>
                <SideBar/>
                <div className={styles.users}>
                    <div className={styles.navigate}>
                        <p className={styles.header}>Пользователи</p>
                        <SelectOne options={['Все', 'Новыe', 'Репутация']} value={criterion}
                                   onChange={e => changeCriterion(e.target.value)} onKeyDown={e => changeUsers(e)}/>
                    </div>
                    {isLoading
                        ?
                        <Loader/>
                        :
                        <div>
                            {users.length > 0
                                ?
                                <UsersList users={users}/>
                                :
                                <p className={styles.noUsers}>Пользователей не найдено</p>
                            }
                        </div>
                    }
                    {totalPages > 1
                        ?
                        <div style={isLoading ? {display: 'none'} : null}>
                            <PaginationList pagesArray={pagesArray} changePage={changePage} page={page} loc={'allUsersPages'}/>
                        </div>
                        :
                        null
                    }

                </div>
            </main>

            <Footer/>
        </div>
    )
}

export default AllUsers