import React from 'react';
import styles from './Spinners.module.css';

const spinner =(props)=>{
    return(
        <div className={styles.loader}>Loading...</div>
    );
}

export default spinner;