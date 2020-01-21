import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Image, Text, ScrollView, TouchableHighlight } from 'react-native';
import Style from '../../helpers/style/style';
import { connect } from 'react-redux';
import { Dropdown } from 'react-native-material-dropdown';
import Icon, { iconNames } from './Icon/Icon';
import { Formik } from 'formik';

class WithdrawScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarVisible: false
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      form: {
        bankCountry: '',
        fullName: '',
        accountName: '',
        bankName: '',
        bankCode: '',
        branchCode: '',
        accountNumber: ''
      }
  }
  }

  formChange(fieldName, value) {
    this.setState((prevState) => {
      return {
        ...prevState,
        form: {
          ...prevState.form,
          [fieldName]: value
        }
      }
    })
  }

  componentDidMount() {
    fetch('https://restcountries.eu/rest/v2/all').then((response) => response.json())
    .then((result) => {
      let allCountries = result.map((c) => {
        return {
          value: c.name
        }
      });
      this.setState({ countries: allCountries });
    });
  }

  render() {
    return (

      <View style={{flex: 1, position: 'relative', backgroundColor: Style.colors.background, justifyContent: 'center'}}>
        <Image style={{height: '100%', width: '100%', position: 'absolute', top: 0, left: 0, opacity: 0.1}} source={this.props.userLogin.profileImage} />
        <View>
          <TouchableHighlight onPress={() => this.props.navigation.goBack()} style={{padding: 15}}>
            <Icon name={iconNames.LEFT_CHEVRON} size={25} color={'white'} />
          </TouchableHighlight>
        </View>
        <ScrollView style={{width: '100%'}}>
          <View style={{alignItems: 'center'}}>
            <Formik
              onSubmit={values => console.log(values)}
              initialValues={{
                bankCountry: '',
                fullName: '',
                accountName: '',
                bankName: '',
                bankCode: '',
                branchCode: '',
                accountNumber: ''
              }}
            >
              {
                ({ handleChange, handleBlur, handleSubmit, values }) => (
                  <View style={styles.form}>
                  <Text style={styles.title}>Link a bank account</Text>
                  <Text style={styles.sub_title}>Withdraw your money in the app by writing your bank account.</Text>

                  <Dropdown
                    label='Country of bank'
                    data={this.state.countries}
                    baseColor={Style.colors.text}
                    itemColor='black'
                    itemCount={10}
                    value={values.bankCountry}
                    onChangeText={handleChange('bankCountry')}
                    containerStyle={{marginBottom: 5}}
                  />
                  <TextInput
                    onChangeText={handleChange('fullName')}
                    value={values.fullName}
                    placeholderTextColor={Style.colors.text}
                    style={styles.input}
                    placeholder='Name & surname'
                  />
                  <TextInput
                    onChangeText={handleChange('accountName')}
                    value={values.accountName}
                    placeholderTextColor={Style.colors.text}
                    style={styles.input}
                    placeholder='Name on account'
                  />
                  <TextInput
                    onChangeText={handleChange('bankName')}
                    value={values.bankName}
                    placeholderTextColor={Style.colors.text}
                    style={styles.input}
                    placeholder='Bank name'
                  />
                  <TextInput
                    onChangeText={handleChange('bankCode')}
                    value={values.bankCode}
                    placeholderTextColor={Style.colors.text}
                    style={styles.input}
                    placeholder='Bank code'
                  />
                  <TextInput
                    onChangeText={handleChange('branchCode')}
                    value={values.branchCode}
                    placeholderTextColor={Style.colors.text}
                    style={styles.input}
                    placeholder='Branch code'
                  />
                  <TextInput
                    onChangeText={handleChange('accountNumber')}
                    value={values.accountNumber}
                    placeholderTextColor={Style.colors.text}
                    style={styles.input}
                    placeholder='Account number'
                  />
                  <View style={{alignItems: 'center'}}>
                    <TouchableHighlight onPress={handleSubmit} style={{width: '50%', backgroundColor: '#a8c602', borderRadius: 20, alignItems: 'center'}}>
                      <Text style={{color: Style.colors.text, paddingVertical: 5, paddingHorizontal: 10}}>Save Account</Text>
                    </TouchableHighlight>
                  </View>
                </View>
                )
              }
            </Formik>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    width: '80%',
    marginVertical: 30,
    backgroundColor: 'rgba(11,178,178,0.3)',
    borderRadius: 10,
    borderColor: Style.colors.darkMain,
    borderWidth: 1,
    padding: 15
  },
  title: {
    color: Style.colors.text,
    fontSize: 20,
    marginTop: 10
  },
  sub_title: {
    color: Style.colors.text,
    marginTop: 6,
    marginBottom: 30
  },
  input: {
    color: Style.colors.text,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: Style.colors.text,
    borderWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginBottom: 10
  }
})

const mapStateToProps = (state) => {
  return {
    userLogin: state.userLogin
  }
};

export default connect(mapStateToProps)(WithdrawScreen);
