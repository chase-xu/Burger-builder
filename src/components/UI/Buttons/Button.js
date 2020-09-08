import React from 'react';
import styles from './Button.module.css';

const button =(props)=>{
   return <button className={[styles.Button, styles[props.btnType]]} onClick={props.clicked}>{props.children}</button>;
};


export default button;