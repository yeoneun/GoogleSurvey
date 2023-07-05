import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Container from "./Container";
import TextInput from "@components/form/TextInput";
import { Ionicons } from "@expo/vector-icons";
import GlobalStyle from "@styles/GlobalStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Switch from "@components/form/Switch";

export default function FormList() {
  const [isNecessary, setIsNecessary] = useState(false);
  return (
    <>
      <Container style={layout.container}>
        <TextInput placeholder="질문" style={layout.textInput} multiline textAlignVertical="center" />
        <View style={layout.toolArea}>
          <TouchableOpacity style={layout.imageButton}>
            <Ionicons name="image" size={24} color={GlobalStyle.lineIcon.color} />
          </TouchableOpacity>
          <TouchableOpacity style={layout.typeButton}>
            <Text>객관식 질문</Text>
          </TouchableOpacity>
        </View>
        <View style={options.container}>
          <View style={[options.button, necessary.container]}>
            <Text style={necessary.text}>필수</Text>
            <Switch onValueChange={setIsNecessary} value={isNecessary} style={necessary.switch} />
          </View>
          <View style={[options.button, options.moreButton]}>
            <MaterialCommunityIcons name="dots-vertical" size={24} color={GlobalStyle.lineIcon.color} />
          </View>
        </View>
      </Container>
    </>
  );
}

const options = StyleSheet.create({
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
  typeButton: {
    height: 45,
    paddingHorizontal: 10,
    borderWidth: 1,
    flex: 1,
    borderRadius: 5,
    borderColor: GlobalStyle.gray.borderColor,
    justifyContent: "center",
  },
});
