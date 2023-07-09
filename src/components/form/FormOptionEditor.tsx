import React, { useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import TextInput from "./TextInput";
import { Ionicons } from "@expo/vector-icons";
import GlobalStyle from "@styles/GlobalStyles";

interface Props {
  value: string;
  setValue: (value: string) => void;
}

export default function FormOptionEditor(props: Props) {
  const { value, setValue } = props;

  const imageButtonWidth = useRef(new Animated.Value(0)).current;

  const onFocus = () => {
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
      <TextInput value={value} onChangeText={setValue} onFocus={onFocus} onBlur={onBlur} style={layout.textInput} />
      <Animated.View style={[layout.iconButton, { width: imageButtonWidth }]}>
        <Ionicons name="image" size={20} color={GlobalStyle.lineIcon.color} />
      </Animated.View>
    </>
  );
}
const layout = StyleSheet.create({
  textInput: { marginLeft: 10, height: 40, fontSize: 15, flex: 1 },
  iconButton: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
});
