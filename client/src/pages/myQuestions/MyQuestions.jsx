import React from 'react';
import styles from "./MyQuestions.module.css";
import MenuBar from "../../components/menuBar/MenuBar";
import {SideBar} from "../../components/sideBar/SideBar";
import Footer from "../../components/footer/Footer";

const MyQuestions = () => {
    return (
        <div className={styles.wrapper}>
            <MenuBar/>
            <main className={styles.main}>
                <SideBar />
                <div className={styles.questions}>

                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default MyQuestions;