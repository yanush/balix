import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableHighlight } from 'react-native';
import Style from '../../helpers/style/style';
import Icon, {iconNames} from '../common/Icon/Icon';

export default class PreviewPhoto extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
        style: {
          backgroundColor: Style.colors.bar
        }
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      imageUri: undefined,
      rotateDeg: 0
    }
  }

  componentDidMount() {
    this._sub = this.props.navigation.addListener(
      'didFocus',
      this.getDataFromParams.bind(this)
    );
  }

  getDataFromParams() {
    let imageUri = this.props.navigation.getParam('uri');
    this.setState({ imageUri: imageUri });
  }

  rotateImage() {
    this.setState({ rotateDeg: this.state.rotateDeg+90 })
  }

  render() {
    let buttonSize = 30;
    return (
      <View style={{flex: 1, backgroundColor: Style.colors.background}}>
        <View style={styles.container}>
          <Image style={{width: '100%', height: '100%', transform: [{ rotate: `${this.state.rotateDeg}deg` }]}} source={{uri: this.state.imageUri}} />
        </View>
        <View style={styles.buttons}>
          <TouchableHighlight style={styles.btn}>
            <Icon name={iconNames.COLLAGE} color={Style.colors.icon} size={buttonSize} />
          </TouchableHighlight>
          <TouchableHighlight onPress={this.rotateImage.bind(this)} style={styles.btn}>
            <Icon name={iconNames.ROTATE} color={Style.colors.icon} size={buttonSize} />
          </TouchableHighlight>
          <TouchableHighlight style={styles.btn}>
            <Icon name={iconNames.TEXT} color={Style.colors.icon} size={buttonSize} />
          </TouchableHighlight>
          <TouchableHighlight style={styles.btn}>
            <Icon name={iconNames.DESIGN} color={Style.colors.icon} size={buttonSize} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Style.sizes.barHeight+5,
    width: '100%',
    aspectRatio: 1
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  btn: {
    padding: 10
  }
});
