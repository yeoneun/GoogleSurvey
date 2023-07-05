import React from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import { IconButton } from "@react-native-material/core";
import { FontAwesome5 } from "@expo/vector-icons";
import GlobalStyle from "@styles/GlobalStyles";

export default function TextDecoration() {
  return (
    <>
      <View style={layout.container}>
        <TouchableHighlight onPress={() => {}} underlayColor={"red"} style={layout.item}>
          <FontAwesome5 name="bold" size={18} color={GlobalStyle.lineIcon.color} />
        </TouchableHighlight>
        <TouchableHighlight underlayColor={"red"} style={layout.item}>
          <FontAwesome5 name="italic" size={18} color={GlobalStyle.lineIcon.color} />
        </TouchableHighlight>
        <TouchableHighlight style={layout.item}>
          <FontAwesome5 name="underline" size={18} color={GlobalStyle.lineIcon.color} />
        </TouchableHighlight>
        <TouchableHighlight style={layout.item}>
          <FontAwesome5 name="link" size={18} color={GlobalStyle.lineIcon.color} />
        </TouchableHighlight>
        <TouchableHighlight style={layout.item}>
          <FontAwesome5 name="strikethrough" size={18} color={GlobalStyle.lineIcon.color} />
        </TouchableHighlight>
      </View>
    </>
  );
}

const layout = StyleSheet.create({
  container: { flexDirection: "row", marginTop: 5 },
  item: {
    width: 32,
    height: 32,
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});
