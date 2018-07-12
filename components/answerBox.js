import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { FormControl } from "react-bootstrap";
export class AnswerBox extends Component<Props> {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.handleChange(
      this.id,
      event.target.value === String(this.props.answer) ? true : false
    );
  }

  render() {
    if (this.props.ticked === false) {
      return (
        <View>
          <TextInput
            keyboardType="numeric"
            autoFocus={this.props.focMe}
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={text =>
              this.setState(
                {
                  text: text
                },
                () => {
                  this.props.handleChange(
                    this.id,
                    text === String(this.props.answer) ? true : false
                  );
                }
              )
            }
          />
        </View>
      );
    } else if (this.props.ticked === true)
      return (
        <View>
          <Text>{this.props.answer + " YAY"}</Text>
        </View>
      );
  }
}
