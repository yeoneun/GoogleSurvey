import React, { useRef } from "react";
import { StyleSheet, Animated } from "react-native";
import GlobalStyle from "styles/GlobalStyles";
import TextDecoration from "@components/form/TextDecoration";
import Container from "./Container";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { setDescription, setTitle } from "utils/redux/slices/formSlice";
import TextInput from "@components/form/TextInput";

export default function Head() {
  const form = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();

  const dispatchTitle = (value: string) => dispatch(setTitle(value));
  const dispatchDescription = (value: string) => dispatch(setDescription(value));

  const titleAreaMarginTop = useRef(new Animated.Value(0)).current;
  const titleAreaDecorationHeight = useRef(new Animated.Value(0)).current;
  const descriptionAreaMarginTop = useRef(new Animated.Value(10)).current;
  const descriptionAreaDecorationHeight = useRef(new Animated.Value(0)).current;

  const onTitleFocus = () => {
    Animated.parallel([
      Animated.timing(titleAreaMarginTop, {
        toValue: 24,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(titleAreaDecorationHeight, {
        toValue: 37,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };
  const onTitleBlur = () => {
    Animated.parallel([
      Animated.timing(titleAreaMarginTop, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(titleAreaDecorationHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };
  const onDescriptonFocus = () => {
    Animated.parallel([
      Animated.timing(descriptionAreaMarginTop, {
        toValue: 24,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(descriptionAreaDecorationHeight, {
        toValue: 37,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };
  const onDescriptonBlur = () => {
    Animated.parallel([
      Animated.timing(descriptionAreaMarginTop, {
        toValue: 10,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(descriptionAreaDecorationHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <Container style={layout.container}>
      <Animated.View style={{ marginTop: titleAreaMarginTop }}>
        <TextInput
          value={form.title}
          onChangeText={dispatchTitle}
          placeholder="설문지 제목"
          placeholderTextColor={GlobalStyle.placeholder.color}
          style={layout.titleInput}
          onFocus={onTitleFocus}
          onBlur={onTitleBlur}
          multiline
        />
        <Animated.View style={[layout.textDecorationArea, { height: titleAreaDecorationHeight }]}>
          <TextDecoration />
        </Animated.View>
      </Animated.View>
      <Animated.View style={{ marginTop: descriptionAreaMarginTop }}>
        <TextInput
          value={form.description}
          onChangeText={dispatchDescription}
          placeholder="설문지 설명"
          placeholderTextColor={GlobalStyle.placeholder.color}
          onFocus={onDescriptonFocus}
          onBlur={onDescriptonBlur}
          style={layout.descriptionInput}
          multiline
        />
        <Animated.View style={[layout.textDecorationArea, { height: descriptionAreaDecorationHeight }]}>
          <TextDecoration />
        </Animated.View>
      </Animated.View>
    </Container>
  );
}

const layout = StyleSheet.create({
  container: {
    borderTopColor: GlobalStyle.point.color,
    borderTopWidth: 8,
    marginTop: 10,
  },
  textDecorationArea: { overflow: "hidden" },
  titleInput: {
    fontSize: 28,
    fontWeight: "500",
    paddingVertical: 28 * 0.2,
  },
  descriptionInput: {
    fontSize: 15,
    paddingVertical: 15 * 0.2,
    borderBottomWidth: 1,
    borderColor: GlobalStyle.gray.borderColor,
  },
});
