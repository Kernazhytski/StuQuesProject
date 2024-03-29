import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import styles from './QuestionPage.module.css'
import Footer from '../../components/footer/Footer';
import MenuBar from "../../components/menuBar/MenuBar";

import PhotoPopap from "../../components/UI/notifications/photoPop/PhotoPopap";
import SideBar from '../../components/sideBar/SideBar';
import {useNavigate, useParams} from 'react-router-dom'

import QuestionsServise from "../../service/QuestionsService";
import {Context} from "../../index";
import ButtonOne from "../../components/UI/buttons/button1/ButtonOne";
import TextAreaOne from "../../components/UI/textareas/textarea1/TextAreaOne";
import PopupEmail from "../../components/UI/notifications/emailNotify/PopupEmail";
import AnswerList from "../../components/answersList/AnswerList";
import FileInput from "../../components/UI/inputs/fileInput/FileInput";

const QuestionPage = () => {

    let data = []


    const {store} = useContext(Context);

    const [active, setActive] = useState(false)
    const [activeAns, setActiveAns] = useState(false)
    const id = useParams().id;
    const [question, setQuestion] = useState({title: "", description: ""});
    const [answer, setAnswer] = useState("")
    const [answerS, setAnswerS] = useState()
    const [files, setFiles] = useState([])
    const [activePhoto, setActivePhoto] = useState(false)
    const [imgURL, setImgURL] = useState("")
    const [isAns,setIsAns] = useState(true)
    const [role,setRole] = useState(store.user.role)
    const [userId,setUserId] = useState(0)
    const [idStore,setIdStore] = useState(store.user.id)


    const answerMistake = useRef();

    const update = (images) => {
        setFiles(images)
    }

    useMemo(async () => {
        await store.checkAuth3();
        setIsAns(question.isAnswered)
        setRole(store.user.role)
        setIdStore(store.user.id)
        setUserId(question.userId)
    })

    useMemo(async () => {
        try {
            const responce1 = await QuestionsServise.getQuestion(id)
            data = responce1.data
            setQuestion(data)
        } catch (e) {
            console.log(e)
        }
    }, [setQuestion])

    useMemo(async () => {
        try {
            const responce3 = await QuestionsServise.getAnswers(id)
            data = responce3.data
            setAnswerS(data)
        } catch (e) {
            console.log(e)
        }
    }, [setAnswerS])

    const deleteQuestion = async () => {
        try {
            const responceDel = await QuestionsServise.delQuestion(id)
            setActive(true)
        } catch (e) {
            console.log(e)
        }
    }
    const checkAnswer = () => {
        if (answer.length < 5 || answer.length > 3800) {
            answerMistake.current.style.display = 'block'
            return false
        } else {
            answerMistake.current.style.display = 'none'
            return true
        }
    }
    const clickPhoto = (url) => {
        setActivePhoto(true);
        setImgURL(url);
    }

    const sendAnswer = async () => {
        try {
            setActiveAns(true)
            const responce2 = await QuestionsServise.addAnswer(answer, question.id, store.user.id, files)
        } catch (e) {
            console.log(e)
        }
    }

    const reloadPage = () => {
        window.location.reload()
    }

    return (
        <div className={styles.wrapper}>
            <PopupEmail active={activeAns} setActive={setActiveAns} popupText={"Ответ успешно отправлен"}
                        locat={'/question/' + id} action={reloadPage}/>

            <PopupEmail active={active} setActive={setActive} popupText={"Вопрос успешно удален"} locat={'/'}/>

            <PhotoPopap active={activePhoto} setActive={setActivePhoto} imageURL={imgURL}/>
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
                                     onClick={event => {
                                         clickPhoto(process.env.REACT_APP_SERVER_URL + '/' + id + '/' + image);
                                     }}
                                     src={process.env.REACT_APP_SERVER_URL + '/' + id + '/' + image}/>
                            )
                        }
                    </div>
                    {
                        answerS?.length > 0 &&
                        <div>
                            <p className={styles.header}>Ответы</p>
                            <AnswerList answers={answerS} question={question}/>
                        </div>
                    }
                    {
                        ((isAns !== true || role === "ADMIN") && idStore !== undefined) &&
                        <div>
                            {
                                (userId === idStore || role === "ADMIN")
                                &&
                                <div>
                                    <p className={styles.header}>Действия с вопросом:</p>
                                    <ButtonOne onClick={deleteQuestion} width={"200px"}>Удалить вопрос</ButtonOne>
                                </div>
                            }
                            {
                                (userId !== idStore &&
                                    isAns !== true)
                                &&
                                <div>
                                    <p className={styles.header}>Напишите ответ:</p>
                                    <div className={styles.txtAreaCont}>
                                        <p className={styles.mistake} ref={answerMistake}>Ответ должен содержать от 5 до
                                            3800 символов</p>
                                        <TextAreaOne onChange={e => setAnswer(e.target.value)} value={answer}/>
                                    </div>
                                    <div className={styles.fileInpCont}><FileInput update={update}/></div>
                                    <ButtonOne marginTop={"10px"} onClick={() => {
                                        const response = checkAnswer();
                                        if (response) {
                                            sendAnswer()
                                        } else {
                                            answerMistake.current.style.display = 'block'
                                        }
                                    }}
                                               width={"125px"}>Отправить</ButtonOne>
                                </div>
                            }


                        </div>
                    }
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default QuestionPage;