import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList, SafeAreaView} from 'react-native';
import imageService from '../../demoDB/Images/imageService';
import Photo from '../common/Photo/Photo';
import Header from '../common/Header/Header';
import Style from '../../helpers/style/style';
import userService from '../../demoDB/Users/userService';
import ProfileSymbol from '../common/ProfileSymbol/ProfileSymbol';
import AppNavigator from '../AppNavigator';
import Routes from '../Routes';

export default class Home extends Component {
	static navigationOptions = ({navigation}) => {
		return {
			headerTitle: () => <Header {...navigation} />,
		};
	};

	constructor(props) {
		super(props);
		this.state = {
			allImages: [],
			allStory_Live: [],
		};
	}

	componentDidMount() {
		this.setState({
			allImages: imageService.getAllImages(),
			allStory_Live: userService.getAllUsers().filter((u) => u.live || u.story),
		});
	}

	onTitlePress(user) {
		this.props.navigation.navigate(Routes.Screens.PROFILE, {userData: user});
	}

	symbolPressed(index) {
		let user = this.state.allStory_Live[index];
		if (user.live) {
			AppNavigator.getRef()._navigation.navigate(Routes.Screens.LIVE.routeName, {
				userData: user,
				next: this.state.allStory_Live.slice(index, this.state.allStory_Live.length),
			});
		} else if (user.story) {
			AppNavigator.getRef()._navigation.navigate(Routes.Screens.STORY.routeName, {
				userData: user,
				next: this.state.allStory_Live.slice(index, this.state.allStory_Live.length),
			});
		}
	}

	render() {
		return (
			<View style={{flex: 1}}>
				<FlatList
					style={styles.container}
					showsVerticalScrollIndicator={false}
					keyExtractor={item => item.imageId.toString()}
					data={this.state.allImages}
					renderItem={({item}) => (
						<Photo navigation={this.props.navigation} titlePress={this.onTitlePress.bind(this)}
							   data={item}/>
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
			</View>
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
		borderBottomWidth: 1,
	},
});
