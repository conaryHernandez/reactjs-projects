import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

const initalState = {
    ingredients: {},
    totalPrice: 0,
    error: false,
    building: false,
};

const reducer = (state = initalState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                building: true,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
                return {
                    ...state,
                    ingredients: {
                        ...state.ingredients,
                        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                    },
                    building: true,
                    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
                };
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: 0,
                building: false,
            };
            case actionTypes.FETCH_INGREDIENTS_FAIL:
                return {
                    ...state,
                    error: true
                };
        default:
            return state;
        }
};

export default reducer;