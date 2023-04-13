// In App.js in a new project

import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/homeScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useFonts } from "expo-font";
import { fonts } from "../constants/fonts";
import { useAppDispatch } from "../redux/hooks/hooks";
import { IListService } from "../services/Abstract/IListService";
import { ListService } from "../services/Concrete/ListService";
import { getAllLists } from "../redux/state/listSlice";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const AppNavigation = () => {
  const [fontsLoaded] = useFonts(fonts);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const listService: IListService = new ListService();
    listService.getAll().then((res) => {
      dispatch(getAllLists(res));
    });
  }, []);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="Home" component={HomeScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
