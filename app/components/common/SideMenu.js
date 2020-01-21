import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../../store/userLogin/userActions';
import { changeMenuStatus } from '../../store/sideMenu/menuActions';
import Style from '../../helpers/style/style';
import Icon, { iconNames } from './Icon/Icon';
import ProfileSymbol from './ProfileSymbol/ProfileSymbol';

class SideMenu extends Component {

  onLogout() {
    this.props.changeMenuStatus();
    this.props.logout();
  }

  render() {
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <ProfileSymbol src={this.props.userLogin.profileImage} size={30} />
                <Text style={{color: Style.colors.text, fontSize: 20}}>{this.props.userLogin.userName}</Text>
            </View>
            <View style={{paddingHorizontal: 10}}>
                <View style={styles.tab}>
                    <Icon name={iconNames.AVATAR} size={20} color={Style.colors.text} />
                    <Text style={styles.label}>My account</Text>
                </View>
                <View style={styles.tab}>
                    <Icon name={iconNames.HIGHFIVE} size={20} color={Style.colors.text} />
                    <Text style={styles.label}>Find friends</Text>
                </View>
                <View style={styles.tab}>
                    <Icon name={iconNames.HISTORY} size={20} color={Style.colors.text} />
                    <Text style={styles.label}>History</Text>
                </View>

            </View>
            <TouchableHighlight onPress={this.onLogout.bind(this)} style={styles.logoutBox}>
                <View style={{flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Icon name={iconNames.LOGOUT} size={20} color={Style.colors.text} />
                    <Text style={{color: Style.colors.text, fontSize: 20,}}>Log out</Text>
                </View>
            </TouchableHighlight>
        </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: Style.colors.bar,
        position: 'relative',
    },
    title: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        padding: 10,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    tab: {
        width: Dimensions.get('window').width*0.7,
        flexDirection: 'row',
        alignItems: 'center'
    },
    label: {
        fontSize: 25,
        color: Style.colors.text,
        padding: 10
    },
    logoutBox: {
        borderTopColor: 'black',
        borderTopWidth: 1,
        position: 'absolute',
        bottom: 0,
        padding: 10,
        width: '100%'
    }
});

const mapStateToProps = (state) => {
    const userLogin = {...state.userLogin};
    return { userLogin }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
      logout,
      changeMenuStatus
    }, dispatch)
  );

  export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
