import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Style from 'Style/style';
import Icon, {iconNames} from 'Icon/Icon';
import { withComma } from '../../../../common/numberMethods';

export default class CashIndicator extends Component {

  plusPress() {
    this.props.openTabs();
  }

  render() {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <View style={styles.box}>
              <Icon color={darkMainColor} name={iconNames.MONEY_BAG} size={17}/>
              <Text style={styles.number}>{withComma(this.props.cash)}</Text>
              <TouchableHighlight onPress={this.plusPress.bind(this)} style={{borderRadius: 999, padding: 3, backgroundColor: darkMainColor, position: 'absolute', right: -8}}>
                <Icon name={iconNames.PLUS} size={8} color={'white'} />
              </TouchableHighlight>
            </View>
            <View style={{justifyContent: 'center', flexDirection: 'row', alignItems: 'center', margin: 3}}>
              <Icon color={darkMainColor} name={iconNames.HEART} size={14}/>
              <Text style={{...styles.number, fontSize: 10}}>{withComma(this.props.hearts)}</Text>
            </View> */}

            <View style={{}}>
              <View style={{flexDirection: 'row', alignItems: 'center', padding: 2, margin: 2, borderBottomColor: 'gray', borderBottomWidth: 1}}>
                <Icon name={iconNames.MONEY_BAG} size={15} color={Style.colors.lightMain} />
                <Text style={styles.number}>{withComma(this.props.cash)}</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', padding: 2, margin: 2}}>
                <Icon name={iconNames.HEART} size={15} color={Style.colors.lightMain} />
                <Text style={{...styles.number, fontSize: 10}}>{withComma(this.props.hearts)}</Text>
              </View>
            </View>
            <TouchableHighlight onPress={this.plusPress.bind(this)} style={{borderRadius: 999, padding: 3, backgroundColor: Style.colors.lightMain}}>
              <Icon name={iconNames.PLUS} size={8} color={'white'} />
            </TouchableHighlight>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: 'black',
        borderRadius: 99,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 2,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems: 'center'
    },
    number: {
        color: Style.colors.text,
        fontSize: 13,
        letterSpacing: 1,
        marginLeft: 3,
        fontWeight: 'bold'
    },
});