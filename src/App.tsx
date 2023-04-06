// In App.js in a new project

import * as React from "react";
import { View, Text, Dimensions, Platform, StyleSheet } from "react-native";

import AppNavigation from "./navigation/routes";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
const { width, height } = Dimensions.get("window");

const App = () => {
  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigation />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
  },
});
export default App;
