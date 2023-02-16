import React, {useState} from 'react'
import Footer from '../../components/footer/Footer';
import MenuBar from "../../components/menuBar/MenuBar";
import {SideBar} from '../../components/sideBar/SideBar';
import QuestionsList from "../../components/questionsList/QuestionsList";

import styles from './MainPage.module.css';
import SelectGetQuestion from "../../components/UI/selects/selectGetQuestions/selectGetQuestion";

const MainPage = () => {

    const [subject, setSubject] = useState("Все")
    const [search, setSearch] = useState("")

    function changeSearch(value) {
        setSearch(value)
    }

    function changeSub(value) {
        setSubject(value)
    }


    return (
        <div className={styles.wrapper}>
            <MenuBar changeS={changeSearch}/>
            <main className={styles.main}>
                <SideBar/>
                <div className={styles.questions}>
                    <p className={styles.header} style={{display: "inline-block", marginRight: "10px"}}>Вопросы</p>
                    <SelectGetQuestion style={{padding: "0"}} onChange={e => changeSub(e.target.value)}
                                       value={subject}/>
                    <QuestionsList search={search} subjectS={subject}/>
                </div>
            </main>
            <Footer/>
        </div>
    )
}
export default MainPage