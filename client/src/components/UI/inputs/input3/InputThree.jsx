import React from 'react';

import styles from "./InputThree.module.css";

const InputThree = (props) => {
    return (
        <input className={styles.inp} type={"text"} width={props.width} value={props.value} onChange={props.changeValue}/>
    );
};

export default InputThree;