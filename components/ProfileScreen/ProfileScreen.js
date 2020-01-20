import React, { Component } from 'react';
import { View } from 'react-native';
import ProfilScreenRoutes from './profilRoutes';
import CashButtons from 'CashButtons/CashButtons';

export default class ProfileScreen extends Component {

  render() {
    return (
      <View style={{flex:1}}>
        <ProfilScreenRoutes />
        <CashButtons {...this.props.navigation}/>
      </View>
    );
  }
}
