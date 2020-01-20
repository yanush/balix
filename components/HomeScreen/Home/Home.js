import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, SafeAreaView  } from 'react-native';
import imageService from 'DemoDB/Images/imageService';
import Photo from 'Photo/Photo';
import Header from 'Header/Header';
import { commonRoutesName } from 'Routes/commonRoutes';
import Style from 'Style/style';
import userService from '../../../demoDB/Users/userService';
import ProfileSymbol from 'ProfileSymbol/ProfileSymbol';
import { routeNames } from 'components/Routes';
import AppNavigator from 'components/AppNavigator';

export default class Home extends Component {
  static navigationOptions = ({ navigation }) => {
      return {
        headerTitle: () => <Header {...navigation} />,
      };
  }

  constructor(props) {
    super(props);
    this.state = {
      allImages: [],
      allStory_Live: []
    }
  }

  componentDidMount() {
    this.setState({ 
      allImages: imageService.getAllImages(),
      allStory_Live:  userService.getAllUsers().filter((u) => u.live || u.story)
    });
  }

  onTitlePress(user) {
    this.props.navigation.navigate(commonRoutesName.PROFILE_VIEW, {userData: user});
  }

  symbolPressed(index) {
    let user = this.state.allStory_Live[index];
    if(user.live) {
      AppNavigator.getRef()._navigation.navigate(routeNames.LIVE_SCREEN, { userData: user, next: this.state.allStory_Live.slice(index, this.state.allStory_Live.length) });
    }
    else if(user.story) {
      AppNavigator.getRef()._navigation.navigate(routeNames.STORY_SCREEN, { userData: user, next: this.state.allStory_Live.slice(index, this.state.allStory_Live.length) });
    }
  }

  render() {
    return (
      <View  style={{flex: 1}}>
        <FlatList 
          style={styles.container}
          keyExtractor={item => item.imageId.toString()}
          data={this.state.allImages}
          renderItem={({item}) => (
            <Photo navigation={this.props.navigation} titlePress={this.onTitlePress.bind(this)} data={item} />
          )}
          ListHeaderComponent={
            <FlatList
            keyExtractor={item => item.userId.toString()}
            horizontal={true}
            style={styles.storyContainer}
            data={this.state.allStory_Live}
            renderItem={({item, index}) => (
              <ProfileSymbol
              press={this.symbolPressed.bind(this, index)} 
              story={item.story} 
              live={item.live} 
              style={{margin: 5, marginRight: 8}} 
              src={item.profileImage} 
              size={60} 
            />
            )}
          />
          }
        />
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Style.colors.background,
  },
  storyContainer: {
    flexDirection: 'row', 
    backgroundColor: Style.colors.background, 
    borderBottomColor: '#2f2f2f', 
    borderBottomWidth: 1
  }
});