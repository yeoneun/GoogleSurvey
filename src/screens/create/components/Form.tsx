import React, { useEffect, useRef } from "react";
import { Pressable, StyleSheet, Text, TextInput as RNTextInput, TouchableOpacity, View } from "react-native";
import TextInput from "@components/form/TextInput";
import Container from "./Container";
import { Ionicons } from "@expo/vector-icons";
import GlobalStyle from "@styles/GlobalStyles";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Switch from "@components/form/Switch";
import Radio from "@components/form/Radio";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import {
  addFormOption,
  copyForm,
  deleteForm,
  removeFormOption,
  setEtcUsage,
  setFormOptionLabel,
  setFormQuestion,
  setNecessary,
} from "utils/redux/slices/formSlice";
import FormTypeSelector from "@components/form/FormTypeSelector";
import Check from "@components/form/Check";
import FormOptionEditor from "@components/form/FormOptionEditor";
import { setFocusedFormIndex } from "utils/redux/slices/focusSlice";
import Wrapper from "@components/layout/Wrapper";

interface Props {
  index: number;
  onPressOptionType: (formIndex: number) => void;
  onPressBlock: () => void;
  drag: () => void;
}

export default function FormList(props: Props) {
  const { index, onPressOptionType, onPressBlock, drag } = props;
  const { showActionSheetWithOptions } = useActionSheet();
  const form = useAppSelector((state) => state.form);
  const currentForm = form.forms[index];
  const inputs = useRef<(RNTextInput | null)[]>([]);
  const { focusedFormIndex } = useAppSelector((state) => state.focus);
  const dispatch = useAppDispatch();
  let focused = focusedFormIndex === index;

  useEffect(() => {
    if (focusedFormIndex === index) {
      focused = true;
      const focusedInput = inputs.current.findIndex((item) => item?.isFocused());
      if (focusedInput < 0) {
        inputs.current[0]?.focus();
      }
      return;
    }
    focused = false;
  }, [focusedFormIndex]);

  const dispatchQuestion = (value: string) => {
    dispatch(setFormQuestion({ index, value }));
  };
  const toggleNecessary = (value: boolean) => {
    dispatch(setNecessary({ index, value }));
  };
  const addOption = async () => {
    await dispatch(addFormOption({ index }));
    inputs.current[inputs.current.length - 1]?.focus();
  };
  const removeOption = (optionIndex: number, refIndex: number) => {
    dispatch(removeFormOption({ index, optionIndex }));
    inputs.current.splice(refIndex, 1);
  };
  const dispatchFormOptionLabel = (optionIndex: number, value: string) => {
    dispatch(setFormOptionLabel({ index, optionIndex, value }));
  };
  const useEtc = () => {
    dispatch(setEtcUsage({ index, value: true }));
  };
  const disuseEtc = () => {
    dispatch(setEtcUsage({ index, value: false }));
  };
  const focusForm = () => {
    dispatch(setFocusedFormIndex(index));
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
            dispatch(copyForm(index));
            dispatch(setFocusedFormIndex(index + 1));
            break;

          case destructiveButtonIndex:
            dispatch(deleteForm(index));
            break;
        }
      }
    );
  };

  const renderForms = () => {
    switch (currentForm.type) {
      case "shortText":
        return (
          <TextInput placeholder="단답형 텍스트" containerStyle={{ width: "50%" }} onPressIn={focusForm} disabled />
        );
      case "longText":
        return (
          <TextInput placeholder="장문형 텍스트" containerStyle={{ width: "80%" }} onPressIn={focusForm} disabled />
        );
      case "radio":
      case "check":
        return (
          <>
            {currentForm.options!.map((option, optionIndex) => (
              <View key={`form_${index}_option_${optionIndex}`} style={options.item}>
                {currentForm.type === "radio" ? <Radio disabled /> : <Check disabled />}
                <FormOptionEditor
                  ref={(el) => (inputs.current[optionIndex + 1] = el)}
                  value={option.label}
                  setValue={(value: string) => {
                    dispatchFormOptionLabel(optionIndex, value);
                  }}
                  onFocusInput={focusForm}
                  onSumitLabel={() => inputs.current[optionIndex + 2]?.focus()}
                  isFormFocused={focused}
                />
                {focused && currentForm.options!.length > 1 && (
                  <TouchableOpacity
                    onPress={() => removeOption(optionIndex, optionIndex + 1)}
                    style={options.iconButton}
                  >
                    <Ionicons name="close" size={24} color={GlobalStyle.lineIcon.color} />
                  </TouchableOpacity>
                )}
              </View>
            ))}
            {currentForm.useEtc && (
              <Pressable onPress={focusForm} style={[options.item, options.smallItem]}>
                {currentForm.type === "radio" ? <Radio disabled /> : <Check disabled />}
                <View style={options.etcLabelContainer}>
                  <Text style={[options.smallItemLabel, options.etcLabel]}>기타...</Text>
                  {focused && (
                    <TouchableOpacity onPress={disuseEtc} style={options.iconButton}>
                      <Ionicons name="close" size={24} color={GlobalStyle.lineIcon.color} />
                    </TouchableOpacity>
                  )}
                </View>
              </Pressable>
            )}
            {focused && (
              <View style={[options.item, options.smallItem]}>
                {currentForm.type === "radio" ? <Radio disabled /> : <Check disabled />}
                <Text style={options.smallItemLabel}>
                  <Text onPress={addOption} style={options.addOption}>
                    옵션 추가
                  </Text>{" "}
                  또는{" "}
                  <Text onPress={useEtc} style={options.addEtc}>
                    '기타' 추가
                  </Text>
                </Text>
              </View>
            )}
          </>
        );
    }
  };

  const onStartDrag = () => {
    for (const input of inputs.current) {
      input?.blur();
    }
    drag();
  };

  return (
    <Pressable onPress={onPressBlock}>
      <Wrapper>
        <Container focused={focused} style={[layout.container, focused && layout.focusedContainer]}>
          <TouchableOpacity onPressIn={onStartDrag} style={moveHandle.container}>
            <MaterialIcons name="drag-handle" size={24} color={GlobalStyle.gray.borderColor} />
          </TouchableOpacity>

          <TextInput
            ref={(el) => (inputs.current[0] = el)}
            value={currentForm.question}
            onChangeText={dispatchQuestion}
            placeholder="질문"
            style={layout.question}
            multiline
            scrollEnabled={false}
            onFocus={focusForm}
            underline={focused}
          />

          {focused && (
            <View style={layout.toolArea}>
              <TouchableOpacity style={layout.imageButton}>
                <Ionicons name="image" size={24} color={GlobalStyle.lineIcon.color} />
              </TouchableOpacity>
              <FormTypeSelector onPress={() => onPressOptionType(index)} type={currentForm.type} />
            </View>
          )}

          <View style={options.container}>{renderForms()}</View>

          {focused && (
            <View style={bottom.container}>
              <View style={[bottom.button, necessary.container]}>
                <Text style={necessary.text}>필수</Text>
                <Switch onValueChange={toggleNecessary} value={currentForm.necessary} style={necessary.switch} />
              </View>
              <Pressable onPress={onPressMore} style={[bottom.button, bottom.moreButton]}>
                <MaterialCommunityIcons name="dots-vertical" size={24} color={GlobalStyle.lineIcon.color} />
              </Pressable>
            </View>
          )}
        </Container>
      </Wrapper>
    </Pressable>
  );
}

const moveHandle = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 60,
    height: 20,
  },
});

const options = StyleSheet.create({
  container: { marginTop: 16 },
  item: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  smallItem: { paddingLeft: 6, height: 40, alignItems: "center" },
  smallItemLabel: { paddingLeft: 10 },
  iconButton: { width: 40, height: undefined, aspectRatio: 1, alignItems: "center", justifyContent: "center" },

  etcLabelContainer: { flexDirection: "row", alignItems: "center", flex: 1 },
  etcLabel: { flex: 1, color: GlobalStyle.gray.color },

  addOption: { color: GlobalStyle.gray.color, fontWeight: "500" },
  addEtc: { color: GlobalStyle.blue.color, fontWeight: "500" },
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
  container: { marginTop: 12, position: "relative", paddingTop: 0 },
  focusedContainer: { paddingBottom: 0 },
  question: {
    fontSize: 16,
    lineHeight: 16 * 1.4,
  },
  focusedQuestion: {
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
