import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Style from 'Style/style';
import commonRoutes, { commonRoutesName, commonRouteConfig } from 'Routes/commonRoutes';

export const profileRoutesName = {
    PROFILE_VIEW: 'ProfileView',
    MAIL: 'Mail',
    // PHOTO: 'Photo',
    COMMENTS: 'Comments',
    SEARCH_SCREEN: 'SearchScreen'
}

const ProfilScreenRoutes = createStackNavigator(
    {
        ...commonRoutes
    },
    {
        ...commonRouteConfig,
        initialRouteName: commonRoutesName.PROFILE_VIEW,
        defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Style.colors.bar,
        },
        headerTintColor: Style.colors.icon
        }
    }
  );

  export default createAppContainer(ProfilScreenRoutes);