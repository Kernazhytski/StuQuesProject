import React, { useContext, useMemo, useRef, useState } from 'react'
import {observer} from 'mobx-react-lite'
import { Link, useLocation } from 'react-router-dom'

import { Context } from '../../index'
import UserService from '../../service/UserService'
import ButtonOne from '../../components/UI/buttons/button1/ButtonOne'
import TextAreaOne from '../../components/UI/textareas/textarea1/TextAreaOne'
import InputThree from '../../components/UI/inputs/input3/InputThree'

import styles from './UserInfo.module.css';


const UserInfo = ({setFlag1, setFlag2, ban, setBan, userId}) => {
    const {store} = useContext(Context);
    const [file, setFile] = useState(null);
    const [avatarImg, setAvatarImg] = useState('')
    const [oldDescr, setOldDescr] = useState('');
    const [oldNickname, setOldNickname] = useState('');
    const [isMyProfile, setIsMyProfile] = useState(false);
    const [role, setRole] = useState('');
    const[editMode, setEditMode] = useState(false);
    const [nickname, setNickname] = useState('');
    const [descr, setDescr] = useState('');
    const [answers, setAnswers] = useState(0);
    const [questions, setqQuestions] = useState(0);
    const [score, setscore] = useState(0);
    const userImg = useRef()
    const descrMistake = useRef()
    const nicknameMistake = useRef()
    const [rang,setRang] = useState("")
    let cancell = false
    useMemo( async () => {
        store.checkAuth2()
        if(+store.user.id === +userId && store.isAuth){
            console.log(JSON.parse(localStorage.getItem('userData')).userData)
            setNickname(JSON.parse(localStorage.getItem('userData')).userData.nickname)
            setDescr(JSON.parse(localStorage.getItem('userData')).userData.aboutMe) 
            setAnswers(JSON.parse(localStorage.getItem('userData')).userData.userAnswers.length)
            setqQuestions(JSON.parse(localStorage.getItem('userData')).userData.userQuestions.length)  
            setOldNickname(JSON.parse(localStorage.getItem('userData')).userData.nickname)
            setOldDescr(JSON.parse(localStorage.getItem('userData')).userData.aboutMe)  
            setAvatarImg(store.user.avatarImg)
            setBan(store.user.ban)
            setIsMyProfile(true)
            setRang(store.user.rang)
            setscore(store.user.score);
        } 
        else {
            const response = await UserService.getOneUser(+userId);
            setNickname(response.data.nickname)
            setDescr(response.data.aboutMe) 
            setAnswers(response.data.userAnswers.length)
            setqQuestions(response.data.userQuestions.length)  
            setOldNickname(response.data.nickname)
            setOldDescr(response.data.aboutMe)  
            setAvatarImg(response.data.avatarImg)
            setBan(response.data.ban)
            setRole(response.data.role)
            setRang(response.data.rang)
            setIsMyProfile(false)
            setscore(response.data.score)
        }
    }, [useLocation().pathname.split('/').reverse()[0]])
    const edit = async (nickname, descr) => {
        if(editMode) {
            const check = checkInfo(nickname, descr)
            if(cancell) {
                setDescr(oldDescr)
                setNickname(oldNickname)
                setFile(null)
                store.checkAuth()
                setEditMode(!editMode) 
            }
            else if(check) {
                const response = await UserService.editProfile(store.user.id, file, nickname, descr);
                if(response.data.success) {
                    const userData = await store.updateUser()
                    setOldDescr(userData.aboutMe)
                    setOldNickname(userData.nickname)
                    setAvatarImg(store.user.avatarImg)
                }
                store.checkAuth()
                setEditMode(!editMode)             
            }
        }
        else {
            setEditMode(!editMode)
        }
    }
    const checkInfo = (nickname, descr) => {
        let success = true
        if(nickname.length < 3 || nickname.length > 20) {
            nicknameMistake.current.style.display = 'block';
            success = false;
        }
        else {
            nicknameMistake.current.style.display = 'none';
        }
        if(descr?.length > 3800) {
            descrMistake.current.style.display = 'block';
            success = false;
        }
        else {
            descrMistake.current.style.display = 'none';
        }
        return success
    }
    const changeImg = (e) => {
        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0]);
        setFile(e.target.files[0])
        reader.onload = () => {
            userImg.current.src = reader.result
            console.log(userImg.current)
            console.log(reader.result)
        }
    }
    const popup1Open = () => {
        setFlag1(true)
    }
    const popup2Open = () => {
        setFlag2(true)
    }
    return (
        <div>
            <div className={styles.userInfo}>
                {editMode 
                ?
                    <div>
                        <input className={styles.fileInp} type="file" id='avatar' onChange={e => changeImg(e)}/>
                        <label htmlFor='avatar'>
                            <img className={styles.userAvatarChange} src={process.env.REACT_APP_SERVER_URL + '/' + avatarImg} ref={userImg}/>
                        </label>                            
                    </div>
                :
                    <div>
                        <img className={styles.userAvatar} src={process.env.REACT_APP_SERVER_URL + '/' + avatarImg}  ref={userImg}/> 
                    </div>
                }
                {editMode 
                ?
                    <div className={styles.userBlock}>
                        <div className={styles.inpContainer}>
                            <p className={styles.mistake} ref={nicknameMistake}>Никнейм должен содержать от 3 до 20 символов.</p>
                            <InputThree value={nickname} changeValue={e => setNickname(e.target.value)} />
                        </div>
                        <div className={styles.btnCont}>
                            <ButtonOne 
                                width={'200px'} 
                                onClick={() => {
                                    cancell = false
                                    edit(nickname, descr)
                            }}>
                                Сохранить
                            </ButtonOne> 
                            <ButtonOne 
                                width={'200px'} 
                                onClick={() => {
                                    cancell = true
                                    edit(nickname, descr)
                            }}>
                                Отменить
                            </ButtonOne>                                 
                        </div>                               
                    </div>
                    :
                    <div className={styles.userBlock}>
                        <h2 className={styles.userNickname}>{nickname}</h2>
                        {isMyProfile
                        ? 
                            <ButtonOne width={'200px'} onClick={() => edit(nickname, descr)}>Редактировать</ButtonOne>   
                        :
                            null
                        }
                        {store.user.role == 'ADMIN' && !isMyProfile && !ban && role !== 'ADMIN'
                            ?
                                <ButtonOne 
                                    width={'200px'} 
                                    onClick={() => {
                                        popup1Open()
                                    }}>
                                        Забанить
                                </ButtonOne>   
                            :
                                null
                        }   
                        {store.user.role == 'ADMIN' && !isMyProfile && ban
                            ?
                                <ButtonOne 
                                    width={'200px'} 
                                    onClick={() => {
                                        popup2Open()
                                    }}>
                                        Разбанить
                                </ButtonOne>   
                            :
                                null
                        }  
                    </div>
                    }
            </div>    
            {ban
            ? <p className={styles.banUserMessage}>Данный пользователь заблокирован</p>
            :
                <div className={styles.userDetailedInfo}>
                <div className={styles.statistics}>
                    <Link to={'/myQuestions/'+userId}><p className={styles.statisticsText}>Вопросы: <span className={styles.statisticsNumb}>{questions}</span></p></Link>
                    <Link to={'/myAnswers/'+userId}><p className={styles.statisticsText}>Ответы: <span className={styles.statisticsNumb}>{answers}</span></p></Link>
                    <p className={styles.statisticsText}>Звание: <span className={styles.statisticsNumb}>{rang}</span></p>
                    <p className={styles.statisticsText}>Баллы: <span className={styles.statisticsNumb}>{score}</span></p>
                </div>
                <div className={styles.descrContainer}>
                    <p className={styles.aboutMe}>О себе: </p>
                    {editMode 
                    ?
                        <div>
                            <p className={styles.mistake} ref={descrMistake}>Описание не должно превышать 3800 символов.</p>
                            <TextAreaOne value={descr} onChange={(e) => setDescr(e.target.value)} placeholder='Напишите что-нибудь о себе'/>                                
                        </div>
                    :
                        <p className={styles.description}>{descr ? descr : <span className={styles.empty}>Здесь пока пусто...</span>}</p>   
                    }                                                                     
                </div>                
            </div>
            }                    
        </div>
    )
}

export default observer(UserInfo)