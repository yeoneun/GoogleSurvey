import * as React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  children: JSX.Element;
}
export default function Wrapper(props: Props) {
  const { children } = props;

  return <View style={layout.container}>{children}</View>;
}

const layout = StyleSheet.create({
  container: { paddingHorizontal: 12 },
});
