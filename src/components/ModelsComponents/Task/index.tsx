import { Component, FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LightColors } from "../../../constants/Colors";
import { styles } from "./task.styles";
import { ITask } from "../../../interfaces/ITask";
import { ParentTypes, priorities } from "../../../constants/types";
import {} from "react-native-gesture-handler";

const getPriorityColor = (priority) => {
  return typeof priority === "string" ? LightColors.priorities[priority] : "";
};
interface ITaskViewProps {
  Task: ITask;
}

const TaskView: FC<ITaskViewProps> = ({ Task }) => {
  const taskWidth: string = Task.parentType === ParentTypes.task ? "90%" : styles.taskContainer.width;
  return (
    <TouchableOpacity
      style={{
        borderRadius: 10,

        marginBottom: 20,
      }}
    >
      <View
        style={[
          styles.taskContainer,
          { backgroundColor: Task.color, width: taskWidth, alignSelf: "flex-end" },
        ]}
      >
        <View style={styles.taskHeader}>
          {Task.parentType === ParentTypes.task ? (
            <Text
              style={[
                { position: "absolute", right: "108%", fontSize: 25, top: -10, color: LightColors.secondary },
                { transform: [{ rotateZ: "90deg" }] },
              ]}
            >
              {"⤴"}
            </Text>
          ) : null}

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

export default TaskView;
