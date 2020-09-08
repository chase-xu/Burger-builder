import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Buttons/Button';


const orderSummary =(props)=>{

    const ingredientSummary = Object.keys(props.ingredients)
        .map(keys=>{
            return <li key={keys}><span style={{textTransform: 'capitalize'}}>{keys}</span>: {props.ingredients[keys]}</li>
        });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
    <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout</p>
            <Button btnType='Danger' clicked={props.purchaseCancel}>CANCEL</Button>
            <Button btnType='Success' clicked={props.purchaseContinue}>CONTINUE</Button>
        </Aux>
    );
}

export default orderSummary;