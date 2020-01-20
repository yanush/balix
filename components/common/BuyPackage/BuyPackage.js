import React, { Component } from 'react';
import { View, ScrollView, Image, TouchableHighlight } from 'react-native';
import Style from 'Style/style';
import { connect } from 'react-redux';
import Package from './Package/Package';
import Icon, { iconNames } from 'Icon/Icon';

class BuyPackage extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarVisible: false
    };
  }

  render() {
    return (
      
      <View style={{flex: 1, position: 'relative', backgroundColor: Style.colors.background}}>
        <Image style={{height: '100%', width: '100%', position: 'absolute', top: 0, left: 0, opacity: 0.1}} source={this.props.userLogin.profileImage} />
        <View>
          <TouchableHighlight onPress={() => this.props.navigation.goBack()} style={{padding: 15}}>
            <Icon name={iconNames.LEFT_CHEVRON} size={25} color={'white'} />
          </TouchableHighlight>
        </View>
        <ScrollView>
          <View style={{width: '100%', alignItems: 'center'}}>
            {
              Packages.map((p, i) => (
                <Package data={p} key={i} />
              ))
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const Packages = [
  { cash: 60, heart: 40, cost: 100 },
  { cash: 50, heart: 25, cost: 75 },
  { cash: 30, heart: 20, cost: 50 },
  { cash: 17, heart: 8, cost: 25 },
  { cash: 10, heart: 6, cost: 16 },
  { cash: 5, heart: 4, cost: 9 },
  { cash: 3, heart: 2, cost: 5 }

];


const mapStateToProps = (state) => {
  return {
    userLogin: state.userLogin
  }
};

export default connect(mapStateToProps)(BuyPackage);