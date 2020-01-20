import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, Animated } from 'react-native';
import Style from 'Style/style';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeMenuStatus } from 'Store/sideMenu/menuActions';
import { handleSearch } from 'Store/search/searchActions';
import { toggleButtons } from 'Store/cashButtons/cashButtonsActions';
import Icon, {iconNames} from 'Icon/Icon';
import CashIndicator from './CashIndicator/CashIndicator';
import { commonRoutesName } from 'Routes/commonRoutes';

class Header extends Component {

  constructor(props) {
    super(props);
    
    this.openInputAnim = new Animated.Value(0);
    this.opacityInput = new Animated.Value(0);
    this.openIconBox = new Animated.Value(0);
    this.iconOpacity = new Animated.Value(1);
    this.iconWidth = new Animated.Value(70);
  }


  componentDidMount() {
    if(this.props.state.routeName === commonRoutesName.SEARCH_SCREEN) {
      this.startInputAnimation();
    }
    if(this.props.state.routeName == commonRoutesName.PROFILE_VIEW && this.props.getParam('userData') && this.props.getParam('userData').userId != this.props.userLogin.userId) {
      Animated.parallel([
        Animated.timing(this.iconOpacity, {
          toValue: 0
        }),
        Animated.timing(this.iconWidth, {
          toValue: 0
        })
      ]).start();
    }
  }


  startInputAnimation() {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.iconOpacity, {
          toValue: 0
        }),
        Animated.timing(this.iconWidth, {
          toValue: 0
        })
      ]),
      Animated.parallel([
        Animated.timing(this.opacityInput, {
          toValue: 1
        }),
        Animated.timing(this.openInputAnim, {
          toValue: 85
        }),
        Animated.timing(this.openIconBox, {
          toValue: 1
        })
      ])
    ]).start();
  }

  toggleMenu() {
    this.props.changeMenuStatus();
  }

  navigateTo(routeName) {
    this.props.navigate(routeName);
  }

  render() {
    return (
      <View style={{width: '100%'}}>
        <View style={styles.header}>
          <View style={styles.rightSide}>
            {
              (this.props.state.routeName === commonRoutesName.SEARCH_SCREEN) ? 
              (
              <View style={styles.searchBox}>
                <Animated.View style={
                  {
                    ...styles.inputBox, 
                    width: this.openInputAnim.interpolate({
                      inputRange: [0, 85],
                      outputRange: ['0%', '85%']  
                    }),
                    paddingHorizontal: this.openInputAnim.interpolate({
                      inputRange: [0, 85],
                      outputRange: [0, 10]                      
                    }),
                    opacity: this.opacityInput
                  }}>
                  <TextInput autoFocus value={this.props.wordSearch} onChangeText={(text) => this.props.handleSearch(text)} style={styles.input}/>
                </Animated.View>
                <Animated.View style={{
                    ...styles.searchIconBox, 
                    backgroundColor: this.openIconBox.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['rgba(125,125,125,0)', 'gray']
                    })
                  }}>
                  <Icon color={Style.colors.icon} name={iconNames.SEARCH} size={Style.sizes.icon} style={styles.icon}/>
                </Animated.View>
              </View>
              ) :
              (
              <TouchableHighlight onPress={this.navigateTo.bind(this, commonRoutesName.SEARCH_SCREEN)}>
                <Icon color={Style.colors.icon} name={iconNames.SEARCH} size={Style.sizes.icon} style={styles.icon}/>
              </TouchableHighlight>
              )
            }
              <Animated.View style={{
                opacity: this.iconOpacity, 
                maxWidth: this.iconWidth
                }}
              >
                <TouchableHighlight onPress={this.navigateTo.bind(this, commonRoutesName.MAIL)}>
                  <Icon color={Style.colors.icon} name={iconNames.LETTER} size={Style.sizes.icon} style={styles.icon}/>
                </TouchableHighlight>  
              </Animated.View>    
            <TouchableHighlight onPress={this.toggleMenu.bind(this)}>
              <Icon color={Style.colors.icon} name={iconNames.MENU} size={Style.sizes.icon} style={styles.icon}/>
            </TouchableHighlight>
          </View>
          <Animated.View style={{...styles.leftSide, opacity: this.iconOpacity}}>
            {
              (this.props.state.routeName == commonRoutesName.PROFILE_VIEW && this.props.getParam('userData') && this.props.getParam('userData').userId == this.props.userLogin.userId ) ?
              (<View></View>) :
              (<CashIndicator openTabs={this.props.toggleButtons.bind(this)} cash={this.props.userLogin.cash} hearts={this.props.userLogin.hearts} />)
            }
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    header: {
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      backgroundColor: Style.colors.bar,
      top: 0,
      zIndex: 2,
      overflow: 'visible'
    },
    rightSide: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    leftSide: {
      marginLeft: 10,
      alignItems: 'center',
      flexDirection: 'row'
    },
    cashBox: {
      backgroundColor: 'black',
      borderRadius: 99,
      flexDirection: 'row',
      paddingHorizontal: 10,
      paddingVertical: 5,
      alignItems: 'center'
    },
    cash: {
      color: Style.colors.text,
      fontSize: 16,
      letterSpacing: 1,
      marginLeft: 3
    },
    icon: {
      margin: 10
    },


    searchIconBox: {
      padding: 2,
      borderRadius: 999
    },
    searchBox: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center', 
      flexDirection: 'row'
    },
    inputBox: {
      height: '80%',
      alignItems: 'flex-end',
      borderTopLeftRadius: 999,
      borderBottomLeftRadius: 999,
      backgroundColor: Style.colors.background,
      transform: [
        {translateX: 10}
      ]
    },
    input: {
      width: '100%',
      height: '90%',
      borderTopLeftRadius: 999,
      borderBottomLeftRadius: 999,
      color: Style.colors.text,
      fontSize: 14,
      backgroundColor: Style.colors.background
    }
});

const mapStateToProps = (state) => {
  return {
    userLogin: state.userLogin,
    wordSearch: state.search.wordSearch
  }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    changeMenuStatus,
    handleSearch,
    toggleButtons
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Header);