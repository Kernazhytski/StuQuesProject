import React from 'react';
import QuestionLink from "../questionLink/QuestionLink";

import styles from "./QuestionsList.module.css"

const QuestionsList = () => {
    return (
        <div className={styles.spis}>
          <QuestionLink/>
        </div>
    );
};

export default QuestionsList;