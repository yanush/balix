import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Animated } from 'react-native';
import Style from '../../../helpers/style/style';
import { connect } from 'react-redux';
import RequestPass from './RequestPass/RequestPass';
import { routeNames } from '../../navigatorTabs';

class CashButtons extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAuthBox: false,
      authError: ''
    }
    this.dropDownBottom = new Animated.Value(-200);
  }

  checkPassword(pass) {
    if(pass == this.props.userLogin.password) {
      this.setState({ authError: '', showAuthBox: false });
      this.navigateTo(routeNames.WITHDRAW_SCREEN);
    } else {
      this.setState({ authError: 'Password wrong' })
    }
  }

  navigateTo(routeName) {
    this.props.navigate(routeName);
  }

  openDropDown() {
      Animated.spring(this.dropDownBottom, {
        toValue: 56
      }).start();
  }

  closeDropDown() {
    Animated.spring(this.dropDownBottom, {
        toValue: -200
    }).start();
  }

  componentDidUpdate() {
    if(this.props.showButtons) {
        this.openDropDown();
    } else {
      this.closeDropDown();
    }
  }

  render() {
    return (
        <Animated.View style={{...styles.dropDownBox, transform: [ {translateY: this.dropDownBottom} ]}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableHighlight onPress={() => this.navigateTo(routeNames.BUY_PACKAGE)} style={styles.dropDownButton}>
              <Text style={{color: Style.colors.text, letterSpacing: 1}}>Buy Cash</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this.setState({ showAuthBox: !this.state.showAuthBox })} style={styles.dropDownButton}>
              <Text style={{color: Style.colors.text, letterSpacing: 1}}>Get Your Money</Text>
            </TouchableHighlight>
          </View>
          {
            (this.state.showAuthBox) ?
            (
              <RequestPass error={this.state.authError} onConfirm={this.checkPassword.bind(this)} />
            ) : (<View></View>)
          }

        </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
    dropDownBox: {
      position: 'absolute',
      left: 0,
      width: '50%',
      zIndex: 999,
      top: 0
    },
    dropDownButton: {
      padding: 6,
      marginHorizontal: 5,
      height: 30,
      backgroundColor: Style.colors.darkMain,
      alignItems: 'center',
      position: 'relative',
      zIndex: 999
    }
});

const mapStateToProps = (state) => {
    return {
      showButtons: state.cashButtons.showButtons,
      userLogin: state.userLogin
    }
  };

  export default connect(mapStateToProps)(CashButtons);
