import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from './SelectOne.module.css'

const SelectOne = (props) => {
    return (
        <select className={styles.inp} {...props} required={true} >
            {props.options.map(option => <option key={uuidv4()}>{option}</option>)}
        </select>
    );
};

export default SelectOne;