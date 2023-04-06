import React, { useMemo, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, LayoutChangeEvent, Dimensions } from "react-native";
import { PinchGestureHandler, PinchGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import ListView from "../../components/ModelComponents/List";
import TaskView from "../../components/ModelComponents/Task";
import { LightColors } from "../../constants/Colors";

import { useFonts } from "expo-font";
import { fonts } from "../../constants/fonts";

import { ListBuilder } from "../../models/List/listBuilder";
import { IList } from "../../interfaces/IList";

import { priorities, shapes, types } from "../../constants/types";
import { ITask } from "../../interfaces/ITask";
import { TaskBuilder } from "../../models/Task/taskBuilder";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./homeScreen.styles";
import ZoomView from "../../components/ZoomableView";
import { IParentTask } from "../../interfaces/IParentTask";
import { ParentTaskBuilder } from "../../models/Task/parentTaskBuilder";

const { height, width } = Dimensions.get("window");

const GetList = () => {
  let list: IList = new ListBuilder(1, types.list, "TODO", LightColors.listColors[13], shapes.circle)
    .setChildGroupId(2)
    .setChildren([GetTask1(), GetTask2(), GetTask3()])
    .setIsChild(false)
    .listBuild();

  return <ListView List={list}></ListView>;
};

const GetList2 = () => {
  let list: IList = new ListBuilder(1, types.list, "DOING", LightColors.listColors[13], shapes.circle)
    .setChildGroupId(2)
    .setChildren([GetTask1(), GetTask2(), GetTask3()])
    .setIsChild(false)
    .listBuild();

  return <ListView List={list}></ListView>;
};

const GetTask1 = () => {
  const text =
    "Personal Mangata uygulamasını bitir. Personal Mangata uygulamasını bitir. Personal Mangata uygulamasını bitir. Personal Mangata uygulamasını bitir";
  const title = "mangata bitir";
  let task: ITask = new TaskBuilder(1, types.task, title, text, LightColors.listColors[10], shapes.circle, 2)
    .SetParentId(1)
    .setPriority(priorities.low)
    .taskBuild();
  return <TaskView Task={task}></TaskView>;
};
const GetTask2 = () => {
  const text =
    "Personal Mangata tasarımını yap. Personal Mangata tasarımını yap. Personal Mangata tasarımını yap";
  const title = "Personal Mangata Tasarım";
  let task: ITask = new TaskBuilder(1, types.task, title, text, LightColors.listColors[12], shapes.circle, 2)
    .SetParentId(1)
    .setPriority(priorities.high)
    .taskBuild();
  return <TaskView Task={task}></TaskView>;
};
const GetTask3 = () => {
  const text =
    "Personal Mangata' da build pattern i öğren. Personal Mangata' da build pattern i öğren. Personal Mangata' da build pattern i öğren.";
  const title = " Mangata Build (Parent)";
  let task: ITask = new TaskBuilder(1, types.task, title, text, LightColors.listColors[6], shapes.circle, 2)
    .SetParentId(1)
    .setPriority(priorities.medium)
    .taskBuild();

    let parentTask : IParentTask = new ParentTaskBuilder(task).setIsParent(true).setChildren([GetTask2()]).setChildGroupId(2).parentTaskBuild()
  return <TaskView Task={parentTask}></TaskView>;
};

const HomeScreen = () => {
  const [fontsLoaded] = useFonts(fonts);
  if (!fontsLoaded) {
    return null;
  }

  return (
    <ZoomView>
      <View style={{ flexDirection: "row" }}>
        <GetList />
        <GetList2 />
        <GetList2 />
      </View>
      <View style={{ flexDirection: "row" }}>
        <GetList />
        <GetList2 />
        <GetList2 />
      </View>
      <View style={{ flexDirection: "row" }}>
        <GetList />
        <GetList2 />
        <GetList2 />
      </View>
    </ZoomView>
  );
};

export default HomeScreen;
