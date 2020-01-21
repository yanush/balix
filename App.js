import React, {Component} from 'react';
// Components
import Screen from './app/components/Screen';
// Redux
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import combineReducers from './app/store/store';

const store = createStore(combineReducers);

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Screen/>
			</Provider>
		);
	}
}
