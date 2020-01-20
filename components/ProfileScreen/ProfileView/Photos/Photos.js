import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import imageService from 'DemoDB/Images/imageService';
import { commonRoutesName } from 'Routes/commonRoutes';

export default class Photos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userImages: []
    }
  }

  goToPhoto(params) {
    this.props.navigate(commonRoutesName.PHOTO, params);
  }

  getUserImages() {
    let userImages = imageService.getUserImages(this.props.user.userId);
    this.setState({ userImages: userImages });
  }

  componentDidMount() {
    this.getUserImages();
  }

  componentDidUpdate() {
    if(this.props.user.userId != this.state.userImages[0].userId) {
      this.getUserImages();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.userImages.map((img, i) => {
            return (
              <TouchableOpacity 
                key={i} 
                style={styles.imageBox} 
                onPress={this.goToPhoto.bind(this, {
                  userData: this.props.user,
                  selectedImage: img,
                  userImages: this.state.userImages
                })}
                >
                <Image source={img.url} style={styles.photo} />
              </TouchableOpacity>
            )
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 3,
        justifyContent: 'center'
    },
    imageBox: {
        margin: 3,
        width: '31%',
        aspectRatio: 1/1
    },
    photo: {
      height: '100%',
      width: '100%',
      borderRadius: 10
    }
});
