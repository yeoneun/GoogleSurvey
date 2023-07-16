import GlobalStyle from "@styles/GlobalStyles";
import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TextInput as RNTextInput,
} from "react-native";
import TextInput from "./TextInput";

interface Props {
  checked?: boolean;
  onPress?: (label: string) => void;
  label?: string;
  value?: string;
  disabled?: boolean;
  useTextInput?: boolean;
}

export default function Radio(props: Props) {
  const { checked, onPress, label, value, disabled, useTextInput } = props;
  const text = useRef<RNTextInput>(null);

  if (!label) {
    return <View style={layout.button} />;
  }

  useEffect(() => {
    if (!checked) {
      return;
    }
    text.current?.focus();
  }, [checked]);

  const onChangeText = () => {
    if (checked || !onPress || !value) {
      return;
    }
    onPress(value);
  };

  return (
    <Pressable
      onPress={() => onPress && value && onPress(value)}
      disabled={disabled}
      style={layout.container}
    >
      <View style={[layout.button, checked && layout.buttonOn]}>
        {checked && <View style={layout.on} />}
      </View>
      <Text style={layout.label}>{label}</Text>
      {useTextInput && (
        <TextInput
          ref={text}
          onChangeText={onChangeText}
          underline
          style={{ marginLeft: 15 }}
        />
      )}
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
  },
});
