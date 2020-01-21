import React, { Component } from 'react';
// Components
import { StyleSheet, View, ScrollView } from 'react-native';
import Action from './Action';
import Style from '../../../helpers/style/style';
import Header from '../../common/Header/Header';
import { connect } from 'react-redux';

class RecentActions extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => <Header {...navigation} />,
    };
  }

  render() {
    return (
      <View style={{flex:1}}>
        <ScrollView style={{backgroundColor: Style.colors.background}}>
          <View style={styles.container}>
            {
              this.props.userLogin.actions.map((act, i) => (
                <Action key={i} data={act} />
              ))
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Style.colors.background
  }
});

const mapStateToProps = (state) => {
  const userLogin = {...state.userLogin};
  return { userLogin }
};

export default connect(mapStateToProps)(RecentActions);
