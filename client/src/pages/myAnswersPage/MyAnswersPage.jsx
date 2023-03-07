import React, {useContext} from 'react';

import MenuBar from "../../components/menuBar/MenuBar";
import SideBar from '../../components/sideBar/SideBar'
import Footer from "../../components/footer/Footer";

import styles from "./MyAnswersPage.module.css";
import QuestionsList from "../../components/questionsList/QuestionsList";
import {Context} from "../../index";
import { observer } from 'mobx-react-lite';
import {useParams} from "react-router-dom";

const MyAnswersPage = () => {
    const {store} = useContext(Context);
    const id = useParams().id;

    return (
        <div className={styles.wrapper}>
            <MenuBar/>
            <main className={styles.main}>
                <SideBar />
                <div className={styles.answers}>
                    <p className={styles.header} style={{display: "inline-block", marginRight: "10px"}}>Мои ответы</p>
                    <QuestionsList user={id} />
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default observer(MyAnswersPage);