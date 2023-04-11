// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/homeScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useFonts } from 'expo-font';
import { fonts } from '../constants/fonts';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator()
const  AppNavigation =() => {
  const [fontsLoaded] = useFonts(fonts);
  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      
        <Drawer.Screen name="Home"  component={HomeScreen} />
        </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;