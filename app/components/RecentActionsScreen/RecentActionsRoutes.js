import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import commonRoutes, { commonRouteConfig } from '../common/routes/commonRoutes';
import RecentActions from './RecentActions/RecentActions';
// import { Style.colors.bar } from '../../common/style';
import Style from '../../helpers/style/style';

export const recentActionsRoutesName = {
    RECENT_ACTIONS: 'RecentActions'
}

const RecentActionsRoutes = createStackNavigator(
    {
        ...commonRoutes,
        [recentActionsRoutesName.RECENT_ACTIONS]: {
            screen: RecentActions
        }
    },
    {
        // ...commonRouteConfig,
        initialRouteName: recentActionsRoutesName.RECENT_ACTIONS,
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Style.colors.bar
            },
            headerTintColor: Style.colors.icon
        }
    }
  );

  export default RecentActionsRoutes;
