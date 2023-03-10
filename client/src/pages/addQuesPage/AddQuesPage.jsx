import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'

import QuestionsServise from "../../service/QuestionsService";


import {useNavigate} from 'react-router-dom'
import MenuBar from "../../components/menuBar/MenuBar";
import SideBar from '../../components/sideBar/SideBar'
import Footer from "../../components/footer/Footer";
import InputThree from "../../components/UI/inputs/input3/InputThree";
import TextAreaOne from "../../components/UI/textareas/textarea1/TextAreaOne";
import ButtonOne from "../../components/UI/buttons/button1/ButtonOne";
import SelectAddQuestion from "../../components/UI/selects/selectAddQuestion/selectAddQuestion";
import QuesstionHasBeenSent from "../../components/UI/notifications/questionHasBeenSent/QuesstionHasBeenSent";

import styles from "./AddQues.module.css";
import FileInput from '../../components/UI/inputs/fileInput/FileInput';
import {Context} from "../../index";
import {observer} from 'mobx-react-lite';


export const AddQuesPage = observer(() => {

    let loc = useNavigate();

    const {store} = useContext(Context);

    const [flag, setFlag] = useState(false)
    const [succes1, setSuccess1] = useState("none")
    const [succes2, setSuccess2] = useState("none")

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [subject, setSubject] = useState('Математика')
    const [files, setFiles] = useState([])
    const [userId, setUserId] = useState(store.user.id)

    const updateData = (value) => {
        setFiles(value);
    }

    useEffect(() =>{
        if(!store.isAuth) loc('/login');
    } ,[])

    const post = async (e) => {
        e.preventDefault()
        try {
            if (title.length < 10 || title.length > 120) {
                setSuccess1("block")
                return
            }
            if (description.length < 30 || description.length > 3800) {
                setSuccess2("block")
                return
            }
            await QuestionsServise.addQuestion(files, title, description, subject, userId)
            store.updateUser()
            setFlag(true);
            setSuccess1("none")
            setSuccess2("none")
        } catch (e) {
            console.log(e)
        }
    }

    const c = (e) => {
        setSubject(e.target.value)
    }

    return (
        <div className={styles.wrapper}>
            <MenuBar/>


            <main className={styles.main}>


                <QuesstionHasBeenSent active={flag} setActive={setFlag}/>


                <SideBar/>
                <form className={styles.addPanel}>
                    <p className={styles.header}>Задать вопрос</p>
                    <div className={styles.enterForm}>
                        <p className={styles.title}>Заголовок</p>
                        <p className={styles.discribtion}>Вкратце опишите суть проблемы</p>
                        <InputThree changeValue={e => setTitle(e.target.value)} value={title}/>

                        <p className={styles.mistake} style={{display: succes1}}>Заголовок должен содержать от 10 до 120
                            символов.</p>

                        <p className={styles.title}>Вопрос</p>
                        <p className={styles.discribtion}>Подробно опишите проблему и что вы делали, чтобы решить ее</p>
                        <TextAreaOne onChange={e => setDescription(e.target.value)} value={description}/>
                        <p className={styles.mistake} style={{display: succes2}}>Описание должно содержать от 30 до 3800
                            символов.</p>
                        <div className={styles.fileCont}>
                            <FileInput update={updateData}/>
                        </div>

                        <p className={styles.title}>Предмет</p>
                        <p className={styles.discribtion}>Выберите учебный предмет, к которому относится этот вопрос</p>
                        <SelectAddQuestion onChange={e => c(e)} value={subject.value}/>
                    </div>

                    <ButtonOne onClick={post} width={"125px"}>Отправить</ButtonOne>

                </form>
            </main>
            <Footer/>
        </div>
    )
})
