import React, { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, Keyboard, View } from "react-native";
import Head from "./components/Head";
import Form from "./components/Form";
import BottomSheet from "@components/actionSheet/BottomSheet";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { FormProps, FormTypes, setFormType } from "utils/redux/slices/formSlice";
import RNBottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import FloatingButtons from "./components/FloatingButtons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenParams } from "../../../App";
import { setFocusedFormIndex } from "utils/redux/slices/focusSlice";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";

type Props = NativeStackScreenProps<ScreenParams, "Create">;

export default function Create(props: Props) {
  const { navigation } = props;
  const formTypeSheet = useRef<RNBottomSheet>(null);
  const form = useAppSelector((state) => state.form);
  const { focusedFormIndex } = useAppSelector((state) => state.focus);
  const dispatch = useAppDispatch();

  const openFormTypeSheet = () => {
    Keyboard.dismiss();
    formTypeSheet.current?.expand();
  };
  const dispatchFormType = (type: FormTypes) => {
    if (!focusedFormIndex) {
      return;
    }
    dispatch(setFormType({ index: focusedFormIndex, value: type }));
    formTypeSheet.current?.close();
  };
  const resetFocusedFormIndex = () => {
    Keyboard.dismiss();
    dispatch(setFocusedFormIndex(undefined));
  };
  const goPreview = () => {
    resetFocusedFormIndex();
    navigation.navigate("Preview");
  };

  const renderItem = ({ index }: { index: number }) => {
    return <Form index={index} onPressOptionType={openFormTypeSheet} onPressBlock={resetFocusedFormIndex} />;
  };

  return (
    <>
      <KeyboardAwareFlatList
        data={form.forms}
        renderItem={renderItem}
        keyExtractor={(_, index) => `form_${index}`}
        ListHeaderComponent={<Head />}
        ListFooterComponent={<View style={{ height: 100 }} />}
        contentInsetAdjustmentBehavior="automatic"
      />
      <FloatingButtons navigateToPreview={goPreview} />

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

const optionType = StyleSheet.create({
  item: { flexDirection: "row", alignItems: "center", height: 42 },
  label: { fontSize: 15, paddingLeft: 12, fontWeight: "500", flex: 1 },
});
