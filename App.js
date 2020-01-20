import React, { Component } from 'react';
// Components
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Screen from './components/Screen';
// Redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import combineReducers from './store/store';

const store = createStore(combineReducers);

export default class App extends Component {


  render() {
    return (
      <Provider store={ store }>
        <Screen />
      </Provider>
    );
  }
}


const styles = StyleSheet.create({
});