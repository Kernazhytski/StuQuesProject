import React, { useContext, useMemo } from 'react'
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
    const [nickname, setNickname] = useState(JSON.parse(localStorage.getItem('userData')).userData.nickname)
    const [descr, setDescr] = useState(JSON.parse(localStorage.getItem('userData')).userData.aboutMe)
    const [file, setFile] = useState('')

    const edit = async () => {
        if(editMode) {
            const response = await UserService.editProfile(JSON.parse(localStorage.getItem('userData')).userData.id);
            console.log(response)
        }
        
        
        setEditMode(!editMode)
    }
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
                                <input className={styles.fileInp} type="file" value={file} id='avatar' onChange={e => setFile(e.target.value)}/>
                                <label htmlFor='avatar'>
                                    <img className={styles.userAvatarChange} src={process.env.REACT_APP_SERVER_URL + '/' + store.user.avatarImg}/>
                                </label>                            
                            </div>
                        :
                            <img className={styles.userAvatar} src={process.env.REACT_APP_SERVER_URL + '/' + store.user.avatarImg}/>
                        }
                        
                        <div className={styles.userBlock}>
                            {editMode 
                            ?
                                <div className={styles.inpContainer}>
                                    <InputThree value={nickname} changeValue={e => setNickname(e.target.value)} />
                                </div>  
                            :
                                <h2 className={styles.userNickname}>{nickname}</h2>
                            }
                            
                            <ButtonOne width={'200px'} onClick={edit}>
                                {editMode 
                                ?
                                    'Сохранить'
                                :
                                    'Редактировать'
                                }
                            </ButtonOne>

                        </div>
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
                                <TextAreaOne value={descr} onChange={(e) => setDescr(e.target.value)} placeholder='Напишите что-нибудь о себе'/>
                            :
                                <pre>{descr ? descr : <p className={styles.empty}>Здесь пока пусто...</p>}</pre>   
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