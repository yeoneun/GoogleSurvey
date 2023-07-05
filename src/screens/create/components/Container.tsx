import React, { ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import GlobalStyle from "@styles/GlobalStyles";

interface Props {
  children: ReactNode;
  style?: ViewStyle;
}

export default function Container(props: Props) {
  const { children, style } = props;
  return <View style={[layout.container, style]}>{children}</View>;
}

const layout = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 27,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: GlobalStyle.gray.borderColor,
  },
});
