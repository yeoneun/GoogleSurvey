import React, { Ref, forwardRef, useRef } from "react";
import { Animated, StyleSheet, TextInput as RNTextInput } from "react-native";
import TextInput from "./TextInput";
import { Ionicons } from "@expo/vector-icons";
import GlobalStyle from "@styles/GlobalStyles";

interface Props {
  value: string;
  setValue: (value: string) => void;
  onFocusInput: () => void;
  onSumitLabel?: () => void;
}

const FormOptionEditor = forwardRef((props: Props, ref?: Ref<RNTextInput>) => {
  const { value, setValue, onFocusInput, onSumitLabel } = props;
  const imageButtonWidth = useRef(new Animated.Value(0)).current;

  const onFocus = () => {
    onFocusInput();
    Animated.timing(imageButtonWidth, {
      toValue: 40,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const onBlur = () => {
    Animated.timing(imageButtonWidth, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <>
      <TextInput
        ref={ref}
        value={value}
        onChangeText={setValue}
        onFocus={onFocus}
        onBlur={onBlur}
        style={layout.textInput}
        onSubmitEditing={onSumitLabel}
      />
      <Animated.View style={[layout.iconButton, { width: imageButtonWidth }]}>
        <Ionicons name="image" size={20} color={GlobalStyle.lineIcon.color} />
      </Animated.View>
    </>
  );
});
const layout = StyleSheet.create({
  textInput: { marginLeft: 10, height: 40, fontSize: 15, flex: 1 },
  iconButton: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
});

export default FormOptionEditor;
