import React from "react";
import { View, StyleSheet } from "react-native";

export default function Check() {
  return <View style={layout.container} />;
}

const layout = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: "#BDBDBD",
  },
});
