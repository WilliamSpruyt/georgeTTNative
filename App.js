/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

var welcome = require("./images/welcome.jpg");
var success = require("./images/success.jpg");
var baby = require("./images/babyface.png");
var fail = require("./images/fail.jpg");

import { Button } from "react-native";
import { Question } from "./components/question";
import { EndGame } from "./components/endGame";
import { Board } from "./components/board";
import React, { Component } from "react";
import {
  Platform,
  Text,
  Image,
  View,
  StyleSheet,
  ScrollView,
  FlatList
} from "react-native";

type Props = {};

export default class App extends Component<Props> {
  qlist = [];
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      duration: 0,
      qstate: [],
      started: false,
      numQs: 5,
      time: "0:30",
      messagePic: null,
      message: "Welcome",
      picStyle: "welcome",
      textStyle: "welcometext",
      avTime: 0,
      inPlay: true,

      playerName: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleSlide = this.handleSlide.bind(this);
  }
  componentDidMount() {}
  handleSubmit() {
    this.setState({ score: 0 });
    this.qlist.length = 0;

    for (var i = 0; i < this.state.numQs; i++) {
      var x = Math.floor(Math.random() * 5) + 7;
      var y = Math.floor(Math.random() * 11) + 2;
      var foc = i === 0 ? true : false;

      this.qlist.push(
        <Question
          focMe={foc}
          id={i}
          x={String(x)}
          y={String(y)}
          answer={String(x * y)}
          key={this.qlist.toString() + Date()}
          handleChange={this.handleChange}
          ticked={false}
        />
      );
    }
    return this.qlist;
  }
  gameOver(mess, timer, pic) {
    clearTimeout(timer);

    this.setState({
      inPlay: false,
      qstate: [],
      time: "0:30",
      message: mess,
      messagePic: pic
    });
  }

  /*gameOver(mess, messPic, styley, txt) {
    var adjustedScore = this.state.score;
    adjustedScore += mess === "Success" ? 1 : 0;
    this.setState(
      {
        duration: ((Date.now() - this.state.startTime) / 1000).toFixed(2),
        score: adjustedScore,
        avTime: (
          (Date.now() - this.state.startTime) /
          1000 /
          adjustedScore
        ).toFixed(2)
      },
      () => {
        this.submitStat();

        this.setState(
          {
            message: mess,
            messagePic: messPic,
            score: 0,
            qstate: [],
            picStyle: styley,
            textStyle: txt
          },
          () => {
            this.setState({ started: false });
          }
        );
      }
    );
  }*/
  clock() {
    let presentTime = this.state.time;

    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = this.checkSecond(timeArray[1] - 1);
    if (s == 59) {
      m = m - 1;
    }

    this.setState({ time: m + ":" + s });
    this.timer = setTimeout(this.clock.bind(this), 1000);
    if (m == 0 && s == 0) {
      this.gameOver("You didn't do it", this.timer, fail);
    }
  }

  checkSecond(sec) {
    if (sec < 10 && sec >= 0) {
      sec = "0" + sec;
    } // add zero in front of numbers < 10
    if (sec < 0) {
      sec = "59";
    }
    return sec;
  }
  handleChange(id, right) {
    if (right) {
      if (this.state.score === this.state.numQs - 1) {
        this.setState({ score: this.state.score + 1, messagePic: welcome });
        this.gameOver("You did it", this.timer, success);
        return;
      }
      this.setState({ score: this.state.score + 1 });
      var pos = this.state.score + 1;
      if (pos < this.state.numQs) {
        let qlist = this.state.qstate.slice(0);
        let newlytickedQ = (
          <Question
            focMe={false}
            id={qlist[pos - 1].props.id}
            x={qlist[pos - 1].props.x}
            y={qlist[pos - 1].props.y}
            answer={qlist[pos - 1].props.answer}
            key={this.qlist.toString()}
            handleChange={qlist[pos - 1].props.handleChange}
            ticked={true}
          />
        );

        let newlyfocussedQ = (
          <Question
            focMe={true}
            id={qlist[pos].props.id}
            x={qlist[pos].props.x}
            y={qlist[pos].props.y}
            answer={qlist[pos].props.answer}
            key={this.qlist.toString()}
            handleChange={qlist[pos].props.handleChange}
            ticked={false}
          />
        );

        qlist.splice(pos - 1, 2, newlytickedQ, newlyfocussedQ);
        //alert("pos=" + pos + " nfq= " + newlyfocussedQ + " qlist= " + qlist);
        this.setState({ qstate: qlist });
      }
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <EndGame
          isHidden={this.state.inPlay}
          pic={this.state.messagePic}
          mess={this.state.message}
        />
        <Image
          style={{
            width: 50,
            height: 50,

            borderWidth: 5,
            borderRadius: 40,
            borderColor: "red",
            padding: 10
          }}
          source={baby}
        />
        <Text style={styles.welcome}>Welcome</Text>
        <Board time={this.state.time} score={this.state.score} />

        <Button
          onPress={() => {
            this.setState(
              { inPlay: true },
              this.setState({ qstate: this.handleSubmit() }, this.clock())
            );
          }}
          title="START"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <View style={styles.container}>
          <FlatList
            extraData={this.state}
            contentContainerStyle={styles.list}
            numColumns={2}
            data={this.state.qstate}
            renderItem={({ item }) => <View>{item}</View>}
          />
        </View>
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
