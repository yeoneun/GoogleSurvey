import GlobalStyle from "@styles/GlobalStyles";
import React, { useRef } from "react";
import { TextInput as RNTextInput, TextInputProps, StyleSheet } from "react-native";

interface Props extends TextInputProps {
  onFocus?: () => void;
  onBlur?: () => void;
}

export default function TextInput(props: Props) {
  const { onFocus, onBlur } = props;
  const inputRef = useRef<RNTextInput>(null);

  const handleFocus = (): void => {
    inputRef.current?.focus();
    inputRef.current?.setNativeProps({
      style: [layout.textInput, layout.focusedTextInput],
    });
    onFocus && onFocus();
  };

  const handleBlur = (): void => {
    inputRef.current?.blur();
    inputRef.current?.setNativeProps({
      style: layout.textInput,
    });
    onBlur && onBlur();
  };

  return (
    <RNTextInput
      {...props}
      ref={inputRef}
      placeholderTextColor={GlobalStyle.placeholder.color}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={[layout.textInput, props.style]}
    />
  );
}

const layout = StyleSheet.create({
  textInput: {
    borderBottomWidth: 1,
    borderColor: GlobalStyle.gray.borderColor,
  },
  focusedTextInput: {
    borderBottomWidth: 2,
    borderColor: GlobalStyle.point.color,
  },
});
