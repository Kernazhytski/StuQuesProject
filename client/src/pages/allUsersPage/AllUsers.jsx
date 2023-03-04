import React, { useMemo, useState } from 'react'

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
import { getPagesArray, getPagesCount } from '../../utils/pages';

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
    if(e.key == 'Enter') {
      setTotalPages([])
    }
  }
  const getAllUsers = async() => {
    const response = await UserService.getAllUsers(limit, page, search, criterion);
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPagesCount(totalCount, limit));
    const users = response.data

    return users
  }
  const changePage = (page) => {
    setPage(page)
  }


  useMemo(async () => {
    console.log(1)
    setIsLoading(true)
    const response = await getAllUsers();
    setIsLoading(false)
    setUsers(response) 
    setPagesArray(getPagesArray(totalPages))
  }, [totalPages, page, criterion])



  return (
      <div className={styles.wrapper}>
        <MenuBar/>
        <main className={styles.main}>
          <SideBar />
          <div className={styles.users}>
            <div className={styles.navigate}>
              <SearchInput placeholder={'Найти пользователя'} value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => changeUsers(e)}/>
              <SelectOne options={['Все', 'Новыe', 'Репутация']} value={criterion} onChange={e => setCriterion(e.target.value)} onKeyDown={e => changeUsers(e)}/>
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
                  <p>Пользователей не найдено</p>
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
        </main>
        <Footer />
      </div>
  )
}

export default AllUsers