import GlobalStyle from "@styles/GlobalStyles";
import React from "react";
import { TextInput as RNTextInput, TextInputProps, ViewProps } from "react-native";

export default function TextInput(props: TextInputProps) {
  return <RNTextInput {...props} placeholderTextColor={GlobalStyle.placeholder.color} />;
}
