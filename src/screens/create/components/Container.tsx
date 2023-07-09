import React, { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import GlobalStyle from "@styles/GlobalStyles";

interface Props {
  children: ReactNode;
  focused?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function Container(props: Props) {
  const { children, focused, style } = props;
  return <View style={[layout.container, focused && layout.focusedContainer, style]}>{children}</View>;
}

const layout = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 27,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: GlobalStyle.gray.borderColor,
  },
  focusedContainer: {
    borderLeftWidth: 8,
    borderLeftColor: GlobalStyle.blue.color,
  },
});
