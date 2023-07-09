import React, { useRef, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
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
    <>
      <ScrollView contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps="handled">
        <SafeAreaView>
          <Wrapper>
            <Head />
            {form.forms.map((item, index) => (
              <Form key={`form_${index}`} index={index} onPressOptionType={openFormTypeSheet} />
            ))}
          </Wrapper>
        </SafeAreaView>
      </ScrollView>

      <Pressable onPress={() => dispatch(addForm())} style={addButton.container}>
        <Ionicons name="add-sharp" size={32} color={"white"} />
      </Pressable>

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
    </>
  );
}

const bottomSheet = StyleSheet.create({
  container: { padding: 20 },
  title: { color: GlobalStyle.gray.color, fontWeight: "bold", marginBottom: 10, fontSize: 13 },
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
