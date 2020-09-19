import React, {Component} from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControl from '../../components/Burger/BuildControl/BuildControl';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinners from '../../components/UI/Spinners/Spinners';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICE = {
    salad: 0.5,
    bacon: 0.7,
    meat: 1.5,
    cheese: 0.4
}



class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 0,
        purchasable: false,
        purchase: false,
        error: false,
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
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString,
        });
    };

    purchaseCancelHandler =()=>{
        this.setState({purchase: false});
    };

    componentDidMount(){
        axios.get('https://burger-builder-fccc7.firebaseio.com/ingredients.json')
            .then(request=>{
                this.setState({ingredients: request.data})
            }).catch(error=>{
                this.setState({error: true});
            });
    };

    render(){
        const disableInfo = {
            ...this.state.ingredients
        };

        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <=0;
        }

        let orderSummary = null;


        
        let burger = this.state.error ? <p>Ingredients can not be loaded.</p>:<Spinners />;
        if (this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControl 
                        ingredientsAdded={this.addIngredientHandler}
                        ingredientsDeducted={this.removeIngredientHandler}
                        disabled = {disableInfo}
                        price = {this.state.totalPrice}
                        purchase = {this.state.purchasable}
                        ordered= {this.purchaseHandler}/>
                </ Aux>); 
                
            orderSummary = <OrderSummary ingredients={this.state.ingredients} 
                    purchaseContinue={this.purchaseContinueHandler}
                    purchaseCancel={this.purchaseCancelHandler}
                    price={this.state.totalPrice}/>;
        };
        if(this.state.loading){
            orderSummary = <Spinners />;
        }

        return(
            <Aux>
                <Modal show={this.state.purchase} clicked={this.modalHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);