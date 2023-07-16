import React, { useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import Wrapper from "@components/layout/Wrapper";
import Container from "@screens/create/components/Container";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { Ionicons } from "@expo/vector-icons";
import GlobalStyle from "@styles/GlobalStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenParams } from "../../../App";
import TextInput from "@components/form/TextInput";
import Radio from "@components/form/Radio";
import Check from "@components/form/Check";
import { reset, setPreviewValues } from "utils/redux/slices/previewSlice";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { FormProps } from "utils/redux/slices/formSlice";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = NativeStackScreenProps<ScreenParams, "Preview">;

export default function Preview(props: Props) {
  const { navigation } = props;
  const form = useAppSelector((state) => state.form);
  const { values } = useAppSelector((state) => state.preview);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(form.forms);
    return () => {
      dispatch(reset());
    };
  }, [form]);

  const goBack = () => {
    navigation.pop();
  };

  const onChangeText = (formIndex: number, value: string) => {
    dispatch(setPreviewValues({ formIndex, values: [value] }));
  };

  const onPressRadio = (formIndex: number, value: string) => {
    dispatch(setPreviewValues({ formIndex, values: [value] }));
  };

  const onPressCheck = (formIndex: number, value: string) => {
    let currentValues = values[formIndex] ? [...values[formIndex]] : [];
    if (currentValues.length > 0) {
      const index = currentValues.indexOf(value);
      if (index > -1) {
        currentValues.splice(index, 1);
      } else {
        currentValues.push(value);
      }
    } else {
      currentValues = [value];
    }
    dispatch(setPreviewValues({ formIndex, values: currentValues }));
  };

  const renderForm = (item: FormProps, formIndex: number) => {
    const currentValue = values[formIndex];
    switch (item.type) {
      case "shortText":
        return (
          <TextInput
            value={currentValue && currentValue[0]}
            onChangeText={(value) => onChangeText(formIndex, value)}
            placeholder="내 답변"
          />
        );
      case "longText":
        return (
          <TextInput
            value={currentValue && currentValue[0]}
            onChangeText={(value) => onChangeText(formIndex, value)}
            placeholder="내 답변"
            multiline
            scrollEnabled={false}
          />
        );
      case "radio":
        return (
          <>
            {item.options?.map((option, index) => (
              <View
                key={`preview_form_${formIndex}_option_${index}`}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Radio
                  value={`option_${index}`}
                  label={option.label}
                  onPress={(value) => onPressRadio(formIndex, value)}
                  checked={
                    currentValue && currentValue[0] === `option_${index}`
                      ? true
                      : false
                  }
                />
              </View>
            ))}
            {item.useEtc && (
              <View>
                <Radio
                  value={"option_기타"}
                  label={"기타"}
                  onPress={(value) => onPressRadio(formIndex, value)}
                  checked={currentValue && currentValue[0] === "option_기타"}
                  useTextInput
                />
              </View>
            )}
          </>
        );
      case "check":
        return (
          <>
            {item.options?.map((option, index) => (
              <View
                key={`preview_form_${formIndex}_option_${index}`}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Check
                  value={`option_${index}`}
                  label={option.label}
                  onPress={() => onPressCheck(formIndex, `option_${index}`)}
                  checked={
                    currentValue && currentValue.includes(`option_${index}`)
                  }
                />
              </View>
            ))}
            {item.useEtc && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Check
                  value={"option_기타"}
                  label={"기타"}
                  onPress={(value) => onPressCheck(formIndex, value)}
                  checked={currentValue && currentValue.includes("option_기타")}
                  useTextInput
                />
              </View>
            )}
          </>
        );
    }
  };

  const renderItem = ({ item, index }: { item: FormProps; index: number }) => {
    return (
      <Container style={list.item}>
        <Text style={list.question}>
          {item.question}{" "}
          {item.necessary && <Text style={list.necessary}>*</Text>}
        </Text>
        {renderForm(item, index)}
      </Container>
    );
  };

  return (
    <>
      <View style={header.container}>
        <SafeAreaView>
          <Wrapper style={header.inner}>
            <TouchableOpacity onPress={goBack} style={header.backButton}>
              <Ionicons name="arrow-back" size={16} color={"white"} />
              <Text style={header.title}>돌아가기</Text>
            </TouchableOpacity>
          </Wrapper>
        </SafeAreaView>
      </View>

      <Wrapper style={list.container}>
        <KeyboardAwareFlatList
          data={form.forms}
          renderItem={renderItem}
          keyExtractor={(_, index) => `previewForm_${index}`}
          ListHeaderComponent={
            <Container style={title.container}>
              <Text style={title.title}>{form.title}</Text>
              {form.description && (
                <Text style={title.description}>{form.description}</Text>
              )}

              {form.forms.some((item) => item.necessary) && (
                <View style={title.necessaryArea}>
                  <Text style={title.necessary}>* 표시는 필수 항목임</Text>
                </View>
              )}
            </Container>
          }
          ListFooterComponent={<View style={{ height: 30 }} />}
          showsVerticalScrollIndicator={false}
        />
      </Wrapper>
    </>
  );
}

const list = StyleSheet.create({
  container: { flex: 1 },
  item: { marginTop: 12 },
  question: { fontSize: 15, marginBottom: 20 },
  necessary: { color: GlobalStyle.red.color },
});

const title = StyleSheet.create({
  container: {
    borderTopColor: GlobalStyle.point.color,
    borderTopWidth: 8,
    marginTop: 20,
  },
  title: { fontSize: 28 },
  description: { fontSize: 15, marginTop: 23 },
  necessaryArea: {
    borderTopWidth: 1,
    borderColor: GlobalStyle.gray.borderColor,
    marginTop: 15,
    paddingTop: 15,
  },
  necessary: { color: GlobalStyle.red.color },
});

const header = StyleSheet.create({
  container: { backgroundColor: GlobalStyle.point.backgroundColor },
  inner: { flexDirection: "row", alignItems: "center", height: 50 },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GlobalStyle.point.color,
    paddingHorizontal: 12,
    borderRadius: 15,
    height: 30,
  },
  title: { fontSize: 14, fontWeight: "bold", color: "white", marginLeft: 4 },
});
