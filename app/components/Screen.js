import React, {Component} from 'react';
// Navigation
import NavigatorTabs from './navigatorTabs';
// Components
import {StyleSheet, Text, View, StatusBar, Animated, Dimensions, TouchableHighlight} from 'react-native';
import SideMenu from './common/SideMenu';
import LoginScreen from './LoginScreen/LoginScreen';
// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeMenuStatus} from '../store/sideMenu/menuActions';
import AppNavigator from './AppNavigator';

class Screen extends Component {

	constructor(props) {
		super(props);
		this.sliderAnimation = new Animated.Value(0);
	}

	componentDidUpdate() {
		if (this.props.openMenu) {
			Animated.spring(this.sliderAnimation, {
				toValue: Dimensions.get('window').width * (-0.7) - 18,
			}).start();
		} else {
			Animated.spring(this.sliderAnimation, {
				toValue: 0,
			}).start();
		}
	}

	render() {
		if (!this.props.userLogin.userName) {
			return (
				<LoginScreen/>
			);
		}
		return (
			<Animated.View style={{...styles.container, transform: [{translateX: this.sliderAnimation}]}}>
				<View style={styles.screen}>
					<StatusBar hidden/>
					<NavigatorTabs
						ref={(r) => AppNavigator.setRef(r)}
					/>
				</View>
				<SideMenu/>
			</Animated.View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		height: '100%',
		width: Dimensions.get('window').width * 1.75,
	},
	screen: {
		flex: 1,
		flexGrow: 1,
	},
});

const mapStateToProps = (state) => {
	const {openMenu} = state.sideMenu;
	const userLogin = {...state.userLogin};
	return {openMenu, userLogin};
};

const mapDispatchToProps = dispatch => (
	bindActionCreators({
		changeMenuStatus,
	}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
