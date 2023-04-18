import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./project.styles";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { selectProjects } from "../../../redux/state/projectSlice";
import Project from "../../../models/Project";
import { FC } from "react";
import { setSelectedProject } from "../../../redux/state/selectedProjectSlice";
import { getProjectLists, selectAlllists, selectlists } from "../../../redux/state/listSlice";
import { IProject } from "../../../interfaces/IProject";
import { addModalState } from "../../../redux/state/modalSlice";
import { ModalTypes, types } from "../../../constants/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LightColors } from "../../../constants/Colors";

interface IPorjectViewProps {
  Project: Project;
  props: any;
}

const deleteHandle = (id: IProject["id"], title: IProject["title"], dispatch: any) => {
  dispatch(addModalState([ModalTypes.deleteModal, id, title, types.project]));
};

const ProjectView: FC<IPorjectViewProps> = ({ Project, props }) => {
  const projectsSelector = useAppSelector(selectProjects);
  const listsSelector = useAppSelector(selectAlllists);
  const dispatch = useAppDispatch();
  return (
    <TouchableOpacity
      style={[styles.homeButton, { backgroundColor: Project.color }]}
      onPress={() => {
        dispatch(setSelectedProject(Project));
        dispatch(getProjectLists([listsSelector, Project.id]));
        props.prop.navigation.navigate("Home");
      }}
    >
      <View style={styles.buttonView}>
        <Text style={styles.buttonText}>{Project.title}</Text>
        <TouchableOpacity
          onPress={() => {
            console.log("Delete");
            deleteHandle(Project.id, Project.title, dispatch);
          }}
          style={styles.deleteButton}
        >
          <View style={styles.buttonContainer}>
            <MaterialCommunityIcons
              color={LightColors.tertiary}
              size={20}
              name="trash-can"
            ></MaterialCommunityIcons>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProjectView;
