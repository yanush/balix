import Mail from "../Mail/Mail";
import Search from "../Search/Search";
import Photo from "../Photo/Photo";
import Comments from "../Photo/Comments/Comments";
import ProfileView from "../../ProfileScreen/ProfileView/ProfileView";
import ConversationView from "../Mail/ConversationView/ConversationView";
import Routes from '../../Routes';
import PhotoScreen from "../../PhotoScreen/PhotoScreen";
import NavigatorMail from '../Mail/navigatorMail';
import NavigatorSearch from '../Search/navigatorSearch';

export const commonRouteConfig = {
    transitionConfig: () => ({
        transitionSpec: {
            duration: 0
        }
    }),
    lazy: false
};

export default commonRoutes = {
    [Routes.Screens.PROFILE.routeName]: {
        screen: ProfileView
    },
    [Routes.Screens.PHOTO.routeName]: {
        screen: PhotoScreen
    },
    [Routes.Screens.COMMENTS.routeName]: {
        screen: Comments
    },
    [Routes.Screens.CONVERSATION.routeName]: {
        screen: ConversationView
    }
};
