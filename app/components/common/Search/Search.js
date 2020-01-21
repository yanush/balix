import React, {Component} from 'react';
import {StyleSheet, View, TouchableHighlight, FlatList} from 'react-native';
import Header from '../Header/Header';
import Style from '../../../helpers/style/style';
import {connect} from 'react-redux';
import Result from './Result';
import Routes from '../../Routes';

class Search extends Component {
	static navigationOptions = ({navigation}) => {
		return {
			headerTitle: () => <Header {...navigation} />,
		};
	};

	navigateTo(routeName, params) {
		this.props.navigation.navigate(routeName, params);
	}

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					keyExtractor={item => item.userId.toString()}
					data={this.props.searchResult}
					renderItem={({item}) => (
						<TouchableHighlight
							onPress={this.navigateTo.bind(this, Routes.Screens.PROFILE.routeName, {userData: item})}>
							<Result data={item}/>
						</TouchableHighlight>
					)}
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
	textBox: {
		fontSize: 70,
		color: Style.colors.text,
	},
});

const mapStateToProps = (state) => {
	return {
		searchResult: state.search.searchResult,
	};
};

export default connect(mapStateToProps)(Search);
