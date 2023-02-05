import React from 'react';

import StyleButton from './ButtonOne.module.css'

const ButtonOne = ({children,...props}) => {
    return (
        <button className={StyleButton.but} style={{width:props.width}}>{children}</button>
    );
};

export default ButtonOne;