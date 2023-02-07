import React from 'react';

import styles from "./InputThree.module.css";

const InputThree = (props) => {
    return (
        <input className={styles.inp} type={"text"} {...props}/>
    );
};

export default InputThree;