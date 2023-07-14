import React, { useRef } from "react";
import { StyleSheet, Animated, SafeAreaView } from "react-native";
import GlobalStyle from "styles/GlobalStyles";
import TextDecoration from "@components/form/TextDecoration";
import Container from "./Container";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { setDescription, setTitle } from "utils/redux/slices/formSlice";
import TextInput from "@components/form/TextInput";
import { removeFocusedFormIndex, setHeadFocused } from "utils/redux/slices/focusSlice";
import Wrapper from "@components/layout/Wrapper";

export default function Head() {
  const form = useAppSelector((state) => state.form);
  const { headFocused } = useAppSelector((state) => state.focus);
  const dispatch = useAppDispatch();

  const dispatchTitle = (value: string) => dispatch(setTitle(value));
  const dispatchDescription = (value: string) => dispatch(setDescription(value));

  const titleAreaMarginTop = useRef(new Animated.Value(0)).current;
  const titleAreaDecorationHeight = useRef(new Animated.Value(0)).current;
  const descriptionAreaMarginTop = useRef(new Animated.Value(10)).current;
  const descriptionAreaDecorationHeight = useRef(new Animated.Value(0)).current;

  const onHeadFocused = () => {
    dispatch(removeFocusedFormIndex());
    dispatch(setHeadFocused(true));
  };

  const onTitleFocus = () => {
    onHeadFocused();
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
    dispatch(setHeadFocused(false));
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
    onHeadFocused();
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
    dispatch(setHeadFocused(false));
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
    <SafeAreaView>
      <Wrapper>
        <Container focused={headFocused} style={layout.container}>
          <Animated.View style={{ marginTop: titleAreaMarginTop }}>
            <TextInput
              value={form.title}
              onChangeText={dispatchTitle}
              placeholder="설문지 제목"
              style={layout.titleInput}
              onFocus={onTitleFocus}
              onBlur={onTitleBlur}
              multiline
              scrollEnabled={false}
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
              onFocus={onDescriptonFocus}
              onBlur={onDescriptonBlur}
              style={layout.descriptionInput}
              multiline
              scrollEnabled={false}
            />
            <Animated.View style={[layout.textDecorationArea, { height: descriptionAreaDecorationHeight }]}>
              <TextDecoration />
            </Animated.View>
          </Animated.View>
        </Container>
      </Wrapper>
    </SafeAreaView>
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
