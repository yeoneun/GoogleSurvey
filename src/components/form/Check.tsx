import GlobalStyle from "@styles/GlobalStyles";
import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  checked?: boolean;
  setChecked?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export default function Check(props: Props) {
  const { checked, setChecked, label, disabled } = props;

  if (!label) {
    return <View style={layout.button} />;
  }

  return (
    <Pressable onPress={() => setChecked && setChecked(!checked)} disabled={disabled} style={layout.container}>
      <View style={[layout.button, checked && layout.buttonOn]}>
        {checked && <Ionicons name="checkmark-sharp" size={14} color="white" />}
      </View>
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
    borderRadius: 2,
    borderWidth: 2,
    borderColor: "#BDBDBD",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonOn: {
    borderColor: GlobalStyle.point.color,
    backgroundColor: GlobalStyle.point.color,
  },
  label: {
    fontSize: 15,
    marginLeft: 15,
    flex: 1,
  },
});
