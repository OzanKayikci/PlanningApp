import { Component, FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LightColors, listColors } from "../../../constants/Colors";
import { styles } from "./task.styles";
import { ITask } from "../../../interfaces/ITask";
import { ModalTypes, ParentTypes, priorities, types } from "../../../constants/types";
import {} from "react-native-gesture-handler";
import { addModalState } from "../../../redux/state/modalSlice";
import { useAppDispatch } from "../../../redux/hooks/hooks";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IList } from "../../../interfaces/IList";

const getPriorityColor = (priority: any) => {
  return typeof priority === "string" ? LightColors.priorities[priority] : "";
};
interface ITaskViewProps {
  Task: ITask;
}

const handleOpen = (dispatch: any, listId: IList["id"]) => {
  dispatch(addModalState([ModalTypes.taskCreate, listId]));
};
const updateHandle = (id: ITask["id"], title: ITask["title"], dispatch: any) => {
  dispatch(addModalState([ModalTypes.taskDetail, id, title, types.task]));
};

//TODO: done olmuş ise geçen zaman çizgisinin yerine tik işareti koy
const TaskView: FC<ITaskViewProps> = ({ Task }) => {
  const taskWidth: string = Task.parentType === ParentTypes.task ? "90%" : styles.taskContainer.width;
  const dispatch = useAppDispatch();
  const dates = {
    startDate: new Date(Task.startDate).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    }),
    startTime: new Date(Task.startDate + new Date().getTimezoneOffset() * 60 * 1000).toLocaleTimeString(
      "tr-TR",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    ),
    endDate: new Date(Task.endDate).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    }),
    endTime: new Date(Task.endDate + new Date().getTimezoneOffset() * 60 * 1000).toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    passingTime:
      new Date(Date.now() - new Date().getTimezoneOffset() * 60 * 1000).getTime() -
      new Date(Task.startDate).getTime(),
  };
  const timeLineWidth: string =
    dates.passingTime > Task.endDate - Task.startDate
      ? "100%"
      : (dates.passingTime / (Task.endDate - Task.startDate)) * 100 + "%";
  return (
    <TouchableOpacity
      onPress={() => {
        updateHandle(Task.id, Task.title, dispatch);
      }}
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
        {!Task.isCompleted ? (
          <View style={styles.taskFooter}>
            {Task.startDate > 0 ? (
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 10, color: "rgb(75,75,75)" }}>{dates.startDate}</Text>
                <Text style={{ fontSize: 9, color: "rgb(75,75,75)" }}>{dates.startTime}</Text>
              </View>
            ) : null}
            {Task.startDate > 0 && Task.endDate > 0 ? (
              <View style={{ width: "50%", justifyContent: "center" }}>
                <View
                  style={{ height: 1, backgroundColor: "grey", width: "100%", alignSelf: "center" }}
                ></View>
                {/* //? Passing Time Line */}
                <View
                  style={{
                    height: 2,
                    backgroundColor: LightColors.primary,
                    width: timeLineWidth,
                    alignSelf: "flex-start",
                    position: "absolute",
                    alignItems: "flex-end",
                  }}
                >
                  <View
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: LightColors.primary,
                      bottom: 2,
                    }}
                  ></View>
                </View>
              </View>
            ) : null}

            {Task.endDate > 0 ? (
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text style={{ fontSize: 10, color: "rgb(75,75,75)" }}>{dates.endDate}</Text>
                <Text style={{ fontSize: 9, color: "rgb(75,75,75)" }}>{dates.endTime}</Text>
              </View>
            ) : null}
          </View>
        ) : (
          <View
            style={{ width: "50%", justifyContent: "center", alignItems: "center", flexDirection: "row" }}
          >
            <MaterialCommunityIcons
              color={LightColors.secondary}
              size={25}
              name="check-decagram-outline"
            ></MaterialCommunityIcons>
          </View>
        )}

        {/* //? add childtask Button  */}
        {/* <TouchableOpacity
          onPress={() => {
            handleOpen(dispatch, Task.listId);
          }}
          style={[
            styles.deleteButton,
            { width: "15%", height: 20, justifyContent: "center", alignItems: "center" },
          ]}
        >
          <View style={styles.buttonContainer}>
            <MaterialCommunityIcons
              color={LightColors.tertiary}
              size={20}
              name="playlist-plus"
            ></MaterialCommunityIcons>
          </View>
        </TouchableOpacity> */}
      </View>
    </TouchableOpacity>
  );
};

export default TaskView;
