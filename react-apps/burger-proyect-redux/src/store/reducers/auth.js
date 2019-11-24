import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: '',
    userId: '',
    error: '',
    loading: false,
    authRedirect: '/'
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: '',
                loading: true
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.idToken,
                userId: action.userId,
                error: '',
                loading: false
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: '',
                userId: '',
            };
        case actionTypes.SET_AUTH_REDIRECT:
                return {
                    ...state,
                    authRedirect: action.path
                };
        default:
            return state;
    }
};

export default reducer;