import React, {useEffect, useMemo, useState} from 'react';
import styles from './QuestionPage.module.css'
import Footer from '../../components/footer/Footer';
import MenuBar from "../../components/menuBar/MenuBar";
import {SideBar} from '../../components/sideBar/SideBar';
import {useParams} from 'react-router-dom'
import QuestionsServise from "../../service/QuestionsService";

const QuestionPage = () => {

    let data = []

    const id = useParams().id;
    const [question, setQuestion] = useState({title: "", description: ""});

    useMemo(async () => {
        try {
            const responce = await QuestionsServise.getQuestion(id)
            data = responce.data
            setQuestion(data)
        } catch (e) {
            console.log(e)
        }
        /*await axios.get('http://localhost:2000/question/getQuestion/' + id)
            .then(response => {
                    data = response.data
                    setQuestion(data)
                }
            )
            .catch(error => {
                console.log(error)
            });*/
    }, [setQuestion])

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
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default QuestionPage;