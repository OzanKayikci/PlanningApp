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
import DraverButton from "../../components/drawerComponent/DrawerNavigationButton";
import { IProjectService } from "../../services/Abstract/IProjectService";
import { ProjectService } from "../../services/Concrete/ProjectService";
import { selectSelectedProject } from "../../redux/state/selectedProjectSlice";
import { IListService } from "../../services/Abstract/IListService";
import { ListService } from "../../services/Concrete/ListService";
import { ModalTypes, types } from "../../constants/types";
import Projects from "../../components/projectsList";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height, width } = Dimensions.get("window");

const Header = (props: any) => {
  const selectedProject = useAppSelector(selectSelectedProject);
  const dispatch = useAppDispatch();
  return (
    <View style={styles.headerContainer}>
      <DraverButton navigation={props.navigation} />
      <TouchableOpacity
        onPress={() => {
          dispatch(
            addModalState([
              ModalTypes.projectDetail,
              selectedProject.id,
              selectedProject.title,
              types.project,
            ])
          );
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

const clearAllStorage = async () => {
  await AsyncStorage.clear();
};
const HomeScreen = ({ navigation }) => {
  const [openModal, setOpenModal] = useState<boolean>(useAppSelector(selectModalState));
  const modalState = useAppSelector(selectModalState);

  const selectedProject = useAppSelector(selectSelectedProject);
  //! delete for all lists
  // const listService: IListService = new ListService();
  // listService.deleteAll();
  //  const projectService: IProjectService = new ProjectService();
  //  projectService.deleteAll();,
  //clearAllStorage();

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
