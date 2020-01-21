import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableHighlight } from 'react-native';
import { textColor, backgroundColor, lightMainColor, darkMainColor } from '../../../common/style';
import Icon, {iconNames} from '../Icon/Icon';
import { withComma } from '../../../common/numberMethods';
import Svg, { Polygon } from 'react-native-svg';

export default class PhotoIndicator extends Component {
  // Props = [ indicators: {cash: number, hearts: number} ]

  render() {
    return (
      <View style={styles.container}>
        <Svg style={{position: 'absolute', top: 0, left: -50}} height="100" width="100">
          <Polygon
            points="50,0 0,27 50,27"
            fill='rgba(128, 128, 128, 0.4)'
          />
        </Svg>
        <View style={styles.indicatorBox}>
          <View style={styles.iconBox}>
            <Icon name={iconNames.DOLLAR} size={15} color={lightMainColor} />
          </View>
          <Text style={styles.number}>{withComma(this.props.indicators.cash)}</Text>
        </View>
        <View style={styles.indicatorBox}>
          <View style={styles.iconBox}>
            <Icon name={iconNames.HEART} size={15} color={lightMainColor} />
          </View>
          <Text style={{...styles.number, paddingHorizontal: 3}}>{withComma(this.props.indicators.hearts)}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -27,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'rgba(128, 128, 128, 0.4)',
    alignItems: 'center',
    padding: 3,
  },
  indicatorBox: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 5
  },
  iconBox: {
    paddingVertical: 3,
    borderRadius: 999
  },
  number: {
    color: 'white',
    // fontWeight: 'bold',
    fontSize: 15
  },

});
