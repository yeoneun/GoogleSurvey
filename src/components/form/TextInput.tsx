import GlobalStyle from "@styles/GlobalStyles";
import React, { Ref, forwardRef, useState } from "react";
import { TextInput as RNTextInput, TextInputProps, StyleSheet, View, ViewStyle } from "react-native";
import Dash from "react-native-dash";

interface Props extends TextInputProps {
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  containerStyle?: ViewStyle;
}

const TextInput = forwardRef((props: Props, ref?: Ref<RNTextInput>) => {
  const { onFocus, onBlur, disabled, containerStyle } = props;
  const [focused, setFocused] = useState(false);

  const handleFocus = (): void => {
    setFocused(true);
    onFocus && onFocus();
  };

  const handleBlur = (): void => {
    setFocused(false);
    onBlur && onBlur();
  };

  return (
    <View style={[layout.container, containerStyle]}>
      <RNTextInput
        {...props}
        ref={ref || undefined}
        placeholderTextColor={GlobalStyle.placeholder.color}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[
          layout.textInput,
          focused && layout.focusedTextInput,
          disabled && layout.disabledTextInput,
          props.style,
        ]}
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
});

export default TextInput;

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
