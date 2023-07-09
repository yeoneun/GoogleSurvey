import React from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TextInput from "@components/form/TextInput";
import Container from "./Container";
import { Ionicons } from "@expo/vector-icons";
import GlobalStyle from "@styles/GlobalStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Switch from "@components/form/Switch";
import Radio from "@components/form/Radio";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { deleteForm, setFormQuestion, setNecessary } from "utils/redux/slices/formSlice";
import FormTypeSelector from "@components/form/FormTypeSelector";

interface Props {
  index: number;
  onPressOptionType: (formIndex: number) => void;
}

export default function FormList(props: Props) {
  const { index, onPressOptionType } = props;
  const { showActionSheetWithOptions } = useActionSheet();
  const form = useAppSelector((state) => state.form);
  const currentForm = form.forms[index];
  const dispatch = useAppDispatch();

  const dispatchQuestion = (value: string) => {
    dispatch(setFormQuestion({ index, value }));
  };
  const toggleNecessary = (value: boolean) => {
    dispatch(setNecessary({ index, value }));
  };

  const onPressMore = () => {
    const options = ["항목 복제", "삭제", "취소"];
    const destructiveButtonIndex = 1;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case 0:
            // 항목 복제
            break;

          case destructiveButtonIndex:
            dispatch(deleteForm(index));
            break;
        }
      }
    );
  };

  return (
    <>
      <Container style={layout.container}>
        <TextInput
          value={currentForm.question}
          onChangeText={dispatchQuestion}
          placeholder="질문"
          style={layout.textInput}
          multiline
          textAlignVertical="center"
        />

        <View style={layout.toolArea}>
          <TouchableOpacity style={layout.imageButton}>
            <Ionicons name="image" size={24} color={GlobalStyle.lineIcon.color} />
          </TouchableOpacity>
          <FormTypeSelector onPress={() => onPressOptionType(index)} type={currentForm.type} />
        </View>

        <View style={options.container}>
          <View style={options.item}>
            <Radio />
            <TextInput value="옵션 1" style={options.textInput} />
          </View>
          <View style={options.item}>
            <Radio />
            <TextInput value="옵션 2" style={options.textInput} />
            <View style={options.imageButton}>
              <Ionicons name="image" size={24} color={GlobalStyle.lineIcon.color} />
            </View>
          </View>
          <View style={[options.item, options.addOption]}>
            <Radio />
            <Text style={options.addOptionLabel}>
              옵션 추가 또는 <Text style={options.addOptionLabelPressable}>'기타' 추가</Text>
            </Text>
          </View>
        </View>

        <View style={bottom.container}>
          <View style={[bottom.button, necessary.container]}>
            <Text style={necessary.text}>필수</Text>
            <Switch onValueChange={toggleNecessary} value={currentForm.necessary} style={necessary.switch} />
          </View>
          <Pressable onPress={onPressMore} style={[bottom.button, bottom.moreButton]}>
            <MaterialCommunityIcons name="dots-vertical" size={24} color={GlobalStyle.lineIcon.color} />
          </Pressable>
        </View>
      </Container>
    </>
  );
}

const options = StyleSheet.create({
  container: { marginTop: 16 },
  item: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  textInput: { marginLeft: 10, height: 40, fontSize: 15, flex: 1 },
  imageButton: { width: 54, height: 40, alignItems: "center", justifyContent: "center" },

  addOption: { paddingLeft: 6, height: 40, alignItems: "center" },
  addOptionLabel: { paddingLeft: 10 },
  addOptionLabelPressable: { color: GlobalStyle.blue.color, fontWeight: "500" },
});

const bottom = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    borderTopWidth: 1,
    borderColor: GlobalStyle.gray.borderColor,
    paddingVertical: 6,
    marginTop: 20,
  },
  button: { height: 45, justifyContent: "center" },
  necessaryButton: {},
  moreButton: { width: 45, alignItems: "center", justifyContent: "center" },
});

const necessary = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center" },
  text: { fontSize: 14, color: GlobalStyle.gray.color },
  switch: { marginLeft: 5 },
});

const layout = StyleSheet.create({
  container: { marginTop: 12, paddingBottom: 0 },
  textInput: {
    fontSize: 16,
    backgroundColor: GlobalStyle.gray.backgroundColor,
    paddingHorizontal: 12,
    paddingVertical: 15,
    paddingTop: 15,
    borderBottomWidth: 1,
    borderColor: GlobalStyle.darkgray.borderColor,
    lineHeight: 16 * 1.4,
  },
  toolArea: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  imageButton: {
    width: 45,
    height: 45,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
