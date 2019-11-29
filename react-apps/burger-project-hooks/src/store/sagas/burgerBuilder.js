import { put } from 'redux-saga/effects';
import * as actions from '../actions';
import axios from '../../axios-orders';

export function * initIngredientsSaga(action) {
    const response = yield axios.get('/ingredients.json')
    
    try {
        yield put(actions.setIngredients(response.data));
    } catch (error) {
        yield put(actions.fetchIngredientsFail())
    }
}