import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import {withRouter} from 'react-router-dom';

const burger =(props)=>{
    let ingredients = Object.keys(props.ingredients).map(ikey =>{
            return [...Array(props.ingredients[ikey])].map((_, i)=>{
              return  <BurgerIngredient key={ikey + i} type={ikey} />;
            });
        }).reduce((arr, element)=>{
            return arr.concat(element);
        }, []);
    if(ingredients.length === 0){
        ingredients = <p>Please start to add ingredients.</p>
    }
    return(
        <div className={styles.Burger}>
            <BurgerIngredient type='bread-top' />
            {ingredients}
            <BurgerIngredient type='bread-bottom' />

        </div>
    );
};

export default withRouter(burger);