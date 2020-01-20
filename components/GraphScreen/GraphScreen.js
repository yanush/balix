import React, { Component } from 'react';
// Components
import { View } from 'react-native';
import GraphScreenRoutes from './graphRoutes';
import CashButtons from 'CashButtons/CashButtons';

export default class GraphScreen extends Component {

  render() {
    return (
        <View style={{flex:1}}>
          <GraphScreenRoutes />
          <CashButtons {...this.props.navigation}/>
        </View>
    );
  }
}