import React, { Component } from 'react';
// Components
import { StyleSheet, View, ScrollView } from 'react-native';
import RecentActionsRoutes from './RecentActionsRoutes';
import CashButtons from 'CashButtons/CashButtons';

export default class RecentActionsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => <Header {...navigation} />,
    };
  }

  render() {
    return (
      <View style={{flex:1}}>
        <RecentActionsRoutes />
        <CashButtons {...this.props.navigation} />
      </View>
    );
  }
}