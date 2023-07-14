import React, { ReactNode } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

interface Props {
  children: ReactNode;
  style?: ViewStyle;
}
export default function Wrapper(props: Props) {
  const { children, style } = props;

  return <View style={[layout.container, style]}>{children}</View>;
}

const layout = StyleSheet.create({
  container: { paddingHorizontal: 12 },
});
