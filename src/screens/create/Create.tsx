import * as React from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import Wrapper from "@components/layout/Wrapper";
import Head from "./components/Head";
import { Ionicons } from "@expo/vector-icons";
import GlobalStyle from "@styles/GlobalStyles";
import Form from "./components/Form";

export default function HomeScreen() {
  const addForm = () => {};
  return (
    <>
      <ScrollView style={layout.scrollView} keyboardShouldPersistTaps="handled">
        <SafeAreaView>
          <Wrapper>
            <Head />
            <Form />
          </Wrapper>
        </SafeAreaView>
      </ScrollView>
      <Pressable onPress={addForm} style={addButton.container}>
        <Ionicons name="add-sharp" size={32} color={"white"} />
      </Pressable>
    </>
  );
}

const layout = StyleSheet.create({
  scrollView: { flex: 1 },
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
