import { delay } from 'redux-saga/effects';
import { put, call } from 'redux-saga/effects';
import * as actions from '../actions';
import axios from 'axios';

export function * logoutSaga(action) {
    // useful to test and mock
    yield call([sessionStorage, 'removeItem'], 'token');
    yield call([sessionStorage, 'removeItem'], 'expirationDate');
    yield call([sessionStorage, 'removeItem'], 'userId');

    yield put(actions.logoutSucceed());
};

export function * checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);

    console.log('here?', action.expirationTime * 1000);

    yield put(actions.logout());
}

export function * authSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDVg546hgs5YItCjlOBmFlaaDzbXxM7CLI';

    if (!action.isSignUp) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDVg546hgs5YItCjlOBmFlaaDzbXxM7CLI';
    }

    try {
        const response = yield axios.post(url, authData);

        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
    
        yield sessionStorage.setItem('token', response.data.idToken);
        yield sessionStorage.setItem('expirationDate', expirationDate);
        yield sessionStorage.setItem('userId', response.data.localId);
        yield put(actions.authSuccess(response.data.idToken, response.data.localId))
        yield put(actions.checkAuthTimeout(response.data.expiresIn))
            
    } catch (error) {
        yield put(actions.authFail(error.response.data.error));        
    }
}

export function* authCheckStateSaga(action) {
    const token = yield sessionStorage.getItem("token");
    if (!token) {
      yield put(actions.logout());
    } else {
      const expirationDate = yield new Date(
        sessionStorage.getItem("expirationDate")
      );
      if (expirationDate <= new Date()) {
        yield put(actions.logout());
      } else {
        const userId = yield sessionStorage.getItem("userId");
        yield put(actions.authSuccess(token, userId));
        yield put(
          actions.checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  }