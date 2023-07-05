import * as React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import Wrapper from "@components/layout/Wrapper";
import Head from "./components/Head";

export default function HomeScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <SafeAreaView>
        <Wrapper>
          <Head containerStyle={{ marginTop: 10 }} />
        </Wrapper>
      </SafeAreaView>
    </ScrollView>
  );
}
