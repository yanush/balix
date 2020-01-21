import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableHighlight } from 'react-native';
import Style from '../../helpers/style/style';
import Icon, { iconNames } from '../common/Icon/Icon';
import CameraRoll from "@react-native-community/cameraroll";
import Routes from '../Routes';
// import Swiper from 'react-native-swiper';

export default class AddBottomBar extends Component {

    constructor(props) {
        super(props);
        this.swiperContent = ['video', 'photo', 'portrait'];
        this.state = {
            mode: this.swiperContent[1],
            galleryFirstPic: undefined
        }
    }

    doSwipe(index) {
        this.setState({ mode: this.swiperContent[index] });
    }

    componentDidMount() {
      this.getCameraRoll();
    }

    getCameraRoll() {
      CameraRoll.getPhotos({
        first: 1,
        assetType: 'All',
        groupName: 'Camera'
      }).then(r => {
        this.setState({ galleryFirstPic: r.edges[0].node.image.uri });
      })
      .catch((err) => {
        //Error Loading Images
        console.log(err);
      });
    }

  render() {
    return (
        <View style={styles.container}>
            {/* <Swiper
                loop={false}
                style={{marginTop: 5}}
                width={80}
                height={20}
                index={1}
                showsPagination={false}
                onIndexChanged={(i) => this.doSwipe(i)}
            >
                <View style={styles.optionBox}>
                    <Text style={styles.option}>{this.swiperContent[0]}</Text>
                </View>
                <View style={styles.optionBox}>
                    <Text style={styles.option}>{this.swiperContent[1]}</Text>
                </View>
                <View style={styles.optionBox}>
                    <Text style={styles.option}>{this.swiperContent[2]}</Text>
                </View>
            </Swiper> */}
            <View style={styles.buttonsBox}>
              <TouchableHighlight onPress={() => this.props.onGallery(Routes.Screens.GALLERY.routeName)} style={styles.galleryButton}>
                <Image style={{ height: '100%', width: '100%', borderRadius: 10 }} source={{uri: this.state.galleryFirstPic}} />
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this.props.onPicture()} style={styles.captureButton}>
                <View style={styles.circle}></View>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this.props.onSwitch()} style={styles.switchCameraButton}>
                <Icon name={iconNames.FLIP} size={Style.sizes.icon} color={Style.colors.icon} />
              </TouchableHighlight>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Style.colors.addBar,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    width: '100%',
    marginBottom: 20,
    marginTop: 10
  },
  galleryButton: {
    height: 50,
    aspectRatio: 1,
    borderRadius: 10
  },
  captureButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 999
  },
  circle: {
    height: 70,
    aspectRatio: 1,
    borderRadius: 999,
    backgroundColor: 'white'
  },
  switchCameraButton: {
    padding: 8,
    borderRadius: 999,
    backgroundColor: 'gray'
  },
  optionBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50
  },
  option: {
    color: 'white',
    fontSize: 15,
    textTransform: 'uppercase',
  }
});
