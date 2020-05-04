import React from 'react';

import { render } from 'react-dom';

import css from './styles/style.styl';

import App from './components/App';
import Single from './components/Single';
import PhotoGrid from './components/PhotoGrid';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

import Raven from 'raven-js';
import { sentry_url } from './data/config';

Raven.config(sentry_url, {
	tags: {
		git_commit: 'test',
		userLevel: 'editor'
	}
}).install();

// logException(new Error('Download failed!'), {
// 	email.'wesbos@gmail.com'
// });
// Raven.captureMessage('Something bad happened!');
// Raven.showReportDialog();

const router = (
	<Provider store={store}>
		<Router history={ history }>
			<Route path="/" component={App}>
				<IndexRoute component={PhotoGrid}></IndexRoute>
				<Route path="/view/:postId" component={Single}>
				</Route>
			</Route>
		</Router>
	</Provider>
);

render(router, document.getElementById('root'));