// In App.js in a new project

import React, { useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/homeScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useFonts } from "expo-font";
import { fonts } from "../constants/fonts";
import { useAppDispatch } from "../redux/hooks/hooks";
import { IListService } from "../services/Abstract/IListService";
import { ListService } from "../services/Concrete/ListService";
import { getProjectLists, getAllLists } from "../redux/state/listSlice";
import DrawerComponent from "../components/drawerComponent";
import { LightColors } from "../constants/Colors";
import { IProjectService } from "../services/Abstract/IProjectService";
import { ProjectService } from "../services/Concrete/ProjectService";
import { getAllProjects } from "../redux/state/projectSlice";
import { setSelectedProject } from "../redux/state/selectedProjectSlice";
import { TaskService } from "../services/Concrete/TaskService";
import { ITaskService } from "../services/Abstract/ITaskService";
import { getProjectTasks } from "../redux/state/taskSlice";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const { width, height } = Dimensions.get("window");
const AppNavigation = () => {
  const [fontsLoaded] = useFonts(fonts);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const listService: IListService = new ListService();

    const projectService: IProjectService = new ProjectService();
    projectService.getAll().then((projectRes) => {
      dispatch(getAllProjects(projectRes));
      dispatch(setSelectedProject(null));
      listService.getAll().then((res) => {
        dispatch(getAllLists(res));

        projectRes.length > 0 ? dispatch(getProjectLists([res, projectRes[0].id])) : null;
      });
      const taskService: ITaskService = new TaskService();
      projectRes.length > 0
        ? taskService.getByGroupId(projectRes[0].id).then((res) => {
            dispatch(getProjectTasks(res));
          })
        : null;
    });
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerComponent prop={props} />}
        screenOptions={{
          headerShown: false,
          overlayColor: "rgba(10,10,10,0.95)",
          drawerStyle: {
            borderRadius: 50,
            marginLeft: 5,
            backgroundColor: "transparent",
          },
          swipeEdgeWidth: width / 6,
          drawerPosition: "left",
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
