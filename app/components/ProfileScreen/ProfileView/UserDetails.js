import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Style from '../../../helpers/style/style';
import { iconNames } from '../../common/Icon/Icon';
import ProfileSymbol from '../../common/ProfileSymbol/ProfileSymbol';
import { connect } from 'react-redux';
import { commonRoutesName } from '../../common/routes/commonRoutes';
import messageService from '../../../demoDB/Messages/messageService';

class UserDetails extends Component {

  navigateTo(routeName) {
    let params = {};
    if(routeName == commonRoutesName.CONVERSATION_VIEW) {
      const messages = messageService.getConversationMessagesByPeopleTalks(this.props.userLogin, this.props.user);
      params = {
        userLogin: this.props.userLogin,
        talkWith: this.props.user,
        messages: messages
      }
    }
    this.props.navigate(routeName, {conversationData: params})
  }

  render() {
    if(!this.props.user) {
      return (<View></View>)
    }
    return (
      <View>
        <View style={styles.userDetails}>
          <View style={styles.user}>
            <View style={styles.imageBox}>
              <ProfileSymbol
                iconPress={(this.props.user.userId == this.props.userLogin.userId) ? (undefined) : (this.navigateTo.bind(this, commonRoutesName.CONVERSATION_VIEW))}
                src={this.props.user.profileImage}
                icon={(this.props.user.userId == this.props.userLogin.userId) ? (iconNames.LIVE) : (iconNames.LETTER)}
                size={100}
              />
            </View>
            <Text style={styles.name}>{this.props.user.userName}</Text>
          </View>
          <View style={styles.achievement}>
            <View style={{...styles.achiveBox, ...styles.rightBorder}}>
              <Text style={styles.number}>{this.props.user.followers.length}</Text>
              <Text style={styles.type}>Followers</Text>
            </View>
            <View style={{...styles.achiveBox, ...styles.rightBorder}}>
              <Text style={styles.number}>{this.props.user.following.length}</Text>
              <Text style={styles.type}>Following</Text>
            </View>
            <View style={styles.achiveBox}>
              <Text style={styles.number}>{this.props.user.uploads.length}</Text>
              <Text style={styles.type}>Posts</Text>
            </View>
          </View>
        </View>
        {
          (this.props.user.userId == this.props.userLogin.userId) ?
          (
          <View style={styles.buttonBox}>
              <View style={styles.extraButton}>
                  <Text style={styles.buttonContent}>Extra Photo</Text>
              </View>
          </View>
          ) : (<View></View>)
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userDetails: {
    justifyContent: 'center',
    marginVertical: 10
  },

  user: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    color: Style.colors.text,
    paddingVertical: 7,
    fontWeight: 'bold'
  },
  imageBox: {
    borderRadius: 999
  },

  achievement: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  achiveBox: {
    alignItems: "center",
    paddingHorizontal: 35,

  },
  rightBorder: {
    borderRightColor: 'white',
    borderRightWidth: 1
  },
  number: {
    color: Style.colors.text,
    fontWeight: 'bold'
  },
  type: {
    color: Style.colors.text
  },

  buttonBox: {
    alignItems: 'center',
    margin: 10
  },
  extraButton: {
    width: '70%',
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'center'
  },
  buttonContent: {
    color: Style.colors.text,
    paddingVertical: 8
  }
});

const mapStateToProps = (state) => {
  const userLogin = {...state.userLogin};
  return { userLogin }
};

export default connect(mapStateToProps)(UserDetails);
