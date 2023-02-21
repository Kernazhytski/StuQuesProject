import React, {useContext, useEffect, useMemo, useState} from 'react';
import styles from './QuestionPage.module.css'
import Footer from '../../components/footer/Footer';
import MenuBar from "../../components/menuBar/MenuBar";
import {SideBar} from '../../components/sideBar/SideBar';
import {useParams} from 'react-router-dom'
import QuestionsServise from "../../service/QuestionsService";
import {Context} from "../../index";
import ButtonOne from "../../components/UI/buttons/button1/ButtonOne";
import TextAreaOne from "../../components/UI/textareas/textarea1/TextAreaOne";

const QuestionPage = () => {

    let data = []

    const {store} = useContext(Context);

    const id = useParams().id;
    const [question, setQuestion] = useState({title: "", description: ""});
    const [answer, setAnswer] = useState("")


    useMemo(async () => {
        try {
            const responce1 = await QuestionsServise.getQuestion(id)
            data = responce1.data
            setQuestion(data)
        } catch (e) {
            console.log(e)
        }
    }, [setQuestion])

    const deleteQuestion = () => {

    }

    const sendAnswer = async () => {
        try {
            const responce2 = await QuestionsServise.addAnswer(answer,question.id,store.user.id)
            console.log(responce2)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={styles.wrapper}>
            <MenuBar/>
            <main className={styles.main}>
                <SideBar/>
                <div className={styles.questionPad}>
                    <p className={styles.header}>{question.title}</p>
                    <div className={styles.questionForm}>
                        <p className={styles.desc}>{question.description}</p>
                        {
                            question.files != undefined &&
                            question.files.map((image, index) =>
                                <img key={index} className={styles.imgSmall}
                                     src={process.env.REACT_APP_SERVER_URL + '/' + id + '/' + image}/>
                            )
                        }
                    </div>
                    {
                        question.userId === store.user.id
                            ?
                            <div>
                                <p className={styles.header}>Действия с вопросом:</p>
                                <ButtonOne onClick={deleteQuestion} width={"200px"}>Удалить вопрос</ButtonOne>
                            </div>
                            :
                            <div>
                                <p className={styles.header}>Напишите ответ:</p>
                                <TextAreaOne onChange={e => setAnswer(e.target.value)} value={answer}/>
                                <ButtonOne onClick={sendAnswer} width={"125px"}>Отправить</ButtonOne>
                            </div>
                    }
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default QuestionPage;