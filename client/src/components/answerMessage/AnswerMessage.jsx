import React, {useContext, useMemo, useState} from 'react';
import styles from './AnswerMessage.module.css'
import UserService from "../../service/UserService";
import {Context} from "../../index";
import QuestionsServise from "../../service/QuestionsService";
import {useNavigate} from "react-router-dom";
import PopupEmail from "../UI/notifications/emailNotify/PopupEmail";

const AnswerMessage = ({answer}) => {

    let data = []
    const [user, setUser] = useState([])
    const {store} = useContext(Context);
    const loc = useNavigate();
    const [activeDel,setActiveDel] = useState(false)

    const deleteAnswer = async () => {
        try {
            const responce = await QuestionsServise.deleteAnswer(answer.id)
            console.log(responce)
            setActiveDel(true)
        } catch (e) {
            console.log(e)
        }
    }

    const Click = () => {
        loc('/allUsers/'+user.id)
    }

    const reloadPage = () => {
        window.location.reload()
    }

    useMemo(async () => {
        try {
            const responce = await UserService.authorOfAnswer(answer.userId)
            data = responce.data
            setUser(data)
            console.log(data)
        } catch (e) {
            console.log(e)
        }
    }, [setUser])


    return (
        <div>
            <PopupEmail active={activeDel} setActive={setActiveDel} popupText={"Ответ успешно удален"}
                        locat={'/question/' + answer.questionId} action={reloadPage}/>
            <div className={styles.answerForm}>
                <p className={styles.desc}>{answer.text}</p>
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
                    {store.user.id === answer.userId && <div className={styles.knopkaDel} onClick={deleteAnswer}></div>}
                </div>
            }
        </div>
    );
};

export default AnswerMessage;