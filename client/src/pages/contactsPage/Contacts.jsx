import React from 'react';
import styles from './Contacts.module.css'
import MenuBar from "../../components/menuBar/MenuBar";
import SideBar from "../../components/sideBar/SideBar";
import Footer from "../../components/footer/Footer";
import photo1 from '../../assets/pictures/developers/Mine.jpg'
import photo2 from "../../assets/pictures/developers/Ilya.jfif"
const Contacts = () => {
    return (
        <div className={styles.wrapper}>
            <MenuBar/>
            <main className={styles.main}>
                <SideBar/>
                <div className={styles.questions}>
                    <p className={styles.header} style={{display: "inline-block", marginRight: "10px"}}>Контакты</p>

                    <div className={styles.contacts}>
                        <div className={styles.contact}>
                            <div align={"center"}>
                                <img className={styles.photo} src={photo1} alt="" />
                            </div>
                            
                            <div align={"center"} className={styles.tr}>Керножицкий Андрей</div>
                            <div align={"center"} className={styles.tr}>Разработчик</div>
                            <div align={"center"} className={styles.tr}>+375 25 663 55 16</div>
                            <div align={"center"} className={styles.tr}>LinkedIn: linkedin.com/in/kernazhytski/</div>
                        </div>
                        <div className={styles.contact}>
                        <div align={"center"}>
                                <img className={styles.photo} src={photo2} alt="" />
                            </div>
                            <div align={"center"} className={styles.tr}>Гуринович Илья</div>
                            <div align={"center"} className={styles.tr}>Разработчик</div>
                            <div align={"center"} className={styles.tr}>+375 44 587 85 06</div>
                            <div align={"center"} className={styles.tr}>LinkedIn: linkedin.com/in/илья-гуринович-066738259/</div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default Contacts;