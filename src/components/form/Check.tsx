import GlobalStyle from "@styles/GlobalStyles";
import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TextInput as RNTextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TextInput from "./TextInput";

interface Props {
  checked?: boolean;
  onPress?: (label: string) => void;
  label?: string;
  value?: string;
  disabled?: boolean;
  useTextInput?: boolean;
}

export default function Check(props: Props) {
  const { checked, onPress, label, value, disabled, useTextInput } = props;
  const textInput = useRef<RNTextInput>(null);

  if (!label) {
    return <View style={layout.button} />;
  }

  useEffect(() => {
    if (!checked) {
      return;
    }
    textInput.current?.focus();
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
        {checked && <Ionicons name="checkmark-sharp" size={14} color="white" />}
      </View>
      <Text style={layout.label}>{label}</Text>
      {useTextInput && (
        <TextInput
          ref={textInput}
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
  },
});
