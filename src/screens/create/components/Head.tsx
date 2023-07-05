import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput, Animated, ViewStyle } from "react-native";
import GlobalStyle from "styles/GlobalStyles";
import TextDecoration from "@components/form/TextDecoration";
import Container from "./Container";

export default function Head() {
  const [title, setTitle] = useState("제목 없는 설문지");
  const [description, setDescription] = useState("");
  const [titleFocus, setTitleFocus] = useState(false);
  const [descriptionFocus, setDescriptionFocus] = useState(false);

  const titleAreaMarginTop = useRef(new Animated.Value(0)).current;
  const titleAreaDecorationHeight = useRef(new Animated.Value(0)).current;
  const descriptionAreaMarginTop = useRef(new Animated.Value(10)).current;
  const descriptionAreaDecorationHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (titleFocus) {
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
    } else {
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
    }
  }, [titleFocus]);

  useEffect(() => {
    if (descriptionFocus) {
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
    } else {
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
    }
  }, [descriptionFocus]);

  return (
    <Container style={layout.container}>
      <Animated.View style={[titleArea.container, { marginTop: titleAreaMarginTop }]}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="설문지 제목"
          placeholderTextColor={GlobalStyle.placeholder.color}
          onFocus={() => setTitleFocus(true)}
          onBlur={() => setTitleFocus(false)}
          style={[titleArea.textInput, titleFocus && titleArea.textInputFocus]}
          multiline
        />
        <Animated.View style={[{ overflow: "hidden" }, { height: titleAreaDecorationHeight }]}>
          <TextDecoration />
        </Animated.View>
      </Animated.View>
      <Animated.View style={[descriptionArea.container, { marginTop: descriptionAreaMarginTop }]}>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="설문지 설명"
          placeholderTextColor={GlobalStyle.placeholder.color}
          onFocus={() => setDescriptionFocus(true)}
          onBlur={() => setDescriptionFocus(false)}
          style={[descriptionArea.textInput, descriptionFocus && descriptionArea.textInputFocus]}
          multiline
        />
        <Animated.View style={[{ overflow: "hidden" }, { height: descriptionAreaDecorationHeight }]}>
          <TextDecoration />
        </Animated.View>
      </Animated.View>
    </Container>
  );
}

const sharedStyles = {
  input: {
    borderBottomWidth: 1,
    borderColor: GlobalStyle.gray.borderColor,
  },
  inputFocus: {
    borderBottomWidth: 2,
    borderColor: GlobalStyle.point.color,
  },
};

const layout = StyleSheet.create({
  container: {
    borderTopColor: GlobalStyle.point.color,
    borderTopWidth: 8,
    marginTop: 10,
  },
});

const titleArea = StyleSheet.create({
  container: {},
  textInput: {
    ...sharedStyles.input,
    fontSize: 28,
    fontWeight: "500",
    paddingVertical: 28 * 0.2,
  },
  textInputFocus: sharedStyles.inputFocus,
});

const descriptionArea = StyleSheet.create({
  container: { marginTop: 10 },
  textInput: {
    ...sharedStyles.input,
    fontSize: 15,
    paddingVertical: 15 * 0.2,
    borderBottomWidth: 1,
    borderColor: GlobalStyle.gray.borderColor,
  },
  textInputFocus: sharedStyles.inputFocus,
});
