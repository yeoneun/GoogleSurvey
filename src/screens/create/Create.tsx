import React, { useEffect, useRef, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import Wrapper from "@components/layout/Wrapper";
import Head from "./components/Head";
import { Ionicons } from "@expo/vector-icons";
import GlobalStyle from "@styles/GlobalStyles";
import Form from "./components/Form";
import BottomSheet from "@components/actionSheet/BottomSheet";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { FormTypes, addForm, setFormType } from "utils/redux/slices/formSlice";
import RNBottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import { Animated } from "react-native";

export default function HomeScreen() {
  const formTypeSheet = useRef<RNBottomSheet>(null);
  const floatingButtonBottom = useRef(new Animated.Value(30)).current;
  const form = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();

  const [currentFormIndex, setCurrentFormIndex] = useState(0);

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

  const openFormTypeSheet = (formIndex: number) => {
    setCurrentFormIndex(formIndex);
    formTypeSheet.current?.expand();
  };

  const dispatchFormType = (type: FormTypes) => {
    dispatch(setFormType({ index: currentFormIndex, value: type }));
    formTypeSheet.current?.close();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -200}
    >
      <ScrollView contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps="handled">
        <SafeAreaView>
          <Wrapper>
            <Head />
            <View style={layout.formContainer}>
              {form.forms.map((item, index) => (
                <Form key={`form_${index}`} index={index} onPressOptionType={openFormTypeSheet} />
              ))}
            </View>
          </Wrapper>
        </SafeAreaView>
      </ScrollView>

      <Animated.View style={[addButton.container, { bottom: floatingButtonBottom }]}>
        <Pressable onPress={() => dispatch(addForm())}>
          <Ionicons name="add-sharp" size={32} color={"white"} />
        </Pressable>
      </Animated.View>

      <BottomSheet ref={formTypeSheet} title="설문 유형">
        <TouchableOpacity onPress={() => dispatchFormType("shortText")} style={optionType.item}>
          <MaterialIcons name="short-text" size={24} />
          <Text style={optionType.label}>단답형</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatchFormType("longText")} style={optionType.item}>
          <MaterialIcons name="notes" size={24} />
          <Text style={optionType.label}>장문형</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatchFormType("radio")} style={optionType.item}>
          <MaterialIcons name="radio-button-checked" size={24} />
          <Text style={optionType.label}>객관식 질문</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatchFormType("check")} style={optionType.item}>
          <MaterialIcons name="check-box" size={24} />
          <Text style={optionType.label}>체크박스</Text>
        </TouchableOpacity>
      </BottomSheet>
    </KeyboardAvoidingView>
  );
}

const layout = StyleSheet.create({
  formContainer: { paddingBottom: 100 },
});

const optionType = StyleSheet.create({
  item: { flexDirection: "row", alignItems: "center", height: 42 },
  label: { fontSize: 15, paddingLeft: 12, fontWeight: "500", flex: 1 },
});

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
