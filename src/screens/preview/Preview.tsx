import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Pressable,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import Wrapper from "@components/layout/Wrapper";
import Container from "@screens/create/components/Container";
import { useAppSelector } from "hooks/useRedux";
import { Ionicons } from "@expo/vector-icons";
import GlobalStyle from "@styles/GlobalStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenParams } from "../../../App";
import TextInput from "@components/form/TextInput";
import Radio from "@components/form/Radio";

type Props = NativeStackScreenProps<ScreenParams, "Preview">;

export default function Preview(props: Props) {
  const { navigation } = props;
  const form = useAppSelector((state) => state.form);

  const goBack = () => {
    navigation.pop();
  };
  const renderForm = (formIndex: number) => {
    const currentForm = form.forms[formIndex];
    switch (currentForm.type) {
      case "shortText":
        return <TextInput placeholder="내 답변" />;
      case "longText":
        return <TextInput placeholder="내 답변" multiline />;
      case "radio":
        return (
          <>
            {currentForm.options?.map((option, index) => (
              <View
                key={`preview_form_${formIndex}_option_${index}`}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Radio label={option.label} containerStyle={{ marginTop: index === 0 ? 0 : 20 }} />
              </View>
            ))}
          </>
        );
      case "check":
        return <></>;
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -200}
    >
      <ScrollView contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps="handled">
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
            </Container>

            {form.forms.map((item, index) => (
              <Container key={`preview_form_${index}`} style={content.container}>
                {item.question && <Text style={content.question}>{item.question}</Text>}
                {renderForm(index)}
              </Container>
            ))}
          </Wrapper>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const content = StyleSheet.create({
  container: { marginTop: 12 },
  question: { fontSize: 15, marginBottom: 30 },
});

const title = StyleSheet.create({
  container: { borderTopColor: GlobalStyle.point.color, borderTopWidth: 8 },
  title: { fontSize: 28 },
  description: { fontSize: 15, marginTop: 23 },
});

const header = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", height: 50, marginBottom: 5 },
  backButton: { width: 50, height: 50, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 17, fontWeight: "bold" },
});
