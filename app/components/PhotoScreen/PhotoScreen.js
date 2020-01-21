import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, Animated, Dimensions} from 'react-native';
import Style from '../../helpers/style/style';
import Icon, {iconNames} from '../common/Icon/Icon';
import SingleComment from '../common/Photo/Comments/SingleComment';
import EmojiBox from '../common/Photo/EmojiBox/EmojiBox';
import PhotoIndicator from '../common/Photo/PhotoIndicator';
import ProfileSymbol from '../common/ProfileSymbol/ProfileSymbol';
import {withComma} from '../../common/numberMethods';
import {commonRoutesName} from '../common/routes/commonRoutes';

export default class PhotoScreen extends Component {
  // Params = [ userImages, selectedImage, userData ] ||

  constructor(props) {
    super(props);
    this.state = {
      openEmoji: false,
      emojiSendPosition: {x: 0, y: 0},
      emojiSend: undefined,
      plusCash: 0,
      userData: undefined,
      imageData: undefined,
      userImages: undefined,
      comments: [
        {user: 'simon', comment: 'com1'},
        {user: 'avi', comment: 'com2'},
        {user: 'joh', comment: 'com3'},
        {user: 'IdoLago94', comment: 'com4'},
        {user: 'shlomi', comment: 'com5'},
        {user: 'simon', comment: 'com6'},
      ],
    };
    this.emojiSize = 25;
    this.moveEmoji = new Animated.Value(0);
    this.fadeEmoji = new Animated.Value(1);
    this.sizeEmoji = new Animated.Value(0);
    this.fadeSparkle = new Animated.Value(0);
    this.sparkleAnimation = [
      new Animated.Value(0), new Animated.Value(0), new Animated.Value(0), new Animated.Value(0),
      new Animated.Value(0), new Animated.Value(0), new Animated.Value(0), new Animated.Value(0),
      new Animated.Value(0), new Animated.Value(0),
    ];
  }

  toggleEmoji() {
    this.setState((prevState) => {
      return {
        ...prevState,
        openEmoji: !prevState.openEmoji,
      };
    });
  }

  emojiPress(emoji, event) {
    let position = {
      x: event.touchHistory.touchBank[0].currentPageX - 20,
      y: event.touchHistory.touchBank[0].currentPageY - 100,
    };
    this.setState({
      openEmoji: false,
      emojiSendPosition: position,
      emojiSend: emoji.url,
    });
    this.startEmojiAnimation(emoji.value);
  }

  startEmojiAnimation(emojiValue) {
    this.sparkleAnimation.map((anim, i) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 1500,
        delay: 100 * i + 600,
      }).start(() => {
        anim.setValue(0);
      });
    });
    Animated.sequence([
      Animated.timing(this.sizeEmoji, {
        toValue: this.emojiSize + 18,
      }),
      Animated.parallel([
        Animated.timing(this.moveEmoji, {
          duration: 1500,
          toValue: 1,
        }),
        Animated.timing(this.sizeEmoji, {
          duration: 2000,
          toValue: this.emojiSize,
        }),
      ]),
      Animated.timing(this.fadeEmoji, {
        toValue: 0,
      }),
    ]).start(() => {
      this.fadeEmoji.setValue(1);
      this.moveEmoji.setValue(0);
      this.sizeEmoji.setValue(0);
      this.setState({
        emojiSendPosition: {x: 0, y: 0},
        emojiSend: undefined,
        plusCash: this.state.plusCash + emojiValue,
      });
    });
  }

  getDetailsFromParams() {
    let userImages = this.props.navigation.getParam('userImages');
    let imageData = this.props.navigation.getParam('selectedImage');
    let userData = this.props.navigation.getParam('userData');
    this.setState((prevState) => {
      return {
        ...prevState,
        imageData: imageData,
        userData: userData,
        userImages: userImages,
      };
    });
  }

  componentDidMount() {
    this.getDetailsFromParams();
  }

  navigateToProfile() {
    this.props.navigation.navigate(commonRoutesName.PROFILE_VIEW, {userData: this.state.userData});
  }

  render() {
    return (!this.state.userData || !this.state.imageData) ? null :
      <ScrollView style={styles.container}>
        <TouchableHighlight onPress={this.navigateToProfile.bind(this)}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ProfileSymbol style={{margin: 10}} src={this.state.userData.profileImage} size={40}/>
            <Text style={styles.userName}>{this.state.userData.userName}</Text>
          </View>
        </TouchableHighlight>

        <View style={styles.photoBox}>
          <Image style={styles.photo} source={this.state.imageData.url}/>
          <PhotoIndicator indicators={{
            cash: this.state.imageData.cash + this.state.plusCash,
            hearts: this.state.imageData.hearts,
          }}/>
          <View style={styles.emoji}>
            {
              !this.state.openEmoji ? null :
                <EmojiBox emojiSize={this.emojiSize} emojiPress={this.emojiPress.bind(this)}/>
            }
          </View>
          <Animated.Image
            source={this.state.emojiSend}
            style={{
              position: 'absolute',
              width: this.sizeEmoji,
              height: this.sizeEmoji,
              opacity: this.fadeEmoji,
              top: this.moveEmoji.interpolate({
                inputRange: [0, 1],
                outputRange: [this.state.emojiSendPosition.y, 0],
              }),
              left: this.moveEmoji.interpolate({
                inputRange: [0, 1],
                outputRange: [this.state.emojiSendPosition.x, Dimensions.get('window').width * 0.77],
              }),
            }}
          />
          {
            this.sparkleAnimation.map((anim, i) => (
              <Animated.Image key={i} source={require('../../assets/sparkle.gif')} style={{
                position: 'absolute',
                width: this.sizeEmoji,
                height: this.sizeEmoji,
                opacity: this.fadeEmoji,
                top: anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [this.state.emojiSendPosition.y, 0],
                }),
                left: anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [this.state.emojiSendPosition.x, Dimensions.get('window').width * 0.77],
                }),
              }}/>
            ))
          }
        </View>
        <View style={styles.buttonsBox}>
          <View style={styles.leftSide}>
            <TouchableHighlight onPress={this.toggleEmoji.bind(this)}>
              <Icon style={styles.icon} name={iconNames.LIKE} size={Style.sizes.icon}
                    color={Style.colors.icon}/>
            </TouchableHighlight>
            <Icon style={styles.icon} name={iconNames.COMMENT} size={Style.sizes.icon}
                  color={Style.colors.icon}/>
          </View>
          <View style={styles.rightSide}>
            <Icon style={styles.icon} name={iconNames.SHARE} size={Style.sizes.icon}
                  color={Style.colors.icon}/>
          </View>
        </View>
        <View style={styles.anotherPhotos}>
          {
            this.state.userImages.map((img, i) => {
              if (img.id === this.state.imageData.id) {
                return (<View key={i}></View>);
              }
              return (
                <TouchableHighlight key={i} style={{padding: 5, width: '12.5%', aspectRatio: 1}}
                                    onPress={() => this.setState({imageData: img})}>
                  <Image style={styles.smallPhoto} source={img.url}/>
                </TouchableHighlight>
              );
            })
          }
        </View>

        <View style={styles.commentsBox}>
          <View style={{flexDirection: 'row', marginBottom: 5}}>
            <Text style={styles.userName}>{this.state.userData.userName}: </Text>
            <Text style={styles.content}>{this.state.imageData.title}</Text>
          </View>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate(commonRoutesName.COMMENTS, {
              comments: this.state.comments,
            })}>
            <Text
              style={styles.allCommentsLink}>View {withComma(this.state.comments.length)} Comments</Text>
          </TouchableHighlight>
          <SingleComment data={this.state.comments[this.state.comments.length - 1]}/>
        </View>
      </ScrollView>;
  }
}

const styles = StyleSheet.create({
  emoji: {
    position: 'absolute',
    bottom: -20,
    alignItems: 'center',
    width: '100%',
  },
  container: {
    backgroundColor: Style.colors.background,
    position: 'relative',
  },
  userName: {
    fontSize: 16,
    color: Style.colors.text,
    fontWeight: 'bold',
  },
  photoBox: {
    width: '100%',
    aspectRatio: 1,
    // padding: 8,
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  photoEarn: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 20,
    borderRadius: 999,
    backgroundColor: 'rgba(128, 128, 128, 0.4)',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxHeight: 22,
  },
  iconBagBox: {
    padding: 5,
    backgroundColor: Style.colors.darkMain,
    borderRadius: 999,
  },
  number: {
    color: Style.colors.text,
    paddingHorizontal: 8,
  },

  buttonsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
    position: 'relative',
  },
  leftSide: {
    flexDirection: 'row',
  },
  icon: {
    padding: 10,
  },

  anotherPhotos: {
    flexDirection: 'row',
    justifyContent: 'center',
    opacity: 0.6,
  },
  smallPhoto: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },

  commentsBox: {
    padding: 10,
  },
  content: {
    fontSize: 16,
    color: Style.colors.text,
  },
  allCommentsLink: {
    fontSize: 16,
    color: Style.colors.text,
  },
});
