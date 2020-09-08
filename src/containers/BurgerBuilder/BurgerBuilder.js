import React, {Component} from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControl from '../../components/Burger/BuildControl/BuildControl';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENTS_PRICE = {
    salad: 0.5,
    bacon: 0.7,
    meat: 1.5,
    cheese: 0.4
}



class BurgerBuilder extends Component {
    state = {
        ingredients:{
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 0,
        purchasable: false,
        purchase: false,
    }

    purchaseHandler = () =>{
        this.setState({purchase: true});
    }

    updatePurchaseState =(ingredients)=>{
        const sum = Object.keys(ingredients)
        .map(keys=>(ingredients[keys]))
        .reduce((sum, el)=>{
            return sum + el;
        }, 0);
        this.setState({purchasable: sum > 0})
    }

    addIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCount;
        const priceAddition = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = priceAddition + oldPrice;
        this.setState({ingredients: updateIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updateIngredients);
    }
    removeIngredientHandler =(type)=>{
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0){
            return;
        }
        const updateCount = oldCount - 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCount;
        const priceAddition = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({ingredients: updateIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updateIngredients);
    }
    modalHandler =()=>{
        this.setState({purchase: false});
    }

    purchaseContinueHandler =()=>{
        alert('You continued');
    }
    purchaseCancelHandler =()=>{
        this.setState({purchase: false})
    }
    render(){
        const disableInfo = {
            ...this.state.ingredients
        };

        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <=0;
        }


        return(
            <Aux>
                <Modal show={this.state.purchase} clicked={this.modalHandler}>
                    <OrderSummary ingredients={this.state.ingredients} 
                        purchaseContinue={this.purchaseContinueHandler}
                        purchaseCancel={this.purchaseCancelHandler}
                        price={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControl 
                    ingredientsAdded={this.addIngredientHandler}
                    ingredientsDeducted={this.removeIngredientHandler}
                    disabled = {disableInfo}
                    price = {this.state.totalPrice}
                    purchase = {this.state.purchasable}
                    ordered= {this.purchaseHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;