import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme } from "@react-navigation/native";
import Create from "@screens/create/Create";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import store from "./src/utils/redux/store";
import { Provider } from "react-redux";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
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
            </Stack.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </Provider>
    </ActionSheetProvider>
  );
}
