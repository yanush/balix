import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import AddRoutes from './addRoutes';

export default class AddScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarVisible: false
    };
  }
  
  render() {
    return (
      <View style={styles.container}>
        <AddRoutes/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});