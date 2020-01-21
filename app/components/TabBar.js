import React, { Component } from 'react';
import { routeNames } from './navigatorTabs';
import Style from '../helpers/style/style';
import LinearGradient from 'react-native-linear-gradient';
// Components
import { StyleSheet, View, TouchableHighlight, Image } from 'react-native';
import Icon, {iconNames} from './common/Icon/Icon';

export default class TabBar extends Component {

  navigateTo(routeName, params) {
    this.props.navigation.navigate(routeName, params);
  }

  render() {
    return (
      <View style={this.props.style}>
        {/* <View style={{width: '100%', position: 'absolute', bottom: 0, alignItems: 'center', transform: [{translateX: -20}, {translateY: 15}]}}>
          <Image source={require('../assets/tab_bar.png')} />
        </View> */}

        <TouchableHighlight onPress={() => this.navigateTo(routeNames.HOME)} style={styles.tab}>
        {
          (this.props.navigation.state.routes[this.props.navigation.state.index].key==routeNames.HOME) ?
          (<Icon size={Style.sizes.icon} name={iconNames.HOME} color={this.props.activeTintColor} />) :
          (<Icon size={Style.sizes.icon} name={iconNames.HOME} color={this.props.inactiveTintColor} />)
        }
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.navigateTo(routeNames.RECENT_ACTIONS)} style={styles.tab}>
        {
          (this.props.navigation.state.routes[this.props.navigation.state.index].key==routeNames.RECENT_ACTIONS) ?
          (<Icon size={Style.sizes.icon} name={iconNames.TIMER} color={this.props.activeTintColor} />) :
          (<Icon size={Style.sizes.icon} name={iconNames.TIMER} color={this.props.inactiveTintColor} />)
        }
        </TouchableHighlight>
        <View style={styles.plusTabBox}>
          <LinearGradient style={{borderRadius: 999}} colors={[Style.colors.lightMain, Style.colors.darkMain]}>
            {/*<TouchableHighlight onPress={() => this.navigateTo(routeNames.ADD)} style={styles.plusTab}>*/}
            <TouchableHighlight onPress={() => this.navigateTo(routeNames.NAVIGATOR_ADD)} style={styles.plusTab}>
              <Icon size={Style.sizes.icon+5} name={iconNames.PLUS} color={this.props.inactiveTintColor} />
            </TouchableHighlight>
          </LinearGradient>
        </View>
        <TouchableHighlight onPress={() => this.navigateTo(routeNames.GRAPH)} style={styles.tab}>
        {
          (this.props.navigation.state.routes[this.props.navigation.state.index].key==routeNames.GRAPH) ?
          (<Icon size={Style.sizes.icon} name={iconNames.GRAPH} color={this.props.activeTintColor} />) :
          (<Icon size={Style.sizes.icon} name={iconNames.GRAPH} color={this.props.inactiveTintColor} />)
        }
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => this.navigateTo(routeNames.PROFILE)}
          style={styles.tab}
        >
        {
          (this.props.navigation.state.routes[this.props.navigation.state.index].key==routeNames.PROFILE) ?
          (<Icon size={Style.sizes.icon} name={iconNames.AVATAR} color={this.props.activeTintColor} />) :
          (<Icon size={Style.sizes.icon} name={iconNames.AVATAR} color={this.props.inactiveTintColor} />)
        }
        </TouchableHighlight>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 999
  },
  plusTabBox: {
    transform: [
      {translateY: -20}
    ],
    borderRadius: 99,
    backgroundColor: Style.colors.bar,
    padding: 10
  },
  plusTab: {
    padding: 20,
    borderRadius: 999
  }
});
