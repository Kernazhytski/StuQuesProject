import React from 'react';

import styles from './SearchInput.module.css'

const SearchInput = (props) => {
    return (
        <div className={styles.inpCont}>
            <input className={styles.inp} style={{width:props.width}} placeholder={props.placeholder} {...props}/>
            <img className={styles.lupa} src={process.env.REACT_APP_CLIENT_URL + '/static/media/lupa.66643e72e1313d9bbc46.png'}/>
        </div>

    );
};

export default SearchInput;