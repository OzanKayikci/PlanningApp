// In App.js in a new project

import * as React from "react";
import { View, Text, Dimensions, Platform, StyleSheet } from "react-native";

import AppNavigation from "./navigation/routes";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
const { width, height } = Dimensions.get("window");
import { StatusBar } from 'expo-status-bar';
import { LightColors } from "./constants/Colors";
const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.droidSafeArea}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AppNavigation />
        </GestureHandlerRootView>
      </SafeAreaView>
      <StatusBar style="light" backgroundColor={LightColors.darkBackground}/>
    </Provider>
  );
};
const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
  },
});
export default App;
