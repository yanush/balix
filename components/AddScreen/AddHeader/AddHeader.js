import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import Style from 'Style/style';
import Icon, { iconNames } from 'Icon/Icon';
import AppNavigator from '../../AppNavigator';

export default class AddHeader extends Component {

    onBack() {
      AppNavigator.getRef()._navigation.goBack();
    }
      
  render() {
    return (
        <View style={styles.container}>
            <View style={styles.leftSide}>
              <TouchableHighlight style={{borderRadius: 999}} onPress={this.onBack.bind(this)}>
                <Icon style={{padding: 5}} name={iconNames.CLOSE} size={Style.sizes.icon} color={Style.colors.icon} />
              </TouchableHighlight>
            </View>
            {/* <View style={styles.rightSide}>
              <TouchableHighlight style={{borderRadius: 999}} onPress={() => this.props.onFlash()}>
                  <Icon style={{padding: 5}} name={iconNames.FLASH} size={Style.sizes.icon} color={Style.colors.icon} />
              </TouchableHighlight>
            </View> */}
        </View>
    );
  }
}  

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: Style.sizes.barHeight,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%'
  }
});