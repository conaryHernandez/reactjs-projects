// listen action and do smething
import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

import { logoutSaga, checkAuthTimeoutSaga, authSaga, authCheckStateSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';

export function* watchAll() {
    // AUTH
    // "all" for concurrency of multiple tasks
    yield all([
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga), // take every action of this type and execure this saga
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_USER, authSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)    
    ]);

    // BURGER BUIDLER
    yield takeEvery(actionTypes.INIT_INGREDIENTS_CHECK, initIngredientsSaga);

    // ORDER
    // cancel previous executions
    yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}