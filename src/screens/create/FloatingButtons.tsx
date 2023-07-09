import React, { useEffect, useRef } from "react";
import { Pressable, StyleSheet, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GlobalStyle from "@styles/GlobalStyles";
import { useAppDispatch } from "hooks/useRedux";
import { addForm } from "utils/redux/slices/formSlice";
import { Animated } from "react-native";

export default function FloatingButtons() {
  const dispatch = useAppDispatch();
  const floatingButtonBottom = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      Animated.timing(floatingButtonBottom, {
        toValue: -100,
        duration: 1,
        useNativeDriver: false,
      }).start();
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(floatingButtonBottom, {
        toValue: 30,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Animated.View style={[addButton.container, { bottom: floatingButtonBottom }]}>
      <Pressable onPress={() => dispatch(addForm())}>
        <Ionicons name="add-sharp" size={32} color={"white"} />
      </Pressable>
    </Animated.View>
  );
}
const addButton = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 30,
    backgroundColor: GlobalStyle.point.color,
    width: 52,
    height: 52,
    borderRadius: 32,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 2,
  },
});
