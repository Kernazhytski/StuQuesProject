import React, {useContext, useState} from 'react';

import MenuBar from "../../components/menuBar/MenuBar";
import SideBar from '../../components/sideBar/SideBar'
import Footer from "../../components/footer/Footer";

import styles from "./MyQuestions.module.css";
import QuestionsList from "../../components/questionsList/QuestionsList";
import {Context} from "../../index";

import SelectGetQuestion from '../../components/UI/selects/selectGetQuestions/selectGetQuestion';

import {useParams} from "react-router-dom";



const MyQuestions = () => {
    const {store} = useContext(Context);

    const [subject, setSubject] = useState("Все")
    const [search, setSearch] = useState("")

    function changeSearch(value) {
        setSearch(value)
    }

    function changeSub(value) {
        setSubject(value)
    }

    const id = useParams().id;


    return (
        <div className={styles.wrapper}>
            <MenuBar/>
            <main className={styles.main}>
                <SideBar />
                <div className={styles.questions}>

                    <p className={styles.header}>Мои вопросы</p>
                    <SelectGetQuestion style={{padding: "0"}} onChange={e => changeSub(e.target.value)}
                                       value={subject}/>
                    <QuestionsList  user={id} search={search} subjectS={subject}/>

                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default MyQuestions;