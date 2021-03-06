import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Style from '../helpers/style/style';
import NavigatorTabs from './navigatorTabs';
import LiveScreen from './common/LiveScreen/LiveScreen';
import StoryScreen from './common/StoryScreen';
import NavigatorAdd from './AddScreen/navigatorAdd';
import Routes from './Routes';
import BuyPackage from './common/BuyPackage/BuyPackage';
import WithdrawScreen from './common/WithdrawScreen';

export default createAppContainer(createStackNavigator(
  {
    [Routes.Navigators.TABS.routeName]: {
      screen: NavigatorTabs,
    },
		[Routes.Navigators.ADD.routeName]: {
			screen: NavigatorAdd,
		},
    [Routes.Screens.LIVE.routeName]: {
      screen: LiveScreen,
    },
    [Routes.Screens.STORY.routeName]: {
      screen: StoryScreen
    },
    [Routes.Screens.BUY_PACKAGE.routeName]: {
      screen: BuyPackage
    },
    [Routes.Screens.WITHDRAW.routeName]: {
      screen: WithdrawScreen
    }
  },
  {
		mode: 'modal', //must be modal for transparent background
		headerMode: 'none',
    initialRouteName: Routes.Navigators.TABS.routeName,
    defaultNavigationOptions: {
			gestureEnabled: false,
			cardShadowEnabled: false,
			animationEnabled: false,
    },
  },
));
