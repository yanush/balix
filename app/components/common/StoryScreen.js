import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight, Animated, ScrollView, Dimensions } from 'react-native';
import ProfileSymbol from './ProfileSymbol/ProfileSymbol';
import Style from '../../helpers/style/style';
import Video from 'react-native-video';
import Icon, { iconNames } from './Icon/Icon';
import { withComma } from '../../common/numberMethods';
import { connect } from 'react-redux';
import Emoji from './Photo/EmojiBox/Emoji';
import { emojis } from '../../common/emojiVariables';
import EmojiBox from './Photo/EmojiBox/EmojiBox';

class StoryScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            tabBarVisible: false
        };
    }

  constructor(props) {
    super(props);
    this.state = {
      cash: 0,
      currentImageIndex: 0,
      userData: undefined,
      sendHeart: false,
      sendEmoji: undefined,
      openEmoji: false
    }

    this.emojiBoxTimer = undefined;
    this.storyBarWidthArr = [];
    this.heartTransform = new Animated.Value(0);
    this.heartOpacity = new Animated.Value(1);
    this.emojiSize = new Animated.Value(0);
    this.groupEmojiPosition = new Animated.Value(0);
  }

  componentWillUnmount() {
    if(this.emojiBoxTimer) {
      clearTimeout(this.emojiBoxTimer);
      this.emojiBoxTimer = undefined;
    }
  }

  screenFocused() {
    let user = this.props.navigation.getParam('userData');
    this.storyBarWidthArr = [];
    user.story.map(() => {
        this.storyBarWidthArr.push(new Animated.Value(0));
    });
    this.setState({userData: user});
    this.runStory(this.state.currentImageIndex);
    if(!this.state.openEmoji) {
      this.toggleEmoji();
    }
  }

  runStory(i) {
    Animated.timing(this.storyBarWidthArr[i], {
        toValue: 1,
        duration: 5000
    }).start(() => {
        if(this.state.currentImageIndex+1 < this.state.userData.story.length) {
            this.runStory(this.state.currentImageIndex+1)
            this.setState({ currentImageIndex: this.state.currentImageIndex+1 })
        } else this.exitStory();
    });
  }

  componentDidMount() {
    this._sub = this.props.navigation.addListener(
      'didFocus',
      this.screenFocused.bind(this)
    );
  }

  toggleEmoji() {
    if(!this.state.openEmoji) {
        this.setState({ openEmoji: true });
        this.emojiBoxTimer = setTimeout(() => {
            this.setState({ openEmoji: false })
        }, 10000);
    } else {
        clearTimeout(this.emojiBoxTimer);
        this.setState({ openEmoji: false })
    }
  }

  exitStory() {
    this.setState({ userData: undefined, currentImageIndex: 0 });
    this.props.navigation.goBack();
  }

  heartSend() {
    this.setState({ sendHeart: true });
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

  emojiPress(emoji) {
    clearTimeout(this.emojiBoxTimer);
    this.emojiBoxTimer = setTimeout(() => {
      this.toggleEmoji();
    }, 10000);
    let randomNum = Math.floor(Math.random() * 2);
    this.setState({ sendEmoji: { url: emoji.url, animType: randomNum } });
    switch (randomNum) {
      case 0:
        this.emojiSizeAnimation(200)
        .start(() => {
          setTimeout(() => {
            this.emojiSize.setValue(0);
            this.setState({ sendEmoji: undefined, cash: this.state.cash+emoji.value });
          }, 1000)
        });
        break;
      case 1:
        this.groupEmojiAnimation(1)
        .start(() => {
          setTimeout(() => {
            this.groupEmojiPosition.setValue(0)
            this.setState({ sendEmoji: undefined, cash: this.state.cash+emoji.value });
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
        <Image
          source={this.state.userData.story[this.state.currentImageIndex]}
          style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
        />
        <View style={styles.storyBar}>
            {
                this.state.userData.story.map((s, i) => (
                    <View
                        key={i}
                        style={{
                            position: 'relative',
                            height: '100%',
                            marginHorizontal: 2,
                            backgroundColor: 'gray',
                            width: Dimensions.get('window').width/this.state.userData.story.length
                        }}
                    >
                        <Animated.View
                         style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            backgroundColor: 'white',
                            width: this.storyBarWidthArr[i].interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0%', '100%']
                            })
                         }}
                        ></Animated.View>
                    </View>
                ))
            }
        </View>
        <View style={styles.header}>
          <View style={styles.leftSide}>
            <ProfileSymbol src={this.state.userData.profileImage} size={30} />
            <Text style={styles.userName}>{this.state.userData.userName}</Text>
          </View>
          <View style={styles.rightSide}>
            <Text style={styles.cashBox}>{withComma(this.state.cash)}$</Text>
            <TouchableHighlight onPress={this.exitStory.bind(this)}>
              <Icon style={{padding: 10}} name={iconNames.CLOSE} size={Style.sizes.icon-5} color={Style.colors.icon} />
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={{alignItems: 'center', width: '100%'}}>
          {
            (this.state.openEmoji) ? (<EmojiBox includeHeart={true} emojiSize={25} heartPress={this.heartSend.bind(this)} emojiPress={this.emojiPress.bind(this)} />) : (<View></View>)
          }
          </View>
          <View style={styles.buttons}>
            <View style={{flexDirection: 'row-reverse'}}>
              <TouchableHighlight onPress={() => this.toggleEmoji()}>
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
          <Animated.View style={{position: 'absolute', bottom: 150, left: 25, opacity: this.heartOpacity, transform: [{ translateY: this.heartTransform }]}} >
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
  storyBar: {
    flexDirection: 'row',
    height: 5
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',

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

export default connect(mapStateToProps)(StoryScreen);
