import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Container from "./Container";
import { Ionicons } from "@expo/vector-icons";
import GlobalStyle from "@styles/GlobalStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Switch from "@components/form/Switch";
import Radio from "@components/form/Radio";
import BottomSheet from "@gorhom/bottom-sheet";

export default function FormList() {
  const [isNecessary, setIsNecessary] = useState(false);

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => [1, "50%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

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
          <View style={options.item}>
            <Radio />
            <TextInput value="옵션 1" style={options.textInput} />
          </View>
          <View style={options.item}>
            <Radio />
            <TextInput value="옵션 2" style={[options.textInput, options.textInputFocused]} />
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
            <Switch onValueChange={setIsNecessary} value={isNecessary} style={necessary.switch} />
          </View>
          <View style={[bottom.button, bottom.moreButton]}>
            <MaterialCommunityIcons name="dots-vertical" size={24} color={GlobalStyle.lineIcon.color} />
          </View>
        </View>
      </Container>

      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: "green" }}
      >
        <View style={{ backgroundColor: "pink" }}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </>
  );
}

const options = StyleSheet.create({
  container: { marginTop: 16 },
  item: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  textInput: { marginLeft: 10, height: 40, fontSize: 15, flex: 1 },
  textInputFocused: { borderBottomWidth: 2, borderColor: GlobalStyle.point.color },
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
