import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

interface Props {
  children: ReactNode;
}
export default function Wrapper(props: Props) {
  const { children } = props;

  return <View style={layout.container}>{children}</View>;
}

const layout = StyleSheet.create({
  container: { paddingHorizontal: 12 },
});
