import * as actionTypes from './actions';

const intialSate = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
    },
    totalPrice: 0,
}
const INGREDIENTS_PRICE = {
    salad: 0.5,
    bacon: 0.7,
    meat: 1.5,
    cheese: 0.4
}

const reducer = (state= intialSate, action) =>{
    switch(action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENTS:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]

            };
        default:
            return state;
    }
};

export default reducer;