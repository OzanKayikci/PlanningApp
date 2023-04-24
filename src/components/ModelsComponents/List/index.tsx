import { FC, useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { IList } from "../../../interfaces/IList";
import { styles } from "./List.styles";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { LightColors } from "../../../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { addModalState } from "../../../redux/state/modalSlice";
import { ModalTypes, types } from "../../../constants/types";
import { ITask } from "../../../interfaces/ITask";
import { selectTasks } from "../../../redux/state/taskSlice";
import { TaskService } from "../../../services/Concrete/TaskService";
import { ITaskService } from "../../../services/Abstract/ITaskService";
import TaskView from "../Task";
interface IListViewProps {
  List: IList;
}
const handleOpen = (dispatch: any, listId: ITask["id"]) => {
  dispatch(addModalState([ModalTypes.taskCreate, listId]));
};
const updateHandle = (id: IList["id"], title: IList["title"], dispatch: any) => {
  dispatch(addModalState([ModalTypes.listDetail, id, title, types.list]));
};

const childComponent = ({ item }: any) => {
  return <TaskView Task={item}></TaskView>;
};

const getTaskOfList = (listId: IList["id"], setListTasks: any) => {
  const taskService: ITaskService = new TaskService();

  taskService.getByListId(listId).then((tasks) => {
    setListTasks(tasks);
  });
};

const ListView: FC<IListViewProps> = ({ List }) => {
  const [listTasks, setListTasks] = useState<ITask[]>([]);
  const dispatch = useAppDispatch();
  const projectTask = useAppSelector(selectTasks);
console.log("tatat",listTasks)
  useEffect(() => {
    //?? project task null değilse mapping işlemi yap
    projectTask && getTaskOfList(List.id, setListTasks);
  }, []);

  return (
    <View style={[styles.listContainer, { backgroundColor: List.color }]}>
      <View style={styles.listHeader}>
        <TouchableOpacity
          onPress={() => {
            updateHandle(List.id, List.title, dispatch);
          }}
          style={styles.headerButton}
        >
          <Text style={styles.headerText}>{List.title}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleOpen(dispatch, List.id);
          }}
          style={styles.deleteButton}
        >
          <View style={styles.buttonContainer}>
            <MaterialCommunityIcons
              color={LightColors.tertiary}
              size={20}
              name="playlist-plus"
            ></MaterialCommunityIcons>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.listBody}>
        <FlatList
          data={listTasks}
          renderItem={childComponent}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default ListView;
