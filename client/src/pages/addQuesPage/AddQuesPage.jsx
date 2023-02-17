import React, {useState} from 'react'
import axios from 'axios'

import QuestionsServise from "../../service/QuestionsService";

import {useNavigate} from 'react-router-dom'
import MenuBar from "../../components/menuBar/MenuBar";
import {SideBar} from "../../components/sideBar/SideBar";
import Footer from "../../components/footer/Footer";
import InputThree from "../../components/UI/inputs/input3/InputThree";
import TextAreaOne from "../../components/UI/textareas/textarea1/TextAreaOne";
import ButtonOne from "../../components/UI/buttons/button1/ButtonOne";
import SelectAddQuestion from "../../components/UI/selects/selectAddQuestion/selectAddQuestion";
import QuesstionHasBeenSent from "../../components/UI/notifications/questionHasBeenSent/QuesstionHasBeenSent";

import styles from "./AddQues.module.css";
import FileInput from '../../components/UI/inputs/fileInput/FileInput';


export const AddQuesPage = () => {

    let loc = useNavigate();


    const [flag, setFlag] = useState(false)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [subject, setSubject] = useState('Математика')
    const [files, setFiles] = useState([])
    const [userId, setUserId] = useState('1')

    const updateData = (value) => {
        setFiles(value);
    }

    const post = async (e) => {
        e.preventDefault()
        setFlag(true);
        try {
            const response = await QuestionsServise.addQuestion(files,title,description,subject,userId)
            console.log(response)
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
                        <p className={styles.title}>Вопрос</p>
                        <p className={styles.discribtion}>Подробно опишите проблему и что вы делали, чтобы решить ее</p>
                        <TextAreaOne onChange={e => setDescription(e.target.value)} value={description}/>
                        <FileInput update={updateData}/>
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
}
