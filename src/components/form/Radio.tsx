import GlobalStyle from "@styles/GlobalStyles";
import React, { useState } from "react";
import { View, StyleSheet, Text, ViewStyle, Pressable } from "react-native";

interface Props {
  label?: string;
  containerStyle?: ViewStyle;
}

export default function Radio(props: Props) {
  const { label, containerStyle } = props;
  const [checked, setCheckd] = useState(false);

  if (!label) {
    return <View style={layout.button} />;
  }

  return (
    <Pressable onPress={() => setCheckd((prev) => !prev)} style={[layout.container, containerStyle]}>
      <View style={[layout.button, checked && layout.buttonOn]}>{checked && <View style={layout.on} />}</View>
      <Text style={layout.label}>{label}</Text>
    </Pressable>
  );
}

const layout = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#BDBDBD",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonOn: {
    borderColor: GlobalStyle.point.color,
  },
  on: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: GlobalStyle.point.color,
  },
  label: {
    fontSize: 15,
    marginLeft: 15,
    flex: 1,
  },
});
