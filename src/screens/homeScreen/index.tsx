import React, { useEffect, useMemo, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, LayoutChangeEvent, Dimensions, TouchableOpacity } from "react-native";
import { PinchGestureHandler, PinchGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { styles } from "./homeScreen.styles";
import ZoomView from "../../components/ZoomableView";
import { Zocial } from "@expo/vector-icons";

import CreateListButton from "../../components/Buttons/createListButton";
import ModalView from "../../components/Modal/ModalView";
import CloseButton from "../../components/Buttons/closeButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { selectlists } from "../../redux/state/listSlice";
import ListsGridView from "../../components/Lists";
import { addModalState, selectModalState } from "../../redux/state/modalSlice";
import { LightColors } from "../../constants/Colors";
import DraverButton from "../../components/drawerComponent.tsx/DrawerNavigationButton";
import { IProjectService } from "../../services/Abstract/IProjectService";
import { ProjectService } from "../../services/Concrete/ProjectService";
import { selectSelectedProject } from "../../redux/state/selectedProjectSlice";
import { IListService } from "../../services/Abstract/IListService";
import { ListService } from "../../services/Concrete/ListService";
import { ModalTypes, types } from "../../constants/types";
import Projects from "../../components/projectsList";

const { height, width } = Dimensions.get("window");

const Header = (props: any) => {
  const selectedProject = useAppSelector(selectSelectedProject);
  const dispatch = useAppDispatch();
  return (
    <View style={styles.headerContainer}>
      <DraverButton navigation={props.navigation} />
      <TouchableOpacity
        onPress={() => {
          dispatch(addModalState([ModalTypes.projectDetail, selectedProject.id, selectedProject.title,types.project]));
        }}
        style={styles.header}
      >
        <View style={styles.headerIcon}>
          <Zocial
            name="pinboard"
            size={20}
            color={selectedProject.color}
            style={{
              shadowOpacity: 2,
              textShadowRadius: 2,
              textShadowOffset: { width: 2, height: 5 },
            }}
          />
        </View>
        <Text style={styles.headerText}>{selectedProject.title}</Text>
      </TouchableOpacity>
    </View>
  );
};
const HomeScreen = ({ navigation }) => {
  const [openModal, setOpenModal] = useState<boolean>(useAppSelector(selectModalState));
  const modalState = useAppSelector(selectModalState);

  const selectedProject = useAppSelector(selectSelectedProject);
  //! delete for all lists
  // const listService: IListService = new ListService();
  // listService.deleteAll();
  //  const projectService: IProjectService = new ProjectService();
  //  projectService.deleteAll();

  useEffect(() => {
    setOpenModal(modalState);
  }, [modalState]);

  console.log("modalState", openModal);
  return (
    <View>
      {selectedProject === null ? (
        <View style={styles.container}>
          <Projects props={navigation} />
        </View>
      ) : (
        <View style={styles.container}>
          <Header navigation={navigation} />
          <ZoomView>
            <View style={{ flexDirection: "row" }}>
              <ListsGridView />
            </View>
          </ZoomView>
          {/* //? create Button */}
          <CreateListButton />
        </View>
      )}

      <ModalView>
        <CloseButton />
        <View></View>
      </ModalView>
    </View>
  );
};

export default HomeScreen;

// const GetList = () => {
//   const allLists = useAppSelector(selectlists);
//   console.log("allLists", allLists);
//   let list: IList = allLists[0];
//   return <ListView List={list}></ListView>;
// };

// const GetList2 = () => {
//   let list: IList = new ListBuilder(1, types.list, "DOING", listColors[15], shapes[1])
//     .setChildGroupId(2)
//     .setChildren([GetTask1(), GetTask2(), GetTask3()])
//     .setIsChild(false)
//     .listBuild();

//   let lists: IList[] = [];
//   lists.push(list);
//   console.log("lililisst", lists);
//   return lists;
// };

// const GetTask1 = () => {
//   const text =
//     "Personal Mangata uygulamasını bitir. Personal Mangata uygulamasını bitir. Personal Mangata uygulamasını bitir. Personal Mangata uygulamasını bitir";
//   const title = "mangata bitir";
//   let task: ITask = new TaskBuilder(1, types.task, title, text, listColors[10], shapes[1], 2)
//     .SetParentId(1)
//     .setPriority(priorities.low)
//     .taskBuild();
//   return <TaskView Task={task}></TaskView>;
// };
// const GetTask2 = () => {
//   const text =
//     "Personal Mangata tasarımını yap. Personal Mangata tasarımını yap. Personal Mangata tasarımını yap";
//   const title = "Personal Mangata Tasarım";
//   let task: ITask = new TaskBuilder(1, types.task, title, text, listColors[12], shapes[2], 2)
//     .SetParentId(1)
//     .setPriority(priorities.high)
//     .setParentType(ParentTypes.task)
//     .taskBuild();
//   return <TaskView Task={task}></TaskView>;
// };
// const GetTask3 = () => {
//   const childtext = "Child Obje Child Obje";
//   const childtitle = "Child Title";
//   let childtask: ITask = new TaskBuilder(1, types.task, childtitle, childtext, listColors[12], shapes[2], 2)
//     .SetParentId(6)
//     .setPriority(priorities.high)
//     .setParentType(ParentTypes.task)
//     .taskBuild();

//   const text =
//     "Personal Mangata' da build pattern i öğren. Personal Mangata' da build pattern i öğren. Personal Mangata' da build pattern i öğren.";
//   const title = " Mangata Build (Parent)";
//   let task: ITask = new TaskBuilder(6, types.task, title, text, listColors[6], shapes[2], 2)
//     .SetParentId(1)
//     .setPriority(priorities.medium)
//     .taskBuild();

//   let parentTask: IParentTask = new ParentTaskBuilder(task)
//     .setIsParent(true)
//     .setChildGroupId(2)
//     .parentTaskBuild();
//   return <ParentTaskView Task={parentTask}></ParentTaskView>;
// };
