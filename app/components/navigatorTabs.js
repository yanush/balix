import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Style from '../helpers/style/style';
import NavigatorHome from './HomeScreen/navigatorHome';
import NavigatorProfile from './ProfileScreen/navigatorProfile';
import TabBar from './TabBar';
import NavigatorGraph from './GraphScreen/navigatorGraph';
import NavigatorPhoto from './PhotoScreen/navigatorPhoto';
import NavigatorRecentActions from './RecentActionsScreen/navigatorRecentActions';
import Routes from './Routes';
import NavigatorMail from './common/Mail/navigatorMail';
import NavigatorSearch from './common/Search/navigatorSearch';

export default createBottomTabNavigator(
  {
    [Routes.Navigators.HOME.routeName]: {
      screen: NavigatorHome,
    },
    [Routes.Navigators.PROFILE.routeName]: {
      screen: NavigatorProfile,
    },
    [Routes.Navigators.GRAPH.routeName]: {
      screen: NavigatorGraph,
    },
    [Routes.Navigators.RECENT_ACTIONS.routeName]: {
      screen: NavigatorRecentActions,
    },
    [Routes.Navigators.PHOTO.routeName]: {
      screen: NavigatorPhoto
    },
    [Routes.Navigators.MAIL.routeName]: {
      screen: NavigatorMail
    },
    [Routes.Navigators.SEARCH.routeName]: {
        screen: NavigatorSearch
    },
  },
  {
    initialRouteName: Routes.Navigators.HOME.routeName,
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
