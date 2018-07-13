import React, { Component } from "react";

import { StyleSheet, Text, View, Image, TextInput, Button } from "react-native";

export class EndGame extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { numQs: 0, time: "2:00" };
  }
  render() {
    return (
      <View>
        <Text style={styles.welcome}>{this.props.mess}</Text>
        <Image
          style={{
            height: 200,
            width: 300,

            borderWidth: 5,
            borderRadius: 40,
            borderColor: "red",
            padding: 3
          }}
          source={this.props.pic}
        />
        <View>
          <TextInput
            keyboardType="numeric"
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={text => {
              this.setState({
                text: text
              });
              this.props.onPrefs("numQs", Number(text));
            }}
          />
        </View>
        <View>
          <TextInput
            keyboardType="numeric"
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={text =>
              this.setState({
                text: text
              })
            }
          />
        </View>
        <Button
          onPress={() => {
            this.props.onClick();
          }}
          title="START"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  list: {
    justifyContent: "center"
  }
});
