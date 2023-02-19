import React, { useContext, useMemo, useRef } from 'react'
import {observer} from 'mobx-react-lite'

import { Context } from '../../index'
import InputThree from '../../components/UI/inputs/input3/InputThree'
import styles from './UserPage.module.css'
import MenuBar from '../../components/menuBar/MenuBar'
import { SideBar } from '../../components/sideBar/SideBar'
import Footer from '../../components/footer/Footer'
import ButtonOne from '../../components/UI/buttons/button1/ButtonOne'
import TextAreaOne from '../../components/UI/textareas/textarea1/TextAreaOne'
import { useState } from 'react'
import UserService from '../../service/UserService'

const UserPage = () => {
    const {store} = useContext(Context);
    const[editMode, setEditMode] = useState(false);
    const [nickname, setNickname] = useState('');
    const [descr, setDescr] = useState('');
    const [file, setFile] = useState(null);
    const [oldDescr, setOldDescr] = useState('');
    const [oldNickname, setOldNickname] = useState('');
    const descrMistake = useRef()
    const nicknameMistake = useRef()
    const userImg = useRef()

    let cancell = false


    const checkInfo = (nickname, descr) => {
        let success = true
        if(nickname.length < 3 || nickname.length > 20) {
            nicknameMistake.current.style.display = 'block';
            success = false;
        }
        else {
            nicknameMistake.current.style.display = 'none';
        }
        if(descr.length > 3800) {
            descrMistake.current.style.display = 'block';
            success = false;
        }
        else {
            descrMistake.current.style.display = 'none';
        }
        return success
    }

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
                    console.log(userData)
                    setOldDescr(userData.aboutMe)
                    setOldNickname(userData.nickname)
                }
                store.checkAuth()
                console.log(response)   
                setEditMode(!editMode)             
            }
        }
        else {
            setEditMode(!editMode)
        }
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
    useMemo(() => {
        store.checkAuth2()
        console.log(JSON.parse(localStorage.getItem('userData')))
        if(store.isAuth){
            setNickname(JSON.parse(localStorage.getItem('userData')).userData.nickname)
            setDescr(JSON.parse(localStorage.getItem('userData')).userData.aboutMe)   
            setOldNickname(JSON.parse(localStorage.getItem('userData')).userData.nickname)
            setOldDescr(JSON.parse(localStorage.getItem('userData')).userData.aboutMe)        
        }

    }, [])
    return (
        <div className={styles.wrapper}>
            <MenuBar/>
            <main className={styles.main}>
            <SideBar/>
                <div className={styles.container}>
                    <div className={styles.userInfo}>
                        {editMode 
                        ?
                            <div>
                                <input className={styles.fileInp} type="file" id='avatar' onChange={e => changeImg(e)}/>
                                <label htmlFor='avatar'>
                                    <img className={styles.userAvatarChange} src={process.env.REACT_APP_SERVER_URL + '/' + store.user.avatarImg} ref={userImg}/>
                                </label>                            
                            </div>
                        :
                            <div>
                               <img className={styles.userAvatar} src={process.env.REACT_APP_SERVER_URL + '/' + store.user.avatarImg}  ref={userImg}/> 
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
                                <ButtonOne width={'200px'} onClick={() => edit(nickname, descr)}>Редактировать</ButtonOne>   

                            </div>
                                
                            }
        

                    </div>
                    <div className={styles.userDetailedIndo}>
                        <div className={styles.statistics}>
                            <p className={styles.statisticsText}>Вопросы: <span className={styles.statisticsNumb}>123</span></p>
                            <p className={styles.statisticsText}>Ответы: <span className={styles.statisticsNumb}>123</span></p>
                            <p className={styles.statisticsText}>Лучшие ответы: <span className={styles.statisticsNumb}>123</span></p>
                            <p className={styles.statisticsText}>Баллы: <span className={styles.statisticsNumb}>123</span></p>
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

                </div>            
            </main>
            <Footer/>
        </div>

    )
}

export default observer(UserPage)