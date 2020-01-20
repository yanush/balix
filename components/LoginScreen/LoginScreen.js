import React, { Component } from 'react';
import Style from 'Style/style';
// Components
import { StyleSheet, Text, View, TouchableHighlight, TextInput } from 'react-native';
import Icon, { iconNames } from 'Icon/Icon';
import { LinearTextGradient } from "react-native-text-gradient";
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from 'Store/userLogin/userActions';


class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      securePassword: true
    }
  }

    onLogin() {
      let auth = {
        username: this.state.username,
        password: this.state.password
      }
      this.props.login(auth);
    }

  render() {
    return (
        <View style={styles.container}>
          <LinearTextGradient
            style={styles.title}
            locations={[0, 1]}
            colors={[Style.colors.lightMain, Style.colors.darkMain]}
          >
            <Text>Balix</Text>
          </LinearTextGradient>
            <View style={styles.form}>
                {
                    (!this.props.userLogin.authError) ? (<View></View>) : 
                    (
                        <View style={styles.errorBox}>
                            <Text style={{color: Style.colors.text}}>{this.props.userLogin.authError}</Text>
                        </View>
                    )
                }
                <View style={styles.field}>
                    <TextInput onChangeText={(username) => this.setState({username})} placeholderTextColor={Style.colors.text} style={styles.input} placeholder='Username or email' />
                </View>
                <View style={styles.field}>
                    <TextInput secureTextEntry={this.state.securePassword} onChangeText={(password) => this.setState({password})} placeholderTextColor={Style.colors.text} style={styles.input} placeholder='Password' />
                    <TouchableHighlight style={{paddingHorizontal: 15}} onPress={() => this.setState({securePassword: !this.state.securePassword})}>
                      <Icon name={(this.state.securePassword) ? (iconNames.INVISIBLE):(iconNames.VISIBLE)} size={15} color='white' />
                    </TouchableHighlight>
                </View>
                <TouchableHighlight style={styles.loginButton} onPress={this.onLogin.bind(this)}>
                    <Text style={styles.loginText}>Log In</Text>    
                </TouchableHighlight>       
            </View>
        </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: Style.colors.background
  },
  title: {
    fontSize: 70,
    marginBottom: 30,
    fontWeight: 'bold'
  },
  form: {
    width: Style.sizes.fieldWidth,
    alignItems: 'center',
  },
  field: {
    width: '100%',
    backgroundColor: Style.colors.formField,
    margin: 10,
    borderRadius: Style.sizes.border_radius,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    color: Style.colors.text,
    flexGrow: 1
  },
  loginButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: Style.colors.formField,
    borderRadius: Style.sizes.border_radius,
    padding: 10,
    alignItems: 'center'
  },
  loginText: {
      color: Style.colors.text
  },
  errorBox: {
      borderRadius: Style.sizes.border_radius,
      borderWidth: 1,
      borderColor: Style.colors.errorBorder,
      width: '100%',
      padding: 10,
      backgroundColor: Style.colors.errorBackground
  }
});

const mapStateToProps = (state) => {
  const userLogin = {...state.userLogin};
  return { userLogin }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    login,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
