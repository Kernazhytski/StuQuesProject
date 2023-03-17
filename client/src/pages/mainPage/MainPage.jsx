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
                    <p className={styles.header}>Вопросы</p>
                    <SelectGetQuestion style={{padding: "0"}} onChange={e => changeSub(e.target.value)}
                                       value={subject}/>
                    <SelectOne options={['Все', 'Решённые', 'Не решённые']} value={criterion}
                               style={{marginLeft: "10px"}}
                               onChange={e => setCriterion(e.target.value)} />
                    <QuestionsList search={search} subjectS={subject} criterion={criterion}/>
                </div>
            </main>
            <Footer/>
        </div>
    )
}
export default MainPage