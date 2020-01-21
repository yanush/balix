import {createStackNavigator} from 'react-navigation-stack';

import Home from './Home';
import commonRoutes, {commonRouteConfig} from '../common/routes/commonRoutes';
import Style from '../../helpers/style/style';

export const routeNames = {
	HOME: 'Home',
	COMMENTS: 'Comments',
	MAIL: 'Mail',
};

export default createStackNavigator(
	{
		...commonRoutes,
		[routeNames.HOME]: {
			screen: Home,
		},
	},
	{
		// ...commonRouteConfig,
		initialRouteName: routeNames.HOME,
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: Style.colors.bar,
			},
			headerTintColor: Style.colors.icon,
		},
	},
);
