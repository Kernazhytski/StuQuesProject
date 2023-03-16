import React, {useContext, useState} from 'react';

import MenuBar from "../../components/menuBar/MenuBar";
import SideBar from '../../components/sideBar/SideBar'
import Footer from "../../components/footer/Footer";

import styles from "./MyAnswersPage.module.css";
import QuestionsList from "../../components/questionsList/QuestionsList";

import SelectGetQuestion from '../../components/UI/selects/selectGetQuestions/selectGetQuestion';
import {useParams} from "react-router-dom";

const MyAnswersPage = () => {
    const [subject, setSubject] = useState("Все")
    const [search, setSearch] = useState("")
    const id = useParams().id;
    function changeSearch(value) {
        setSearch(value)
    }

    function changeSub(value) {
        setSubject(value)
    }


    return (
        <div className={styles.wrapper}>
            <MenuBar  changeS={changeSearch}/>
            <main className={styles.main}>
                <SideBar />
                <div className={styles.answers}>

                    <p className={styles.header}>Мои ответы</p>
                    <SelectGetQuestion style={{padding: "0"}} onChange={e => changeSub(e.target.value)}
                                       value={subject}/>
                    <QuestionsList  user={id} search={search} subjectS={subject}/>

                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default MyAnswersPage;