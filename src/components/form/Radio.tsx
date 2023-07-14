import GlobalStyle from "@styles/GlobalStyles";
import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";

interface Props {
  checked?: boolean;
  onPress?: (label: string) => void;
  label?: string;
  value?: string;
  disabled?: boolean;
}

export default function Radio(props: Props) {
  const { checked, onPress, label, value, disabled } = props;

  if (!label) {
    return <View style={layout.button} />;
  }

  return (
    <Pressable onPress={() => onPress && value && onPress(value)} disabled={disabled} style={layout.container}>
      <View style={[layout.button, checked && layout.buttonOn]}>{checked && <View style={layout.on} />}</View>
      <Text style={layout.label}>{label}</Text>
    </Pressable>
  );
}

const layout = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
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
