import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeRoutes from './homeRoutes';
import CashButtons from 'CashButtons/CashButtons';

export default function HomeScreen(props) {
  return (
    <View style={{flex: 1, position: 'relative'}}>
      <HomeRoutes />
      <CashButtons {...props.navigation} />
    </View>
  );
}