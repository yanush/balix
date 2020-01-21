import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Style from '../../../helpers/style/style';
import { connect } from 'react-redux';
import UserDetails from './UserDetails';
import Photos from './Photos';
import Header from '../../common/Header/Header';

class ProfileView extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => <Header {...navigation} />,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      userData: {userId: undefined}
    }
  }

  getDetailsFromParams() {
    let user = this.props.navigation.getParam('userData');
    if(user && (user.userId != this.state.userData.userId)) {
      this.setState({userData: user});
    }
  }

  componentDidMount() {
    this._sub = this.props.navigation.addListener(
      'willFocus',
      this.getDetailsFromParams.bind(this)
    );
  }

  render() {
    return (
      <View style={{flex:1}}>
        <ScrollView style={styles.scrollContainer}>
            {
              (this.state.userData.userId != undefined) ?
              (
                <View style={styles.viewContainer}>
                  <UserDetails {...this.props.navigation} user={this.state.userData} />
                  <Photos {...this.props.navigation} user={this.state.userData} />
                </View>
              ) :
              (
                <View style={styles.viewContainer}>
                  <UserDetails {...this.props.navigation} user={this.props.userLogin} />
                  <Photos {...this.props.navigation} user={this.props.userLogin} />
                </View>
              )
            }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: Style.colors.background,
    flex: 1
  },
  viewContainer: {
    alignItems: 'center',
  }
});

const mapStateToProps = (state) => {
  const userLogin = {...state.userLogin};
  return { userLogin }
};

export default connect(mapStateToProps)(ProfileView);
