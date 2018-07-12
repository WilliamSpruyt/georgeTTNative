import React, { Component } from "react";
import { AnswerBox } from "./answerBox";
import { StyleSheet, Text, View, Image } from "react-native";
//import { AnswerBox } from "./answerBox";
import { Col } from "react-bootstrap";
export class Question extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.question}>
          {this.props.x} {"\u00D7"} {this.props.y}
          {"="}
        </Text>

        <AnswerBox
          focMe={this.props.focMe}
          id={this.props.id}
          handleChange={this.props.handleChange}
          answer={this.props.x * this.props.y}
          ticked={this.props.ticked}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  question: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 30
  },
  red: {
    color: "red"
  },
  container: {
    flexDirection: "row",
    alignSelf: "flex-start"
  }
});
