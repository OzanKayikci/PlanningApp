import { useCallback } from "react";

import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";

import { LightColors, listColors } from "../../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { addModalState, deleteModalState } from "../../redux/state/modalSlice";
import { ModalTypes } from "../../constants/types";
import { selectProjects } from "../../redux/state/projectSlice";
const { width, height } = Dimensions.get("window");

const handleOpen = (dispatch: any, projectsCount: any) => {
  dispatch(addModalState([projectsCount > 0 ? ModalTypes.listCreate : ModalTypes.projectCreate]));
};

const CreateListButton = () => {
  const dispatch = useAppDispatch();
  const projectsSelector = useAppSelector(selectProjects);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          handleOpen(dispatch, projectsSelector.length);
        }}
      >
        <View style={styles.buttonContainer}>
          <MaterialCommunityIcons
            color={LightColors.secondary}
            size={30}
            name="playlist-plus"
          ></MaterialCommunityIcons>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: height - 60,
    left: width - 60,
  },
  buttonContainer: {
    width: 50,
    height: 50,
    backgroundColor: listColors["9"],
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreateListButton;
