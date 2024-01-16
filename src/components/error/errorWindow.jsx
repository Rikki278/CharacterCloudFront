import React from 'react';
import styles from './errorWindow.module.css'

const ErrorWindow = ({text})=>{

    return (
        <div className={styles['error-window']}>
            <h2>{text[0]}</h2>
            <p>{text[1]}</p>
        </div>
    );
};

export default ErrorWindow;
