import React from 'react';
import styles from './BuildControl.module.css';
import Control from './Control/Control';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Meat', type: 'meat'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
];


const buildControl =(props)=>(
        <div className={styles.BuildControl}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctr => (
                 <Control key={ctr.label} label={ctr.label}
                    added = {()=>props.ingredientsAdded(ctr.type)}
                    removed = {()=>props.ingredientsDeducted(ctr.type)}
                    disabled={props.disabled[ctr.type]}/>
            ))}
            <button className={styles.OrderButton} disabled={!props.purchase} onClick={props.ordered}>ORDER NOW</button>
        </div>
)

export default buildControl;