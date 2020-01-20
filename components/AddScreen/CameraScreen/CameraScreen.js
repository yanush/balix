import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import Icon, {iconNames} from 'Icon/Icon';
import Style from 'Style/style';
import AddHeader from '../AddHeader/AddHeader';
import AddBottomBar from '../AddBottomBar/AddBottomBar';
import { RNCamera } from 'react-native-camera';
import { addRouteNames } from '../addRoutes';
import CameraRoll from "@react-native-community/cameraroll";
import {PermissionsAndroid} from 'react-native';

export default class CameraScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => <AddHeader {...navigation} />,
      headerTransparent: true
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      cameraType: RNCamera.Constants.Type.back,
      flashMode: false
    }
  }

  switchCamera() {
    if(this.state.cameraType == RNCamera.Constants.Type.back) {
      this.setState({ cameraType: RNCamera.Constants.Type.front });
    } else this.setState({ cameraType: RNCamera.Constants.Type.back });
  }

  toggleFlash() {
    if(this.state.flashMode) {
      this.setState({ flashMode: false });
    } else this.setState({ flashMode: true });
  }

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.saveToCameraRoll(data.uri);
      this.navigateTo(addRouteNames.PREVIEW_PHOTO, { uri: data.uri });
    }
  }

  saveToCameraRoll(data) {
    CameraRoll.saveToCameraRoll(data);
  }

  componentDidMount() {
    this.askCameraRollPermission();
  }

  async askCameraRollPermission() {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
  }

  navigateTo(routeName, params) {
    this.props.navigation.navigate(routeName, params);
  }
    
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={{flex:1}}
          type={this.state.cameraType}
          flashMode={(this.state.flashMode) ? (RNCamera.Constants.FlashMode.on) : (RNCamera.Constants.FlashMode.off)}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        {
          (!this.state.flashMode) ?
          (
            <TouchableHighlight onPress={() => this.toggleFlash()} style={{...styles.flashBox, borderColor: Style.colors.icon}}>
              <Icon name={iconNames.FLASH} size={Style.sizes.icon} color={Style.colors.icon} />
            </TouchableHighlight>            
          ) : 
          (
            <TouchableHighlight onPress={() => this.toggleFlash()} style={{...styles.flashBox, borderColor: Style.colors.lightMain}}>
              <Icon name={iconNames.FLASH} size={Style.sizes.icon} color={Style.colors.lightMain} />
            </TouchableHighlight>     
          )
        }
        <AddBottomBar onGallery={this.navigateTo.bind(this)} onSwitch={this.switchCamera.bind(this)} onPicture={this.takePicture.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Style.colors.background,
    position: 'relative'
  },
  flashBox: {
    position: 'absolute', 
    top: 60, 
    right: 0, 
    padding: 5,
    borderWidth: 1,
    borderRadius: 999,
    margin: 7
  }
});