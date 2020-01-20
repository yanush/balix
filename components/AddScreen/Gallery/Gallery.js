import React, { Component } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import Style from 'Style/style';

export default class Gallery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gallery: []
    }
  }

  componentDidMount() {
    this._sub = this.props.navigation.addListener(
      'didFocus',
      this.getCameraRoll.bind(this)
    );
  }

  getCameraRoll() {
    CameraRoll.getPhotos({
      first: 200,
      assetType: 'All',
      groupName: 'Camera'
    }).then(r => {
      this.setState({ gallery: r.edges });
    })
    .catch((err) => {
      //Error Loading Images
      console.log(err);
    });
  }
    
  render() {
    return (
        <View style={styles.container}>
          
          <ScrollView contentContainerStyle={styles.picturesContainer}>
            {
              this.state.gallery.map((pic, i) => (
                <View key={i} style={styles.picture}>
                  <Image style={{width: '100%', height: '100%'}} source={{uri: pic.node.image.uri}} />
                </View>
              ))
            }
          </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Style.colors.background,
    alignItems: 'center',
    paddingTop: 60
  },
  picturesContainer : {
    backgroundColor: Style.colors.background,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  picture: {
    padding: 2,
    width: '33%',
    aspectRatio: 1/1
  }
});