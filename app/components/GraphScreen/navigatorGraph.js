import {createStackNavigator} from 'react-navigation-stack';
import Graph from './Graph/Graph';
import commonRoutes from '../common/routes/commonRoutes';
import Style from '../../helpers/style/style';

export const graphRoutesName = {
	GRAPH: 'Graph',
	MAIL: 'Mail',
	PROFILE_VIEW: 'ProfileView',
};

export default createStackNavigator(
	{
		...commonRoutes,
		[graphRoutesName.GRAPH]: {
			screen: Graph,
		},
	},
	{
		// ...commonRouteConfig,
		initialRouteName: graphRoutesName.GRAPH,
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: Style.colors.bar,
			},
			headerTintColor: Style.colors.icon,
		},
	},
);
