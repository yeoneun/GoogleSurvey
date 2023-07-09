import React, { useRef } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import Wrapper from "@components/layout/Wrapper";
import Head from "./components/Head";
import { Ionicons } from "@expo/vector-icons";
import GlobalStyle from "@styles/GlobalStyles";
import Form from "./components/Form";
import BottomSheet from "@components/actionSheet/BottomSheet";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { addForm } from "utils/redux/slices/formSlice";
import RNBottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";

export default function HomeScreen() {
  const bottomSheetRef = useRef<RNBottomSheet>(null);
  const form = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();

  const openFormTypeSheet = () => {
    bottomSheetRef.current?.expand();
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

      <BottomSheet ref={bottomSheetRef} title="설문 유형">
        <TouchableOpacity style={optionType.item}>
          <MaterialIcons name="short-text" size={24} />
          <Text style={optionType.label}>단답형</Text>
        </TouchableOpacity>
        <TouchableOpacity style={optionType.item}>
          <MaterialIcons name="notes" size={24} />
          <Text style={optionType.label}>장문형</Text>
        </TouchableOpacity>
        <TouchableOpacity style={optionType.item}>
          <MaterialIcons name="radio-button-checked" size={24} />
          <Text style={optionType.label}>객관식 질문</Text>
        </TouchableOpacity>
        <TouchableOpacity style={optionType.item}>
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
