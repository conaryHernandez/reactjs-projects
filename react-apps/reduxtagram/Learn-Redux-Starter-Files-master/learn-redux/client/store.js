import { createStore, compse } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';

import { browserHistory } from  'react-router';

//route reducer
import rootReducer from './reducers/index';

import comments from './data/comments';
import posts from './data/posts';

const defaultState = {
	posts,
	comments
};

const store = createStore(rootReducer, defaultState);

export const history = syncHistoryWithStore(browserHistory, store);

if(module.hot) {
	module.hot.accept('./reducers/', () => {
		const nextRootReducer = require('./reducers/index').default;
		store.replaceReducer(nextRootReducer);
	});
}
///history es para que react router tenga un track de como nos estamos moviendo
//redux se puede definir como un gran objeto o una base de datos vacia donde podemos guardar toda la data de nuestra
//aplicacion y no tener diferentes states dispersos por diferentes states
//action en redux es algo que pasa en nuestra aplicacion
//action son objetos que tienen dos cosas como el type y el index
//los reducer son para manejar el state
export default store;