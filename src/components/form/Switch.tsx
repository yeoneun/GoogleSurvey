import React from "react";
import { Switch as RNSwitch, SwitchProps } from "react-native";
import GlobalStyle from "@styles/GlobalStyles";

export default function Switch(props: SwitchProps) {
  return (
    <RNSwitch
      {...props}
      trackColor={{ false: "#B9B9B9", true: GlobalStyle.point.backgroundColor }}
      thumbColor={props.value ? GlobalStyle.point.color : "white"}
    />
  );
}
