import {createStackNavigator} from 'react-navigation-stack';
import Style from '../../helpers/style/style';
import commonRoutes, {commonRoutesName, commonRouteConfig} from '../common/routes/commonRoutes';

export const profileRoutesName = {
	PROFILE_VIEW: 'ProfileView',
	MAIL: 'Mail',
	// PHOTO: 'Photo',
	COMMENTS: 'Comments',
	SEARCH_SCREEN: 'SearchScreen',
};

export default createStackNavigator(
	{
		...commonRoutes,
	},
	{
		// ...commonRouteConfig,
		initialRouteName: commonRoutesName.PROFILE_VIEW,
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: Style.colors.bar,
			},
			headerTintColor: Style.colors.icon,
		},
	},
);
