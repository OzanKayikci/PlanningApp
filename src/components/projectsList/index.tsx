import { useEffect, useState } from "react";
import { IProject } from "../../interfaces/IProject";
import { selectProjects } from "../../redux/state/projectSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProjectView from "../ModelsComponents/Project";
import { styles } from "./projecstList.styles";
import { addModalState } from "../../redux/state/modalSlice";
import { ModalTypes } from "../../constants/types";
import { LightColors } from "../../constants/Colors";

const handleOpen = (dispatch: any) => {
  dispatch(addModalState([ModalTypes.projectCreate]));
};

const Projects = ({ props }) => {
  const [projects, setProjects] = useState<IProject[]>(useAppSelector(selectProjects));
  const allProjects = useAppSelector(selectProjects);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setProjects(allProjects);
  }, [allProjects]);
  const childComponent = ({ item, index }: any) => {
    return <ProjectView key={item !== null ? item.id : -1} Project={item} props={props} />;
  };
  return (
    <View style={styles.continer}>
      <View style={styles.middleView}>
        <View style={styles.header}>{<Text style={styles.headerText}> PROJECTS</Text>}</View>

        <FlatList
          data={projects}
          renderItem={childComponent}
          keyExtractor={(item, index) => (index != null ? index.toString() : "0")}
          style={styles.list}
        />
      </View>

      <View style={styles.bottomView}>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => {
            handleOpen(dispatch);
          }}
        >
          <View style={styles.buttonView}>
            <MaterialCommunityIcons name="plus-box-multiple-outline" size={25} color={LightColors.white} />
            <Text style={styles.buttonText}>New Project</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Projects;
