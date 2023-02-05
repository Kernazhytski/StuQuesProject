import React from 'react';

import StyleButton from './ButtonOne.module.css'

const ButtonOne = ({children,width}) => {
    return (
        <button className={StyleButton.but} style={{width}}>{children}</button>
    );
};

export default ButtonOne;