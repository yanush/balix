import Mail from "../Mail/Mail";
import Search from "../Search/Search";
import Photo from "../Photo/Photo";
import Comments from "../Photo/Comments/Comments";
import ProfileView from "../../ProfileScreen/ProfileView/ProfileView";
import ConversationView from "../Mail/ConversationView/ConversationView";

export const commonRoutesName = {
    MAIL: 'Mail',
    SEARCH_SCREEN: 'SearchScreen',
    PROFILE_VIEW: 'ProfileView',
    PHOTO: 'Photo',
    COMMENTS: 'Comments',
    CONVERSATION_VIEW: 'ConversationView',
};

export const commonRouteConfig = {
    transitionConfig: () => ({
        transitionSpec: {
            duration: 0
        }
    }),
    lazy: false
};

export default commonRoutes = {
    [commonRoutesName.MAIL]: {
        screen: Mail
    },
    [commonRoutesName.SEARCH_SCREEN]: {
        screen: Search
    },
    [commonRoutesName.PROFILE_VIEW]: {
        screen: ProfileView
    },
    // [commonRoutesName.PHOTO]: {
    //     screen: Photo
    // },
    [commonRoutesName.COMMENTS]: {
        screen: Comments
    },
    [commonRoutesName.CONVERSATION_VIEW]: {
        screen: ConversationView
    }
};
