import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Style from '../helpers/style/style';
import NavigatorHome from './HomeScreen/navigatorHome';
import NavigatorProfile from './ProfileScreen/navigatorProfile';
import TabBar from './TabBar';
import NavigatorGraph from './GraphScreen/navigatorGraph';
import NavigatorAdd from './AddScreen/navigatorAdd';
import RecentActionsScreen from './RecentActionsScreen/RecentActionsScreen';
import BuyPackage from './common/BuyPackage/BuyPackage';
import WithdrawScreen from './common/WithdrawScreen';
import LiveScreen from './common/LiveScreen/LiveScreen';
import StoryScreen from './common/StoryScreen';

export const routeNames = {
  HOME: 'HomeScreen',
  PROFILE: 'ProfileScreen',
  GRAPH: 'GraphScreen',
  ADD: 'AddScreen',
  NAVIGATOR_ADD: 'NavigatorAdd',
  RECENT_ACTIONS: 'RecentActionsScreen',
  BUY_PACKAGE: 'BuyPackage',
  WITHDRAW_SCREEN: 'WithdrawScreen',
  LIVE_SCREEN: 'LiveScreen',
  STORY_SCREEN: 'StoryScreen',
};

export default createBottomTabNavigator(
  {
    [routeNames.HOME]: {
      // screen: HomeScreen
      screen: NavigatorHome,
    },
    [routeNames.PROFILE]: {
      // screen: ProfileScreen
      screen: NavigatorProfile,
    },
    [routeNames.GRAPH]: {
      // screen: GraphScreen
      screen: NavigatorGraph,
    },
    // [routeNames.ADD]: {
    //   // screen: AddScreen
    //   screen: NavigatorAdd,
    // },
    [routeNames.RECENT_ACTIONS]: {
      screen: RecentActionsScreen,
    },
    [routeNames.BUY_PACKAGE]: {
      screen: BuyPackage,
    },
    [routeNames.WITHDRAW_SCREEN]: {
      screen: WithdrawScreen,
    },
    // [routeNames.LIVE_SCREEN]: {
    //   screen: LiveScreen,
    // },
    [routeNames.STORY_SCREEN]: {
      screen: StoryScreen,
    },
  },
  {
    initialRouteName: routeNames.HOME,
    tabBarComponent: props => (
      <TabBar {...props} />
    ),
    // lazy: false,
    tabBarOptions: {
      inactiveTintColor: Style.colors.icon,
      activeTintColor: Style.colors.lightMain,
      style: {
        backgroundColor: Style.colors.bar,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: Style.sizes.barHeight,
      },
    },
  },
);
