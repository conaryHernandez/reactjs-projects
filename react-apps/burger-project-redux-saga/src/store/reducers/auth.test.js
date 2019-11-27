import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: '',
            userId: '',
            error: '',
            loading: false,
            authRedirect: '/'
        });
    });


    it('should store the token upon login', () => {
        expect(reducer({
            token: '',
            userId: '',
            error: '',
            loading: false,
            authRedirect: '/'
        }, { 
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'some-token',
            userId: 'some-user-id'
         })).toEqual({
            token: 'some-token',
            userId: 'some-user-id',
            error: '',
            loading: false,
            authRedirect: '/'
        });
    })
});
