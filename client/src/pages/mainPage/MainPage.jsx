import React, {useState} from 'react'
import Footer from '../../components/footer/Footer';
import MenuBar from "../../components/menuBar/MenuBar";
import SideBar from '../../components/sideBar/SideBar'
import QuestionsList from "../../components/questionsList/QuestionsList";

import styles from './MainPage.module.css';
import SelectGetQuestion from "../../components/UI/selects/selectGetQuestions/selectGetQuestion";
import SelectOne from "../../components/UI/selects/selectOne/SelectOne";

const MainPage = () => {

    const [subject, setSubject] = useState("Все")
    const [search, setSearch] = useState("")
    const [criterion, setCriterion] = useState('Все');

    function changeSearch(value) {
        localStorage.setItem('allQuestionsPages', 1)
        setSearch(value)
    }
    function changeCriterion(value) {
        localStorage.setItem('allQuestionsPages', 1)
        setCriterion(value)
    }
    function changeSub(value) {
        console.log(1)
        localStorage.setItem('allQuestionsPages', 1)
        setSubject(value)
    }

    return (
        <div className={styles.wrapper}>
            <MenuBar changeS={changeSearch}/>
            <main className={styles.main}>
                <SideBar/>
                <div className={styles.questions}>
                    <p className={styles.header}>Вопросы</p>
                    <SelectGetQuestion style={{padding: "0"}} onChange={e => changeSub(e.target.value)}
                                       value={subject}/>
                    <SelectOne options={['Все', 'Решённые', 'Не решённые']} value={criterion}
                               onChange={e => changeCriterion(e.target.value)} />
                    <QuestionsList search={search} subjectS={subject} criterion={criterion}/>
                </div>
            </main>
            <Footer/>
        </div>
    )
}
export default MainPage