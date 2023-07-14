import React, { ReactNode, useEffect, useState } from "react";
import { KeyboardAvoidingView, Keyboard, Platform, StyleSheet } from "react-native";

interface Props {
  children: ReactNode;
}

export default function CustomKeyboardAvoidingView(props: Props) {
  const { children } = props;
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener("keyboardWillShow", () => {
      setIsKeyboardVisible(true);
    });
    const keyboardWillHideListener = Keyboard.addListener("keyboardWillHide", () => {
      setIsKeyboardVisible(true);
    });
    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  });

  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      keyboardVerticalOffset={isKeyboardVisible ? (Platform.OS === "android" ? -500 : 0) : 0}
      style={layout.container}
    >
      {children}
    </KeyboardAvoidingView>
  );
}

const layout = StyleSheet.create({
  container: { flex: 1, flexDirection: "column", justifyContent: "center" },
});
