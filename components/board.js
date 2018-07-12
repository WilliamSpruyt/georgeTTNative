import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
export class Board extends Component<Props> {
  render() {
    return (
      <Text>
        {"Score " + this.props.score}
        {" Time " + this.props.time}
      </Text>
    );
  }
}
