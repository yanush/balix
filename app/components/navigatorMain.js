import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Style from '../helpers/style/style';
import NavigatorTabs from './navigatorTabs';
import LiveScreen from './common/LiveScreen/LiveScreen';
import NavigatorAdd from './AddScreen/navigatorAdd';

export const routeNames = {
  NAVIGATOR_TABS: 'NavigatorTabs',
	NAVIGATOR_ADD: 'NavigatorAdd',
  LIVE_SCREEN: 'LiveScreen',
};

export default createAppContainer(createStackNavigator(
  {
    [routeNames.NAVIGATOR_TABS]: {
      screen: NavigatorTabs,
    },
		[routeNames.NAVIGATOR_ADD]: {
			// screen: AddScreen
			screen: NavigatorAdd,
		},
    [routeNames.LIVE_SCREEN]: {
      screen: LiveScreen,
    },
  },
  {
		mode: 'modal', //must be modal for transparent background
		headerMode: 'none',
    initialRouteName: routeNames.NAVIGATOR_TABS,
    defaultNavigationOptions: {
			gestureEnabled: false,
			cardShadowEnabled: false,
			animationEnabled: false,
    },
  },
));
