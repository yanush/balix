import React, { Component } from 'react';
import Style from 'Style/style';

// Components
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import Header from 'Header/Header';
import GenderGraph from './GenderGraph/GenderGraph';
import CashEarn from './CashEarn/CashEarn';
import FollowersGraph from './FollowersGraph/FollowersGraph';
import Connection from './Connection/Connection';


export default class Graph extends Component {
  static navigationOptions = ({ navigation }) => {
      return {
        headerTitle: () => <Header {...navigation} />,
      };
  }
  
  render() {
    return (
      <View style={{flex:1}}>
        <ScrollView >
          <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <GenderGraph style={styles.box} width={Dimensions.get('window').width*0.45} height={80} />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <FollowersGraph style={styles.box} fill='rgba(255, 255, 255, 0.3)' width={Dimensions.get('window').width*0.48} height={80} />
              <CashEarn style={styles.box} fill='rgba(255, 255, 255, 0.3)' width={Dimensions.get('window').width*0.48} height={80} />
            </View>
            <Connection {...this.props.navigation} />
          </View>
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Style.colors.background,
      alignItems: 'center',
      paddingTop: 10
    },
    box: {
      marginBottom: 10
    }
});