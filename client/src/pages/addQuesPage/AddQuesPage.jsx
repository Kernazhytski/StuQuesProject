import React from 'react'
import styles from "./AddQues.module.css";
import MenuBar from "../../components/menuBar/MenuBar";
import {SideBar} from "../../components/sideBar/SideBar";
import Footer from "../../components/footer/Footer";
import InputThree from "../../components/UI/inputs/input3/InputThree";
import TextAreaOne from "../../components/UI/textareas/textarea1/TextAreaOne";
import ButtonOne from "../../components/UI/buttons/button1/ButtonOne";
import SelectAddQuestion from "../../components/UI/selects/selectAddQuestion/selectAddQuestion";

export const AddQuesPage = () => {
  return (
      <div className={styles.wrapper}>
        <MenuBar/>
        <main className={styles.main}>
          <SideBar />
          <div className={styles.addPanel}>
            <p className={styles.header}>Задать вопрос</p>
            <div className={styles.enterForm}>
                <p className={styles.title}>Заголовок</p>
                <p className={styles.discribtion}>Вкратце опишите суть проблемы</p>
                <InputThree/>
                <p className={styles.title}>Вопрос</p>
                <p className={styles.discribtion}>Подробно опишите проблему и что вы делали, чтобы решить ее</p>
                <TextAreaOne/>
                <p className={styles.title}>Предмет</p>
                <p className={styles.discribtion}>Выберите учебный предмет, к которому относится этот вопрос</p>
                <SelectAddQuestion/>
            </div>
              <ButtonOne width={"125px"}>Отправить</ButtonOne>
          </div>
        </main>
        <Footer />
      </div>
  )
}
