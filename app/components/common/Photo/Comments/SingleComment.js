import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { textColor } from '../../../../common/style';

export default class SingleComment extends Component {
    // Props = [ data ]

  render() {
    return (
        <View style={{flexDirection: 'row'}}>
            <Text style={styles.name}>{this.props.data.user}: </Text>
            <Text style={styles.content}>{this.props.data.comment}</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    name: {
        fontSize: 16,
        color: textColor,
        fontWeight: 'bold'
    },
    content: {
        fontSize: 16,
        color: textColor
    }
});
