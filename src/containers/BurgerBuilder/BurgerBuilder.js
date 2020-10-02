import React, {Component} from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControl from '../../components/Burger/BuildControl/BuildControl';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinners from '../../components/UI/Spinners/Spinners';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';





class BurgerBuilder extends Component {
    state = {
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
        return sum > 0;
    }

   
    modalHandler =()=>{
        this.setState({purchase: false});
    }

    purchaseContinueHandler =()=>{
        this.props.history.push('/checkout'
        );
    };

    purchaseCancelHandler =()=>{
        this.setState({purchase: false});
    };

    componentDidMount(){
        // axios.get('https://burger-builder-fccc7.firebaseio.com/ingredients.json')
        //     .then(request=>{
        //         this.setState({ingredients: request.data})
        //     }).catch(error=>{
        //         this.setState({error: true});
        //     });
    };

    render(){
        const disableInfo = {
            ...this.props.ings
        };

        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <=0;
        }

        let orderSummary = null;


        
        let burger = this.state.error ? <p>Ingredients can not be loaded.</p>:<Spinners />;
        if (this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControl 
                        ingredientsAdded={this.props.onIngredientAdded}
                        ingredientsDeducted={this.props.onIngredientRemoved}
                        disabled = {disableInfo}
                        price = {this.props.price}
                        purchase = {this.updatePurchaseState(this.props.ings)}
                        ordered= {this.purchaseHandler}/>
                </ Aux>); 
                
            orderSummary = <OrderSummary ingredients={this.props.ings} 
                    purchaseContinue={this.purchaseContinueHandler}
                    purchaseCancel={this.purchaseCancelHandler}
                    price={this.props.price}/>;
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
    };
}

const mapDispatchToProps = dispatch =>{
    return {
        onIngredientAdded: (ingName)=> dispatch({type: actionTypes.ADD_INGREDIENTS, ingredientName: ingName}),
        onIngredientRemoved: (ingName)=> dispatch({type: actionTypes.REMOVE_INGREDIENTS, ingredientName: ingName})

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));