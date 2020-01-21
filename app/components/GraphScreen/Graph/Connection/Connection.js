import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Animated } from 'react-native';
import Style from '../../../../helpers/style/style';
import ProfileSymbol from '../../../common/ProfileSymbol/ProfileSymbol';
import Popup from './Popup';
import userService from '../../../../demoDB/Users/userService';
import { commonRoutesName } from '../../../common/routes/commonRoutes';
import { connect } from 'react-redux';
import Routes from '../../../Routes';

class Connection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      popPosition: {
        x: 0, y: 0, open: false
      },
      mostVolunteers: [],
      sub_mostVolunteers: []
    }
    this.popAnimation = new Animated.Value(0);
  }

  componentDidMount() {
    let mostVolunteers = userService.getUser15MostVolunteers(this.props.userLogin.userId);
    if(mostVolunteers.length < 15) {
      this.setState({
        mostVolunteers: mostVolunteers.slice(0, Math.round(mostVolunteers.length/3)),
        sub_mostVolunteers: mostVolunteers.slice(Math.round(mostVolunteers.length/3), mostVolunteers.length)
      })
    } else {
      this.setState({
        mostVolunteers: mostVolunteers.slice(0, 5),
        sub_mostVolunteers: mostVolunteers.slice(5, 15)
      })
    }

  }

  symbolSize = 45;
  bigCircleSize = Dimensions.get('window').width*0.90;
  smallCicleSize = this.bigCircleSize*0.7;

  calculateLocation(circleSize, deg) {
    let radius = circleSize / 2;
    let center = radius;
    let angleRad = deg * Math.PI / 180; // deg to rad
    return {
      x: radius * Math.cos(angleRad) + center - this.symbolSize / 2,
      y: radius * Math.sin(angleRad) + center - this.symbolSize / 2
    }
  }

  openPopUp(event) {
    let position = {
      x: event.touchHistory.touchBank[0].currentPageX,
      y: event.touchHistory.touchBank[0].currentPageY-230
    };
    if(this.state.popPosition.open) {
      this.setState((prevState) => {
        return {
          popPosition: {
            ...prevState.popPosition,
            open: false
          }
        }
      });
    } else {
      this.setState({
        popPosition: {
          ...position,
          open: true
        }
      });
    }
  }

  navigateToProfile(userData) {
    this.props.navigate(Routes.Screens.PROFILE.routeName, {userData: userData})
  }

  render() {
    return (
        <View style={styles.connectionsBox}>
          <View style={{...styles.circle, width: this.bigCircleSize}}>
          {
            this.state.sub_mostVolunteers.map((user, i) => (
              <ProfileSymbol
                key={i}
                src={user.userDetails.profileImage}
                size={this.symbolSize}
                press={this.navigateToProfile.bind(this, user.userDetails)}
                showCash={true}
                cash={user.count}
                style={{
                  position: 'absolute',
                  top: this.calculateLocation(this.bigCircleSize, (360/this.state.sub_mostVolunteers.length)*(i+1)).y,
                  left: this.calculateLocation(this.bigCircleSize, (360/this.state.sub_mostVolunteers.length)*(i+1)).x
                }}
              />
            ))
          }
            <View style={{...styles.circle, width: this.smallCicleSize}}>
              {
                this.state.mostVolunteers.map((user, i) => (
                  <ProfileSymbol
                    key={i}
                    src={user.userDetails.profileImage}
                    size={this.symbolSize+10}
                    press={this.navigateToProfile.bind(this, user.userDetails)}
                    showCash={true}
                    cash={user.count}
                    style={{
                      position: 'absolute',
                      top: this.calculateLocation(this.smallCicleSize, 50+(360/this.state.mostVolunteers.length)*(i+1)).y,
                      left: this.calculateLocation(this.smallCicleSize, 50+(360/this.state.mostVolunteers.length)*(i+1)).x
                    }}
                  />
                ))
              }
              <View style={styles.imageBox}>
                <ProfileSymbol src={this.props.userLogin.profileImage} size={130} />
              </View>
            </View>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  connectionsBox: {
    padding: 30,
    position: 'relative'
  },
  circle: {
    borderRadius: 999,
    borderWidth: 2,
    borderColor: 'green',
    borderStyle: 'dotted',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  imageBox: {
    padding: 1,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: Style.colors.lightMain
  },

  pop: {
    width: 100,
    backgroundColor: Style.colors.popup,
    borderRadius: 20,
    position: 'absolute'
  }
});

const mapStateToProps = (state) => {
  const userLogin = {...state.userLogin};
  return { userLogin }
};

export default connect(mapStateToProps)(Connection);
