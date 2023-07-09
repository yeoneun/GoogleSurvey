import Wrapper from "@components/layout/Wrapper";
import React from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";

export default function Preview() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps="handled">
      <SafeAreaView>
        <Wrapper>
          <Text>Preview</Text>
        </Wrapper>
      </SafeAreaView>
    </ScrollView>
  );
}
