import React from 'react';
import styles from './Contacts.module.css'
import MenuBar from "../../components/menuBar/MenuBar";
import SideBar from "../../components/sideBar/SideBar";
import Footer from "../../components/footer/Footer";

const Contacts = () => {
    return (
        <div className={styles.wrapper}>
            <MenuBar/>
            <main className={styles.main}>
                <SideBar/>
                <div className={styles.questions}>
                    <p className={styles.header} style={{display: "inline-block", marginRight: "10px"}}>Контакты</p>

                    <table className={styles.tablePhoto}>
                        <tr>
                            <td align={"center"} className={styles.tr}><div className={styles.photo1}/></td>
                            <td align={"center"} className={styles.tr}><div className={styles.photo2}/></td>
                        </tr>
                        <tr>
                            <td align={"center"} className={styles.tr}>Керножицкий Андрей</td>
                            <td align={"center"} className={styles.tr}>Гуринович Илья</td>
                        </tr>
                        <tr>
                            <td align={"center"} className={styles.tr}>Разработчик</td>
                            <td align={"center"} className={styles.tr}>Разработчик</td>
                        </tr>
                        <br/>
                        <tr>
                            <td align={"center"} className={styles.tr}>+375 25 663 55 16</td>
                            <td align={"center"} className={styles.tr}>+375 44 587 85 06</td>
                        </tr>
                        <br/>
                        <tr>
                            <td align={"center"} className={styles.tr}>LinkedIn: linkedin.com/in/kernazhytski/</td>
                            <td align={"center"} className={styles.tr}>LinkedIn: linkedin.com/in/илья-гуринович-066738259/</td>
                        </tr>
                    </table>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default Contacts;