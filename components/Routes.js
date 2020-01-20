import { createBottomTabNavigator } from 'react-navigation-tabs';
import Style from 'Style/style';
import HomeScreen from 'HomeScreen/HomeScreen';
import ProfileScreen from 'ProfileScreen/ProfileScreen';
import React from 'react';
import { createAppContainer } from 'react-navigation';
import TabBar from 'components/TabBar';
import GraphScreen from 'GraphScreen/GraphScreen';
import AddScreen from 'AddScreen/AddScreen';
import RecentActionsScreen from 'RecentActionsScreen/RecentActionsScreen';
import BuyPackage from 'BuyPackage/BuyPackage';
import WithdrawScreen from 'WithdrawScreen/WithdrawScreen';
import LiveScreen from 'LiveScreen/LiveScreen';
import StoryScreen from 'StoryScreen/StoryScreen';

export const routeNames = {
  HOME: 'HomeScreen',
  PROFIL: 'ProfileScreen',
  GRAPH: 'GraphScreen',
  ADD: 'AddScreen',
  RECENT_ACTIONS: 'RecentActionsScreen',
  BUY_PACKAGE: 'BuyPackage',
  WITHDRAW_SCREEN: 'WithdrawScreen',
  LIVE_SCREEN: 'LiveScreen',
  STORY_SCREEN: 'StoryScreen'
}

const Routes = createBottomTabNavigator(
    {
      [routeNames.HOME]: {
        screen: HomeScreen
      },
      [routeNames.PROFIL]: {
        screen: ProfileScreen
      },
      [routeNames.GRAPH]: {
        screen: GraphScreen
      },
      [routeNames.ADD]: {
        screen: AddScreen
      },
      [routeNames.RECENT_ACTIONS]: {
        screen: RecentActionsScreen
      },
      [routeNames.BUY_PACKAGE]: {
        screen: BuyPackage
      },
      [routeNames.WITHDRAW_SCREEN]: {
        screen: WithdrawScreen
      },
      [routeNames.LIVE_SCREEN]: {
        screen: LiveScreen
      },
      [routeNames.STORY_SCREEN]: {
        screen: StoryScreen
      }
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
          height: Style.sizes.barHeight
        }
      }
    }
  );

  export default createAppContainer(Routes);