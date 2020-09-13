import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Buttons/Button';
import styles from './CheckoutSummary.module.css';


const checkoutSummary =(props)=>{
    return(
        <div className={styles.CheckoutSummary}>
            <h2>Enjoy your burger!!</h2>
            <div style={{width: '100%',}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType='Danger'
                clicked={props.checkoutCanceled}>CANCEL</Button>
            <Button btnType='Success'
                clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;