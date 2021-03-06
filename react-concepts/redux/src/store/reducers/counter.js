import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    counter: 0,
    results: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INCREMENT:
            return {
                ...state,
                counter: state.counter + 1,
            };
        case actionTypes.DECREMENT:
            return {
                ...state,
                counter: state.counter - 1,
            };
        case actionTypes.ADD:
            return {
                ...state,
                counter: state.counter + action.val,
            };
        case actionTypes.SUBSTRACT:
            return updateObject(state, {
                counter: state.counter - action.val
            })
        default:
            return state;
    }
}

export default reducer;