
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import Home from './Home/Home';
import commonRoutes, { commonRouteConfig } from 'Routes/commonRoutes';
import Style from 'Style/style';

export const routeNames = {
  HOME: 'Home',
  COMMENTS: 'Comments',
  MAIL: 'Mail',
}

const Routes = createStackNavigator(
    {
      ...commonRoutes,
      [routeNames.HOME]: {
        screen: Home
      }
    },
    {
      ...commonRouteConfig,
      initialRouteName: routeNames.HOME,
      defaultNavigationOptions: {
          headerStyle: {
              backgroundColor: Style.colors.bar
          },
          headerTintColor: Style.colors.icon
      }
    }
  );

  export default createAppContainer(Routes);