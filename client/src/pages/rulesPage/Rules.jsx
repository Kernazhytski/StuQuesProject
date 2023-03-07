import React from 'react';
import styles from './Rules.module.css'
import MenuBar from "../../components/menuBar/MenuBar";
import SideBar from "../../components/sideBar/SideBar";
import Footer from "../../components/footer/Footer";

const Rules = () => {
    return (
        <div className={styles.wrapper}>
            <MenuBar/>
            <main className={styles.main}>
                <SideBar/>
                <div className={styles.questions}>
                    <p className={styles.header} style={{display: "inline-block", marginRight: "10px"}}>Правила</p>
                    <p className={styles.text1}>1. Правила задачи вопроса</p>
                    <p className={styles.text2}>а. Запрещено употребление неформативной лексики без надобности в задачи
                        заголовка и описании вопроса</p>
                    <p className={styles.text2}>б. Звголовок должен содержать четкое определение вопроса.</p>
                    <p className={styles.text2}>в. Описание вопроса должно иметь как можно больше информации и иметь
                        четкую формулировку.</p>

                    <p className={styles.text1}>2. Правила ответа на вопрос</p>
                    <p className={styles.text2}>а. Запрещено употребление неформативной лексики без надобности в
                        ответе</p>
                    <p className={styles.text2}>б. Звголовок должен содержать четкое определение вопроса.</p>
                    <p className={styles.text2}>в. Описание вопроса должно иметь как можно больше информации и иметь
                        четкую формулировку.</p>

                    <p className={styles.text1}>3. Правила удаления вопроса\ответа или бана пользователя</p>
                    <p className={styles.text2}>а. Пользователь может удалить только свой вопрос, если не отметил ответ
                        лучшим</p>
                    <p className={styles.text2}>б. Пользователь может удалить только свой ответ, если вопрос не был
                        отмечен лучшим</p>
                    <p className={styles.text2}>в. Админ может удалить вопрос\ответ, если были не соблюдены правила в
                        пунктах 1 и 2</p>
                    <p className={styles.text2}>г. Админ может забанить пользователя за неоднократное нарушение правил
                        1и 2</p>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default Rules;