import { Text, TouchableOpacity } from "react-native";
import { styles } from "./project.styles";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { selectProjects } from "../../../redux/state/projectSlice";
import Project from "../../../models/Project";
import { FC } from "react";
import { setSelectedProject } from "../../../redux/state/selectedProjectSlice";
import { getProjectLists, selectAlllists, selectlists } from "../../../redux/state/listSlice";

interface IPorjectViewProps {
  Project: Project;
  props: any;
}
const ProjectView: FC<IPorjectViewProps> = ({ Project, props }) => {

  const projectsSelector = useAppSelector(selectProjects);
  const listsSelector = useAppSelector(selectAlllists);
  const dispatch = useAppDispatch()
  return (
    <TouchableOpacity
      style={[styles.homeButton, { backgroundColor: Project.color }]}
      onPress={() => {
        dispatch(setSelectedProject(Project))
        dispatch(getProjectLists([listsSelector,Project.id]));
        props.prop.navigation.navigate("Home");
      }}
    >
      <Text style={styles.buttonText}>{Project.title}</Text>
    </TouchableOpacity>
  );
};

export default ProjectView;
