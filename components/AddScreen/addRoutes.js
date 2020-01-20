import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import CameraScreen from './CameraScreen/CameraScreen';
import PreviewPhoto from './PreviewPhoto/PreviewPhoto';
import Gallery from './Gallery/Gallery';
import Style from 'Style/style';

export const addRouteNames = {
  CAMERA_SCREEN: 'CameraScreen',
  PREVIEW_PHOTO: 'PreviewPhoto',
  GALLERY_SCREEN: 'GalleryScreen'
}

const addRoutes = createStackNavigator(
    {
      [addRouteNames.CAMERA_SCREEN]: {
        screen: CameraScreen
      },
      [addRouteNames.PREVIEW_PHOTO]: {
        screen: PreviewPhoto
      },
      [addRouteNames.GALLERY_SCREEN]: {
        screen: Gallery
      }
    },
    {
      initialRouteName: addRouteNames.CAMERA_SCREEN,
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: Style.colors.addBar
        },
        headerTransparent:true,
        headerTintColor: Style.colors.icon
      }
    }
  );

  export default createAppContainer(addRoutes);