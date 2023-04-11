import { Component, FC } from "react";
import { View, Text,TouchableOpacity } from "react-native";
import { LightColors } from "../../../constants/Colors";
import { styles } from "./parentTask.styles";
import { ITask } from "../../../interfaces/ITask";
import { priorities } from "../../../constants/types";
import {  } from "react-native-gesture-handler";
import { IParentTask } from "../../../interfaces/IParentTask";

const getPriorityColor = (priority) => {
  return typeof priority === "string" ? LightColors.priorities[priority] : "";
};
interface ITaskViewProps {
  Task: IParentTask;
}

const ParentTaskView: FC<ITaskViewProps> = ({ Task }) => {
  

  return (
    <TouchableOpacity style={{backgroundColor:"orange",  borderRadius:10,
   
    marginBottom:20}}>
    <View style={[styles.taskContainer, { backgroundColor: Task.color }]}>
      <View style={styles.taskHeader}>
        <View style={styles.title}>
          <Text style={styles.headerText}>{Task.title.toUpperCase()}</Text>
        </View>
        {Task.priority ? (
          <View style={[styles.priority, { backgroundColor: getPriorityColor(Task.priority) }]}>
            <Text style={[styles.priorityText]}>{Task.priority}</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.taskBody}>
        <Text style={styles.bodyText}>{Task.text}</Text>
      </View>
    </View>
    </TouchableOpacity>
  );
};

export default ParentTaskView