import React, { Component } from 'react';
import Style from 'Style/style';
// Components
import { StyleSheet, Text, View, Image } from 'react-native';
import ProfileSymbol from 'ProfileSymbol/ProfileSymbol';
import userService from 'DemoDB/Users/userService';
import actionsType from "DemoDB/Users/actions.type";


export default class Action extends Component {

    constructor(props) {
        super(props);
        this.state = {
            otherUser: undefined
        }
    }

    componentDidMount() {
        let user  = userService.getUserById(this.props.data.user);
        this.setState({ otherUser: user });
    }

    renderActionContent() {
        switch (this.props.data.type) {
            case actionsType.SEND_EMOJI:
                return (
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={styles.action}>{this.props.data.type} </Text>
                        <Image style={{width: 15, height: 16}} source={this.props.data.emoji.url} />
                        <Text style={styles.action}> to </Text>
                        <Text style={{...styles.action, fontWeight: 'bold'}}>{this.state.otherUser.userName}</Text>
                        <Text style={styles.action}> in total {this.props.data.emoji.value}$.</Text>
                    </View>
                )
                break;
            case actionsType.GET_EMOJI:
                return (
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={{...styles.action, fontWeight: 'bold'}}>{this.state.otherUser.userName} </Text>
                        <Text style={styles.action}>{this.props.data.type} </Text>
                        <Image style={{width: 15, height: 16}} source={this.props.data.emoji.url} />
                        <Text style={styles.action}> in total {this.props.data.emoji.value}$.</Text>
                    </View>
                )
                break;
            case actionsType.START_FOLLOW:
                return (<Text style={styles.action}>{this.props.data.type} <Text style={{fontWeight: 'bold'}}>{this.state.otherUser.userName}</Text>.</Text>);
                break;
            case actionsType.START_FOLLOW_YOU:
                return (<Text style={styles.action}><Text style={{fontWeight: 'bold'}}>{this.state.otherUser.userName}</Text> {this.props.data.type}.</Text>);
                break;
            case actionsType.NEW_PHOTO:
                return (<Text style={styles.action}>{this.props.data.type}.</Text>);
                break;
            case actionsType.GET_HEART:
                return (<Text style={styles.action}><Text style={{fontWeight: 'bold'}}>{this.state.otherUser.userName}</Text> {actionsType}.</Text>);
                break;
            case actionsType.SEND_HEART:
                return (<Text style={styles.action}>{this.props.data.type} <Text style={{fontWeight: 'bold'}}>{this.state.otherUser.userName}</Text>.</Text>);
                break;
            case actionsType.DEPOSIT:
                return (<Text style={styles.action}>{this.props.data.type} {this.props.data.count}.</Text>);
                break;
            case actionsType.WITHDRAW: 
                return (<Text style={styles.action}>{this.props.data.type} {this.props.data.count}.</Text>);
                break;
            default: return '';
        }
    }

  render() {
    if(!this.state.otherUser) {
        return (<View></View>)
    }
    return (
      <View style={styles.container}>
        <ProfileSymbol src={this.state.otherUser.profileImage} size={40} style={{margin: 5}} />
        <View style={styles.content}>
            {this.renderActionContent()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%'
    },
    content: {
        flexDirection: 'row'
    },
    name: {
        fontSize: 16,
        color: Style.colors.text,
        fontWeight: 'bold'
    },
    action: {
        fontSize: 16,
        color: Style.colors.text
    }
});