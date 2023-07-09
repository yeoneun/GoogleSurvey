import GlobalStyle from "@styles/GlobalStyles";
import React, { useRef } from "react";
import { TextInput as RNTextInput, TextInputProps, StyleSheet, View, ViewStyle } from "react-native";
import Dash from "react-native-dash";

interface Props extends TextInputProps {
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  containerStyle?: ViewStyle;
}

export default function TextInput(props: Props) {
  const { onFocus, onBlur, disabled, containerStyle } = props;
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
    <View style={[layout.container, containerStyle]}>
      <RNTextInput
        {...props}
        ref={inputRef}
        placeholderTextColor={GlobalStyle.placeholder.color}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[layout.textInput, disabled && layout.disabledTextInput, props.style]}
        editable={!disabled}
      />
      {disabled && (
        <Dash
          dashGap={1}
          dashLength={2}
          dashThickness={1}
          dashColor={GlobalStyle.gray.borderColor}
          style={layout.dash}
        />
      )}
    </View>
  );
}

const layout = StyleSheet.create({
  container: { flex: 1 },
  textInput: {
    fontSize: 14,
    paddingVertical: 14 * 0.5,
    borderBottomWidth: 1,
    borderColor: GlobalStyle.gray.borderColor,
  },
  focusedTextInput: {
    borderBottomWidth: 2,
    borderColor: GlobalStyle.point.color,
  },
  disabledTextInput: {
    borderBottomWidth: 0,
  },
  dash: {
    width: "100%",
    height: 1,
  },
});
