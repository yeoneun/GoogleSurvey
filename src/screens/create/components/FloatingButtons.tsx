import React, { useEffect, useRef } from "react";
import { StyleSheet, Keyboard, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GlobalStyle from "@styles/GlobalStyles";
import { useAppDispatch } from "hooks/useRedux";
import { addForm } from "utils/redux/slices/formSlice";
import { Animated } from "react-native";

interface Props {
  navigateToPreview: () => void;
}

export default function FloatingButtons(props: Props) {
  const { navigateToPreview } = props;
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
    <Animated.View style={[layout.container, { bottom: floatingButtonBottom }]}>
      <TouchableOpacity onPress={() => dispatch(addForm())} style={layout.button}>
        <Ionicons name="add-sharp" size={32} color={"white"} />
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToPreview} style={layout.button}>
        <Ionicons name="eye" size={24} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
}
const layout = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 30,
    backgroundColor: GlobalStyle.point.color,
    height: 52,
    borderRadius: 52 / 2,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  button: {
    width: 65,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
