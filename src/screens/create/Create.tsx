import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Wrapper from "@components/layout/Wrapper";
import Head from "./components/Head";
import Form from "./components/Form";
import BottomSheet from "@components/actionSheet/BottomSheet";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { FormTypes, setFormType } from "utils/redux/slices/formSlice";
import RNBottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import FloatingButtons from "./FloatingButtons";

export default function HomeScreen() {
  const formTypeSheet = useRef<RNBottomSheet>(null);
  const form = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();

  const [currentFormIndex, setCurrentFormIndex] = useState(0);

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

      <FloatingButtons />

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
