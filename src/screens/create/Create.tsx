import React, { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, Keyboard, View, KeyboardAvoidingView, Dimensions } from "react-native";
import Head from "./components/Head";
import Form from "./components/Form";
import BottomSheet from "@components/actionSheet/BottomSheet";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { FormProps, FormTypes, setFormIndex, setFormType } from "utils/redux/slices/formSlice";
import RNBottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import FloatingButtons from "./components/FloatingButtons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenParams } from "../../../App";
import { setFocusedFormIndex } from "utils/redux/slices/focusSlice";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import Constants from "expo-constants";

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
  const moveForm = (props: { from: number; to: number }) => {
    resetFocusedFormIndex();
    dispatch(setFormIndex(props));
  };

  const renderItem = ({ getIndex, drag }: RenderItemParams<FormProps>) => {
    let index = getIndex();
    if (!index) {
      index = 0;
    }
    return (
      <Form index={index} onPressOptionType={openFormTypeSheet} onPressBlock={resetFocusedFormIndex} drag={drag} />
    );
  };

  return (
    <>
      <KeyboardAvoidingView behavior="padding" contentContainerStyle={{ backgroundColor: "pink", flex: 1 }}>
        <DraggableFlatList
          data={form.forms}
          renderItem={renderItem}
          keyExtractor={(_, index) => `form_${index}`}
          ListHeaderComponent={<Head />}
          ListFooterComponent={<View style={{ height: 100 }} />}
          contentInsetAdjustmentBehavior="automatic"
          onDragEnd={({ from, to }) => moveForm({ from, to })}
          contentContainerStyle={{
            minHeight: Dimensions.get("window").height - Constants.statusBarHeight,
          }}
          showsVerticalScrollIndicator={false}
        />
      </KeyboardAvoidingView>
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
