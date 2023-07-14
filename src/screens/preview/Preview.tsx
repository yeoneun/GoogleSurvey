import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, Pressable } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Wrapper from "@components/layout/Wrapper";
import Container from "@screens/create/components/Container";
import { useAppSelector } from "hooks/useRedux";
import { Ionicons } from "@expo/vector-icons";
import GlobalStyle from "@styles/GlobalStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenParams } from "../../../App";
import TextInput from "@components/form/TextInput";
import Radio from "@components/form/Radio";
import Check from "@components/form/Check";

type Props = NativeStackScreenProps<ScreenParams, "Preview">;

export default function Preview(props: Props) {
  const { navigation } = props;
  const form = useAppSelector((state) => state.form);
  const [formValues, setFormValues] = useState<string[][]>();

  useEffect(() => {
    setFormValues(Array.from(new Array(form.forms.length), () => []));
  }, [form]);

  const goBack = () => {
    navigation.pop();
  };

  const onChangeText = (formIndex: number, value: string) => {
    if (!formValues) {
      return;
    }
    const values = [...formValues];
    values[formIndex] = [value];
    setFormValues(values);
  };
  const onPressRadio = (formIndex: number, value: string) => {
    if (!formValues) {
      return;
    }
    const values = [...formValues];
    values[formIndex] = [value];
    setFormValues(values);
  };
  const onPressCheck = (formIndex: number, value: string) => {
    if (!formValues) {
      return;
    }
    const values = [...formValues];
    const index = values[formIndex].indexOf(value);
    console.log(index);
    if (index > -1) {
      values[formIndex].splice(index, 1);
      console.log(values);
    } else {
      values[formIndex].push(value);
    }
    setFormValues(values);
  };

  const renderForm = (formIndex: number) => {
    const currentForm = form.forms[formIndex];

    switch (currentForm.type) {
      case "shortText":
        return (
          <TextInput
            value={formValues && formValues[formIndex][0]}
            onChangeText={(value) => onChangeText(formIndex, value)}
            placeholder="내 답변"
          />
        );
      case "longText":
        return (
          <TextInput
            value={formValues && formValues[formIndex][0]}
            onChangeText={(value) => onChangeText(formIndex, value)}
            placeholder="내 답변"
            multiline
            scrollEnabled={false}
          />
        );
      case "radio":
        return (
          <>
            {currentForm.options?.map((option, index) => (
              <View
                key={`preview_form_${formIndex}_option_${index}`}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Radio
                  label={option.label}
                  onPress={(value) => onPressRadio(formIndex, value)}
                  checked={formValues && formValues[formIndex][0] === option.label}
                />
              </View>
            ))}
            {currentForm.useEtc && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Radio
                  label={"기타"}
                  onPress={(value) => onPressRadio(formIndex, value)}
                  checked={formValues && formValues[formIndex][0] === "기타"}
                />
              </View>
            )}
          </>
        );
      case "check":
        return (
          <>
            {currentForm.options?.map((option, index) => (
              <View
                key={`preview_form_${formIndex}_option_${index}`}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Check
                  label={option.label}
                  onPress={() => onPressCheck(formIndex, option.label)}
                  checked={formValues && formValues[formIndex].includes(option.label)}
                />
              </View>
            ))}
            {currentForm.useEtc && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Check label={"기타"} />
              </View>
            )}
          </>
        );
    }
  };

  return (
    <KeyboardAwareScrollView
      extraHeight={100}
      enableOnAndroid={true}
      enableResetScrollToCoords={true}
      keyboardShouldPersistTaps="handled"
      contentInsetAdjustmentBehavior="automatic"
    >
      <SafeAreaView>
        <View style={header.container}>
          <Pressable onPress={goBack} style={header.backButton}>
            <Ionicons name="arrow-back" size={24} />
          </Pressable>
          <Text style={header.title}>미리보기</Text>
        </View>

        <Wrapper>
          <Container style={title.container}>
            <Text style={title.title}>{form.title}</Text>
            {form.description && <Text style={title.description}>{form.description}</Text>}

            {form.forms.some((item) => item.necessary) && (
              <View style={title.necessaryArea}>
                <Text style={title.necessary}>* 표시는 필수 항목임</Text>
              </View>
            )}
          </Container>

          {form.forms.map((item, index) => (
            <Container key={`preview_form_${index}`} style={content.container}>
              <Text style={content.question}>
                {item.question} {item.necessary && <Text style={content.necessary}>*</Text>}
              </Text>
              {renderForm(index)}
            </Container>
          ))}
        </Wrapper>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const content = StyleSheet.create({
  container: { marginTop: 12 },
  question: { fontSize: 15, marginBottom: 20 },
  necessary: { color: GlobalStyle.red.color },
});

const title = StyleSheet.create({
  container: { borderTopColor: GlobalStyle.point.color, borderTopWidth: 8 },
  title: { fontSize: 28 },
  description: { fontSize: 15, marginTop: 23 },
  necessaryArea: { borderTopWidth: 1, borderColor: GlobalStyle.gray.borderColor, marginTop: 15, paddingTop: 15 },
  necessary: { color: GlobalStyle.red.color },
});

const header = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", height: 50, marginBottom: 5 },
  backButton: { width: 50, height: 50, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 17, fontWeight: "bold" },
});
