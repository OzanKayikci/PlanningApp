import React, { useMemo, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, LayoutChangeEvent, Dimensions, TouchableOpacity } from "react-native";
import { PinchGestureHandler, PinchGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import ListView from "../../components/ModelsComponents/List";
import TaskView from "../../components/ModelsComponents/Task";
import { LightColors, listColors } from "../../constants/Colors";


import { ListBuilder } from "../../models/List/listBuilder";
import { IList } from "../../interfaces/IList";

import { ModalTypes, ParentTypes, priorities, shapes, types } from "../../constants/types";
import { ITask } from "../../interfaces/ITask";
import { TaskBuilder } from "../../models/Task/taskBuilder";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./homeScreen.styles";
import ZoomView from "../../components/ZoomableView";
import { IParentTask } from "../../interfaces/IParentTask";
import { ParentTaskBuilder } from "../../models/Task/parentTaskBuilder";
import ParentTaskView from "../../components/ModelsComponents/ParentTask";
import CreateListButton from "../../components/Buttons/createListButton";
import ModalView from "../../components/Modal/ModalView";
import CloseButton from "../../components/Buttons/closeButton";

const { height, width } = Dimensions.get("window");

const GetList = () => {
  let list: IList = new ListBuilder(1, types.list, "TODO", listColors[5], shapes[1])
    .setChildGroupId(2)
    .setChildren([GetTask1(), GetTask2(), GetTask3()])
    .setIsChild(false)
    .listBuild();

  return <ListView List={list}></ListView>;
};

const GetList2 = () => {
  let list: IList = new ListBuilder(1, types.list, "DOING", listColors[15], shapes[1])
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
  let task: ITask = new TaskBuilder(1, types.task, title, text,listColors[10], shapes[1], 2)
    .SetParentId(1)
    .setPriority(priorities.low)
    .taskBuild();
  return <TaskView Task={task}></TaskView>;
};
const GetTask2 = () => {
  const text =
    "Personal Mangata tasarımını yap. Personal Mangata tasarımını yap. Personal Mangata tasarımını yap";
  const title = "Personal Mangata Tasarım";
  let task: ITask = new TaskBuilder(1, types.task, title, text, listColors[12], shapes[2], 2)
    .SetParentId(1)
    .setPriority(priorities.high)
    .setParentType(ParentTypes.task)
    .taskBuild();
  return <TaskView Task={task}></TaskView>;
};
const GetTask3 = () => {
  const childtext = "Child Obje Child Obje";
  const childtitle = "Child Title";
  let childtask: ITask = new TaskBuilder(
    1,
    types.task,
    childtitle,
    childtext,
    listColors[12],
    shapes[2],
    2
  )
    .SetParentId(6)
    .setPriority(priorities.high)
    .setParentType(ParentTypes.task)
    .taskBuild();

  const text =
    "Personal Mangata' da build pattern i öğren. Personal Mangata' da build pattern i öğren. Personal Mangata' da build pattern i öğren.";
  const title = " Mangata Build (Parent)";
  let task: ITask = new TaskBuilder(6, types.task, title, text, listColors[6], shapes[2], 2)
    .SetParentId(1)
    .setPriority(priorities.medium)
    .taskBuild();

  let parentTask: IParentTask = new ParentTaskBuilder(task)
    .setIsParent(true)
    .setChildGroupId(2)
    .parentTaskBuild();
  return <ParentTaskView Task={parentTask}></ParentTaskView>;
};

const HomeScreen = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  console.log(openModal);
  return (
    <View>
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

        {/* //? create Button */}
      </ZoomView>
      <CreateListButton action={() => setOpenModal(true)} />

      <ModalView  type={ModalTypes.listCreate}  isVisible={openModal} action={() => setOpenModal(false)}>
        <CloseButton action={() => setOpenModal(false)} />
      </ModalView>
    </View>
  );
};

export default HomeScreen;
