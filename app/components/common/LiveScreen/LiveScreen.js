import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight, Animated, ScrollView, Dimensions } from 'react-native';
import ProfileSymbol from '../ProfileSymbol/ProfileSymbol';
import Style from '../../../helpers/style/style';
import Video from 'react-native-video';
import Icon, { iconNames } from '../Icon/Icon';
import { withComma } from '../../../common/numberMethods';
import { connect } from 'react-redux';
import Emoji from '../Photo/EmojiBox/Emoji';
import { emojis } from '../../../common/emojiVariables';

class LiveScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            tabBarVisible: false
        };
    }
  videoPlayer;

  constructor(props) {
    super(props);
    this.state = {
      cash: 0,
      userData: undefined,
      sendHeart: false,
      sendEmoji: undefined,
      openEmojiBar: false
    }

    this.emojiBarTimer = undefined;
    this.heartTransform = new Animated.Value(0);
    this.heartOpacity = new Animated.Value(1);
    this.emojiBarTransform = new Animated.Value(Dimensions.get('window').width*(-2));
    this.emojiSize = new Animated.Value(0);
    this.groupEmojiPosition = new Animated.Value(0);
  }

  componentWillUnmount() {
    if(this.emojiBarTimer) {
      clearTimeout(this.emojiBarTimer);
      this.emojiBarTimer = undefined;
    }
  }

  screenFocused() {
    let user = this.props.navigation.getParam('userData');
    this.setState({userData: user});
    if(!this.state.openEmojiBar) {
      this.toggleEmojiBar();
    }
  }

  componentDidMount() {
    this._sub = this.props.navigation.addListener(
      'didFocus',
      this.screenFocused.bind(this)
    );
  }

  emojiBarAnimation(value) {
    return Animated.timing(this.emojiBarTransform, {
      toValue: value,
      duration: 1000
    });
  }

  toggleEmojiBar() {
    if(this.state.openEmojiBar) {
      clearTimeout(this.emojiBarTimer);
      this.emojiBarAnimation(Dimensions.get('window').width*(-2)).start(() => this.setState({ openEmojiBar: false }));
    } else {
      this.emojiBarAnimation(0).start(() => this.setState({ openEmojiBar: true }));
      this.emojiBarTimer = setTimeout(() => {
        this.emojiBarAnimation(Dimensions.get('window').width*(-2)).start(() => this.setState({ openEmojiBar: false }));
      }, 10000);
    }
  }

  exitLive() {
    this.setState({ userData: undefined });
    this.props.navigation.goBack();
  }

  heartSend() {
    this.setState({ sendHeart: true });
    // Animated.parallel([
    //   this.flyBoxAnimation(150),
    //   Animated.sequence([
    //     this.heartOpacityAnimation(1),
    //     this.profileOpacityAnimation(0)
    //   ])
    // ])
    // .start(() => {
    //   this.heartTransform.setValue(0);
    //   this.profileOpacity.setValue(1);
    //   this.heartOpacity.setValue(0);
    //   this.setState({ sendHeart: false });
    // });
    Animated.sequence([
      this.flyHeartAnimation(200),
      this.heartOpacityAnimation(0)
    ])
    .start(() => {
      this.heartTransform.setValue(0);
      this.heartOpacity.setValue(1);
      this.setState({ sendHeart: false });
    });
  }

  flyHeartAnimation(height) {
    return Animated.timing(this.heartTransform, {
      toValue: height*(-1),
      duration: 1200
    });
  }

  profileOpacityAnimation(opacity) {
    return Animated.timing(this.profileOpacity, {
      toValue: opacity,
      duration: 100
    });
  }

  heartOpacityAnimation(opacity) {
    return Animated.timing(this.heartOpacity, {
      toValue: opacity,
      delay: 200,
      duration: 500
    });
  }

  emojiSizeAnimation(size) {
    return Animated.timing(this.emojiSize, {
      toValue: size,
      duration: 1500
    });
  }

  groupEmojiAnimation(position) {
    return Animated.timing(this.groupEmojiPosition, {
      toValue: position,
      duration: 2500
    });
  }

  emojiPress(emojiKey) {
    clearTimeout(this.emojiBarTimer);
    this.emojiBarTimer = setTimeout(() => {
      this.emojiBarAnimation(Dimensions.get('window').width*(-2)).start(() => this.setState({ openEmojiBar: false }));
    }, 10000);
    let randomNum = Math.floor(Math.random() * 2);
    this.setState({ sendEmoji: { url: emojis[emojiKey].url, animType: randomNum } });
    switch (randomNum) {
      case 0:
        this.emojiSizeAnimation(200)
        .start(() => {
          setTimeout(() => {
            this.emojiSize.setValue(0);
            this.setState({ sendEmoji: undefined, cash: this.state.cash+emojis[emojiKey].value });
          }, 1000)
        });
        break;
      case 1:
        this.groupEmojiAnimation(1)
        .start(() => {
          setTimeout(() => {
            this.groupEmojiPosition.setValue(0)
            this.setState({ sendEmoji: undefined, cash: this.state.cash+emojis[emojiKey].value });
          }, 1000)
        });
        break;
    }
  }

  renderAnimationEmoji() {
    switch (this.state.sendEmoji.animType) {
      case 0:
        return (
          <View style={{height: '100%', width: '100%', position: 'absolute', top: 0, left: 0, alignItems: 'center', justifyContent: 'center'}}>
            <Animated.Image
              source={this.state.sendEmoji.url}
              style={{
                width: this.emojiSize,
                height: this.emojiSize
              }}
            />
          </View>
        );
      case 1:
        return (
          <Animated.View
            style={{
              height: 400,
              width: 400,
              position: 'absolute',
              top: this.groupEmojiPosition.interpolate({
                inputRange: [0, 1],
                outputRange: [-400, Dimensions.get('window').height]
              }),
              left: this.groupEmojiPosition.interpolate({
                inputRange: [0, 1],
                outputRange: [-400,  Dimensions.get('window').width]
              })
            }}
          >
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 10}}>
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 10}}>
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 10}}>
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 10}}>
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 10}}>
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 10}}>
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 10}}>
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 10}}>
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
            </View>
          </Animated.View>
        )
      default:
        return null;
    }
  }

  render() {
    if(!this.state.userData) {
      return (<View></View>);
    }
    return (
      <View style={styles.container}>
        <Video
          onEnd={() => this.exitLive()}
          ref={videoPlayer => (this.videoPlayer = videoPlayer)}
          source={this.state.userData.live}
          style={styles.mediaPlayer}
          resizeMode={"cover"}
        />
        <View style={styles.header}>
          <View style={styles.leftSide}>
            <ProfileSymbol src={this.state.userData.profileImage} size={30} />
            <Text style={styles.userName}>{this.state.userData.userName}</Text>
          </View>
          <View style={styles.rightSide}>
            {/* <Image style={{height: 90, width: 150}} source={require('../../../assets/live.png')} /> */}
            <Text style={styles.cashBox}>{withComma(this.state.cash)}$</Text>
            <Text style={{padding: 5, fontWeight: 'bold', color: Style.colors.text, backgroundColor: 'red', borderRadius: 5, fontSize: 10}}>LIVE</Text>
            <TouchableHighlight onPress={this.exitLive.bind(this)}>
              <Icon style={{padding: 10}} name={iconNames.CLOSE} size={Style.sizes.icon-5} color={Style.colors.icon} />
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.footer}>
          <Animated.ScrollView horizontal={true} style={{...styles.emojiBar, transform: [{translateX: this.emojiBarTransform}]}}>
          <TouchableHighlight onPress={() => this.heartSend()} style={styles.emojiBox}>
            <Icon name={iconNames.FULL_HEART} size={20} color={'red'} />
          </TouchableHighlight>
          {
            Object.keys(emojis).map((key, i) => (
              <TouchableHighlight onPress={this.emojiPress.bind(this, key)} style={styles.emojiBox} key={i}>
                <Emoji data={emojis[key]} size={20} />
              </TouchableHighlight>
            ))
          }
          </Animated.ScrollView>
          <View style={styles.buttons}>
            <View style={{flexDirection: 'row-reverse'}}>
              <TouchableHighlight onPress={() => this.toggleEmojiBar()}>
                <Icon name={iconNames.LIKE} size={Style.sizes.icon+10} color={Style.colors.icon} />
              </TouchableHighlight>
            </View>
          </View>
        </View>
        {
          (!this.state.sendEmoji) ? (<View style={{position: 'absolute'}}></View>) :
          ( this.renderAnimationEmoji() )
        }
        {
          (!this.state.sendHeart) ? (<View style={{position: 'absolute'}}></View>) :
          (
          <Animated.View style={{position: 'absolute', bottom: 107, left: 20, opacity: this.heartOpacity, transform: [{ translateY: this.heartTransform }]}} >
            <Icon name={iconNames.FULL_HEART} size={20} color={'red'} />
          </Animated.View>
          )
        }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Style.colors.background,
    justifyContent: 'space-between',
    position: 'relative'
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12
  },
  footer: {
    alignItems: 'flex-end'
  },
  buttons: {
    padding: 12
  },
  userName: {
    color: Style.colors.text,
    fontWeight: 'bold',
    padding: 5
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cashBox: {
    padding: 5,
    fontWeight: 'bold',
    color: Style.colors.text,
    borderRadius: 5,
    fontSize: 10,
    borderColor: Style.colors.lightMain,
    borderWidth: 1,
    margin: 10
  },
  flyBox: {
    position: 'relative'
  },
  emojiBar: {
    flexDirection: 'row',
    marginBottom: 7
  },
  emojiBox: {
    backgroundColor: 'rgba(165,165,165,0.5)',
    borderRadius: 15,
    marginHorizontal: 5,
    paddingHorizontal: 15,
    alignItems:'center',
    justifyContent: 'center'
  }
});


const mapStateToProps = (state) => {
  const userLogin = {...state.userLogin};
  return { userLogin }
};

export default connect(mapStateToProps)(LiveScreen);
