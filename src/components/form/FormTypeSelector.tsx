import GlobalStyle from "@styles/GlobalStyles";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { formTypes } from "utils/redux/slices/formSlice";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  onPress: () => void;
  type: formTypes;
}

export default function FormTypeSelector(props: Props) {
  const { onPress, type } = props;

  const renderType = () => {
    switch (type) {
      case "shortText":
        return (
          <>
            <View style={layout.iconArea}>
              <MaterialIcons name="short-text" size={24} color={GlobalStyle.lineIcon.color} />
            </View>
            <Text>단답형</Text>
          </>
        );
      case "longText":
        return (
          <>
            <View style={layout.iconArea}>
              <MaterialIcons name="notes" size={24} color={GlobalStyle.lineIcon.color} />
            </View>
            <Text>장문형</Text>
          </>
        );
      case "radio":
        return (
          <>
            <View style={layout.iconArea}>
              <MaterialIcons name="radio-button-checked" size={24} color={GlobalStyle.lineIcon.color} />
            </View>
            <Text>객관식 질문</Text>
          </>
        );
      case "check":
        return (
          <>
            <View style={layout.iconArea}>
              <MaterialIcons name="check-box" size={24} color={GlobalStyle.lineIcon.color} />
            </View>
            <Text>체크박스</Text>
          </>
        );
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={layout.container}>
      <View style={layout.labelArea}>{renderType()}</View>
      <View style={layout.iconArea}>
        <MaterialIcons name="arrow-drop-down" size={24} color={GlobalStyle.lineIcon.color} />
      </View>
    </TouchableOpacity>
  );
}

const layout = StyleSheet.create({
  container: {
    height: 45,
    borderWidth: 1,
    flex: 1,
    borderRadius: 5,
    borderColor: GlobalStyle.gray.borderColor,
    flexDirection: "row",
    alignItems: "center",
  },
  labelArea: { flexDirection: "row", alignItems: "center", flex: 1 },
  iconArea: {
    width: 45,
    height: undefined,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
