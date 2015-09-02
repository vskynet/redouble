import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducers from '../stores/index';

import {Router} from 'react-router';
import {history} from 'react-router/lib/BrowserHistory';
import routes from "./routes";

import 'normalize.css';
import 'purecss';
import 'font-awesome/css/font-awesome.css';

console.log("Received state " + JSON.stringify(global.__ISOMORPHIC_STATE__));

const reducer = combineReducers(reducers);
const finalCreateStore = applyMiddleware(thunk)(createStore);
const store = finalCreateStore(reducer, global.__ISOMORPHIC_STATE__);

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			{routes}
		</Router>
	</Provider>,
	document.getElementById('main'));
