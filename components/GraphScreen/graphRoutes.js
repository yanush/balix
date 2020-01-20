import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Graph from './Graph/Graph';
import commonRoutes, { commonRouteConfig } from '../common/routes/commonRoutes';
import Style from 'Style/style';

export const graphRoutesName = {
    GRAPH: 'Graph',
    MAIL: 'Mail',
    PROFILE_VIEW: 'ProfileView'
}

const GraphScreenRoutes = createStackNavigator(
    {
        ...commonRoutes,
        [graphRoutesName.GRAPH]: {
            screen: Graph
        }
    },
    {
        ...commonRouteConfig,
        initialRouteName: graphRoutesName.GRAPH,
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Style.colors.bar
            },
            headerTintColor: Style.colors.icon
        }
    }
  );

  export default createAppContainer(GraphScreenRoutes);