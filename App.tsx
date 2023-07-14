import * as React from "react";
import Constants from "expo-constants";
import { Platform, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import store from "./src/utils/redux/store";
import { Provider } from "react-redux";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import Create from "@screens/create/Create";
import Preview from "@screens/preview/Preview";

export type ScreenParams = { Create: undefined; Preview: undefined };
const Stack = createNativeStackNavigator<ScreenParams>();

export default function App() {
  return (
    <>
      <View style={{ paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight }}>
        <StatusBar />
      </View>

      <ActionSheetProvider>
        <Provider store={store}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer
              theme={{
                ...DefaultTheme,
                colors: {
                  ...DefaultTheme.colors,
                  background: "#F0ECF8",
                },
              }}
            >
              <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Create">
                <Stack.Screen name="Create" component={Create} />
                <Stack.Screen name="Preview" component={Preview} />
              </Stack.Navigator>
            </NavigationContainer>
          </GestureHandlerRootView>
        </Provider>
      </ActionSheetProvider>
    </>
  );
}
