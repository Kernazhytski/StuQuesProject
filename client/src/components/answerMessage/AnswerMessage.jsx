import React, {useContext, useEffect, useMemo, useState} from 'react';
import styles from './AnswerMessage.module.css'
import UserService from "../../service/UserService";
import {Context} from "../../index";
import QuestionsServise from "../../service/QuestionsService";
import {useNavigate} from "react-router-dom";
import PopupEmail from "../UI/notifications/emailNotify/PopupEmail";
import ButtonOne from "../UI/buttons/button1/ButtonOne";

const AnswerMessage = ({answer, question}) => {

    let data = []
    const [user, setUser] = useState([])
    const {store} = useContext(Context);
    const loc = useNavigate();
    const [activeDel, setActiveDel] = useState(false)
    const [color, setColor] = useState("#FEF9C7")

    const deleteAnswer = async () => {
        try {
            const responce = await QuestionsServise.deleteAnswer(answer.id)
            console.log(responce)
            setActiveDel(true)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (answer.isBest === true) {
            setColor('#9FEDD7')
        } else {
            setColor("#FEF9C7")
        }
    }, [answer])

    const Click = () => {
        loc('/allUsers/' + user.id)
    }

    const reloadPage = () => {
        window.location.reload()
    }

    useMemo(async () => {
        try {
            const responce = await UserService.authorOfAnswer(answer.userId)
            data = responce.data
            setUser(data)
        } catch (e) {
            console.log(e)
        }
    }, [setUser])

    const setBest = async () => {
        try {
            const responce = await QuestionsServise.setBest(answer.id);
            reloadPage();
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            {answer.isBest === true && <p className={styles.header}>Лучший ответ</p>}
            <PopupEmail active={activeDel} setActive={setActiveDel} popupText={"Ответ успешно удален"}
                        locat={'/question/' + answer.questionId} action={reloadPage}/>
            <div className={styles.answerForm} style={{background: color}}>
                <p className={styles.desc}>{answer.text}
                    {(store.user.id === question.userId && question.isAnswered !== true) &&
                        <ButtonOne width={"125px"} height={"50px"} float={"right"} onClick={setBest}>Отметить
                            лучшим</ButtonOne>}</p>
                {
                    answer.files != undefined &&
                    answer.files.map((image, index) =>
                        <img key={index} className={styles.imgSmall}
                             src={process.env.REACT_APP_SERVER_URL + '/answers/' + answer.id + '/' + image}/>
                    )
                }

            </div>

            <h1 className={styles.date}>Ответ был
                дан {answer.createdAt.substring(0, 10)} в {answer.createdAt.substring(11, 19)}</h1>
            {
                user !== [] &&
                <div style={{display: "inline-block", float: "right"}}>
                    <img className={styles.userImg} src={process.env.REACT_APP_SERVER_URL + '/' + user.avatarImg}
                         onClick={Click}/>
                    <h1 className={styles.nickname} onClick={Click}>{user.nickname}</h1>
                    {(store.user.id === answer.userId && answer.isBest !== true) &&
                        <div className={styles.knopkaDel} onClick={deleteAnswer}></div>}
                </div>
            }
        </div>
    );
};

export default AnswerMessage;