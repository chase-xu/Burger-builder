import styles from './Control.module.css';
import React from 'react';

const control =(props)=>{
    return(
        <div className={styles.Control}>
            <div className={styles.Label}>{props.label}</div>
            <button 
                className={styles.Less}    
                onClick={props.removed} 
                disabled={props.disabled}>
                Less
            </button>
            <button 
                className={styles.More} 
                onClick={props.added}>
                More
            </button>
        </div>
    );
}

export default control;