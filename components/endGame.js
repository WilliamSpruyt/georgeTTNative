import React, { Component } from "react";

import { StyleSheet, Text, View, Image, TextInput } from "react-native";

export class EndGame extends Component<Props> {
  constructor(props) {
    super(props);
  }
  render() {
    if (!this.props.hidden) {
      return (
        <View>
          <Image
            style={{
              height: 100,

              borderWidth: 5,
              borderRadius: 40,
              borderColor: "red",
              padding: 3
            }}
            source={this.props.pic}
          />
          <Text>{this.props.mess}</Text>
        </View>
      );
    } else {
      return null;
    }
  }
}
