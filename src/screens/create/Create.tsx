import React, { useRef, useCallback, useMemo, useEffect } from "react";
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Wrapper from "@components/layout/Wrapper";
import Head from "./components/Head";
import { Ionicons } from "@expo/vector-icons";
import GlobalStyle from "@styles/GlobalStyles";
import Form from "./components/Form";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  useBottomSheetDynamicSnapPoints,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { addForm } from "utils/redux/slices/formSlice";

export default function HomeScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const form = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();
  const { height } = Dimensions.get("window");

  const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], []);

  const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        style={{ backgroundColor: "#C0C4CF99", flex: 1, position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
        opacity={1}
      />
    ),
    []
  );

  return (
    <>
      <ScrollView contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps="handled">
        <SafeAreaView>
          <Wrapper>
            <Head />
            {form.forms.map((item, index) => (
              <Form key={`form_${index}`} index={index} onPressOptionType={() => bottomSheetRef.current?.expand()} />
            ))}
          </Wrapper>
        </SafeAreaView>
      </ScrollView>

      <Pressable onPress={() => dispatch(addForm())} style={addButton.container}>
        <Ionicons name="add-sharp" size={32} color={"white"} />
      </Pressable>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        handleStyle={{ display: "none" }}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView onLayout={handleContentLayout} style={{ maxHeight: height * 0.9 }}>
          <View style={bottomSheet.container}>
            <Text style={bottomSheet.title}>옵션 유형</Text>
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
          </View>
        </BottomSheetView>
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
