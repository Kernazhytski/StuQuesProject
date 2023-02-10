import React from 'react'
import Footer from '../../components/footer/Footer';
import MenuBar from "../../components/menuBar/MenuBar";
import { SideBar } from '../../components/sideBar/SideBar';
import QuestionsList from "../../components/questionsList/QuestionsList";

import styles from './MainPage.module.css';

const MainPage = () => {
    return(
        <div className={styles.wrapper}>
            <MenuBar/>
            <main className={styles.main}>
                <SideBar />
                <div className={styles.questions}>
                    <p className={styles.header}>Вопросы</p>
                    <QuestionsList/>
                </div>
            </main>
            <Footer />
        </div>
    )
}
export default MainPage