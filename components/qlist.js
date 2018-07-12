import React, { Component } from "react";
import { Text, Image, View, StyleSheet, ScrollView } from "react-native";

export const Qlist = function(props) {
  return <View>{props.listy.map((item, index) => <View>{item}</View>)}</View>;
};
