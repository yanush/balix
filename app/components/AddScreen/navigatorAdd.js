import {createStackNavigator} from 'react-navigation-stack';
import CameraScreen from './CameraScreen';
import PreviewPhoto from './PreviewPhoto';
import Gallery from './Gallery';
import Style from '../../helpers/style/style';

export const addRouteNames = {
	CAMERA_SCREEN: 'CameraScreen',
	PREVIEW_PHOTO: 'PreviewPhoto',
	GALLERY_SCREEN: 'GalleryScreen',
};

export default createStackNavigator(
	{
		[addRouteNames.CAMERA_SCREEN]: {
			screen: CameraScreen,
		},
		[addRouteNames.PREVIEW_PHOTO]: {
			screen: PreviewPhoto,
		},
		[addRouteNames.GALLERY_SCREEN]: {
			screen: Gallery,
		},
	},
	{
		initialRouteName: addRouteNames.CAMERA_SCREEN,
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: Style.colors.addBar,
			},
			headerTransparent: true,
			headerTintColor: Style.colors.icon,
		},
	},
);
