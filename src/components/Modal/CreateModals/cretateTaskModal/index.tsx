import { Text, TouchableOpacity, View } from "react-native";
import styles from "./createTaskItemModal.styles";
import { TextInput } from "react-native-gesture-handler";
import { FC, ReactNode, useEffect, useState } from "react";
import { LightColors, listColors } from "../../../../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Dropdown from "../../../DropDown";
import { ModalTypes, ParentTypes, shapes } from "../../../../constants/types";
import GetShape from "../../../shapeView";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";
import { selectButtonAction, setButtonAction } from "../../../../redux/state/buttonActionSlice";

import { selectModal } from "../../../../redux/state/modalSlice";

import { selectSelectedProject } from "../../../../redux/state/selectedProjectSlice";
import { ITask } from "../../../../interfaces/ITask";
import { ITaskService } from "../../../../services/Abstract/ITaskService";
import { TaskService } from "../../../../services/Concrete/TaskService";
import { addTask, updateTaskById } from "../../../../redux/state/taskSlice";
import Task from "../../../../models/Task";
import { TaskBuilder } from "../../../../models/Task/taskBuilder";

// const GetList = () => {
//     let list: IList =
//      new ListBuilder(1, types.list, "TODO", LightColors.listColors[13], shapes.circle)
//       .setChildGroupId(2)
//       .setChildren([GetTask1(), GetTask2(), GetTask3()])
//       .setIsChild(false)
//       .listBuild();

//     return <ListView List={list}></ListView>;
//   };

const colorValues = Object.values(listColors);
const shapeValues = Object.values(shapes);

const DropDownColorElement = ({ item }: any) => {
  return <View style={{ width: 15, height: 15, borderRadius: 5, backgroundColor: item }}></View>;
};
const DropDownShapeElement = ({ item }: any) => {
  return (
    <View style={{ width: 15, height: 15, justifyContent: "center" }}>
      <GetShape shape={item} />
    </View>
  );
};
export const CreateTaskModalHeader = ({ title = "NEW TASK" }) => {
  return (
    <View style={[styles.container, styles.header]}>
      <Text style={styles.HeaderText}>{title}</Text>
    </View>
  );
};

//TODO: handle klasörü oluştur.  create ve update methodlarını oraya taşı.
//TODO: Task service oluştur ve ortak işlemleri orada yürüt
const createANewTask = (
  title: ITask["title"],
  color: ITask["color"],
  shape: ITask["colorShape"],
  groupId: ITask["groupId"] = 0,
  text: ITask["text"],
  listId: ITask["listId"],
  priority: ITask["priority"] = null,
  startDate: ITask["startDate"] = 0,
  endDate: ITask["endDate"] = 0,
  dispatch: any,
  ParentType: ITask["parentType"] = ParentTypes.list
) => {
  const taskService: ITaskService = new TaskService();

  taskService
    .create(title, color, shape, groupId, text, listId, priority, startDate, endDate, ParentType)
    .then((value) => {
      console.log("task kaydetme başarılı");
      console.log("value", value);
      value !== null ? dispatch(addTask(value)) : console.log("redux task kaydetme başarısız");
      dispatch(setButtonAction([false, ""]));
    });
};

const updateTask = (
  Task: ITask,
  newTitle: ITask["title"],
  newColor: ITask["color"],
  newShape: ITask["colorShape"],
  newText: ITask["text"],
  newlistId: ITask["listId"] = null,
  newPriority: ITask["priority"] = null,
  newStartDate: ITask["startDate"] = null,
  newEndDate: ITask["endDate"] = null,
  dispatch: any
) => {
  const updatedTask: Task = new TaskBuilder(
    Task.id,
    Task.type,
    newTitle,
    newText,
    newColor,
    newShape,
    newlistId ?? Task.listId
  )
    .SetParentId(Task.listId)
    .setGroupId(Task.groupId)
    .setIsParent(Task.IsParent)
    .setIsChild(Task.isChild)
    .setPriority(newPriority ?? Task.priority)
    .setEndDate(newEndDate ?? Task.endDate)
    .setStartDate(newStartDate ?? Task.startDate)
    .setParentType(Task.parentType)
    .taskBuild();

  const taskService: ITaskService = new TaskService();

  taskService.update(updatedTask).then((value) => {
    console.log("local store a Task kaydetme başarılı");
    value === "success"
      ? dispatch(updateTaskById(updatedTask))
      : console.log("redux Task kaydetme başarısız");
    dispatch(setButtonAction([false, ""]));
  });
};

export const CreateTaskModalBody = () => {
  const [title, setTitle] = useState<ITask["title"]>("");
  const [color, setColor] = useState<ITask["color"]>(listColors[6]);
  const [shape, setShape] = useState<ITask["colorShape"]>(shapes[1]);
  const [text, setText] = useState<ITask["text"]>("");
  const [priority, setPriority] = useState<ITask["priority"]>(null);
  const [startDate, setStartDate] = useState<ITask["startDate"]>(null);
  const [endDate, setEndDate] = useState<ITask["endDate"]>(null);
  const [listId, setListId] = useState<ITask["listId"]>(100);
  const [taskforUpdate, setTaskforUpdate] = useState<ITask>(null);

  const saveButtonActive = useAppSelector(selectButtonAction);
  const selectedProject = useAppSelector(selectSelectedProject);
  const modalProps = useAppSelector(selectModal);
  const dispatch = useAppDispatch();

  //? when modal type is update
  useEffect(() => {
    if (modalProps.type === ModalTypes.taskDetail) {
      const taskService: ITaskService = new TaskService();
      taskService.getById(modalProps.elementId).then((value) => {
        setTaskforUpdate(value);
        console.log("valval", value);
        setTitle(value.title);
        setColor(value.color);
        setShape(value.colorShape);
        setText(value.text);
        setPriority(value.priority);
        setStartDate(value.startDate);
        setEndDate(value.endDate);
        setListId(value.listId);
      });
    }
  }, [modalProps]);

  useEffect(() => {
    if (saveButtonActive) {
      console.log("butona tıklandı saveButtonActive", saveButtonActive, modalProps);
      switch (modalProps.type) {
        case ModalTypes.taskCreate:
          createANewTask(
            title,
            color,
            shape,
            selectedProject.id,
            text,
            modalProps.elementId,
            priority,
            startDate,
            endDate,
            dispatch,
            ParentTypes.list
          );
          break;
        case ModalTypes.taskDetail:
          updateTask(
            taskforUpdate,
            title,
            color,
            shape,
            text,
            listId,
            priority,
            startDate,
            endDate,
            dispatch
          );
          break;

        default:
          break;
      }
    }
  }, [saveButtonActive]);

  return (
    <View style={[styles.container, styles.body]}>
      <View style={styles.bodyItem}>
        <Text style={styles.itemLabel}>Title</Text>
        <TextInput
          value={title}
          onChangeText={(value) => {
            setTitle(value);
          }}
          style={styles.itemInput}
        ></TextInput>
      </View>
      <View style={styles.bodyItem}>
        <Text style={styles.itemLabel}>Text</Text>
        <TextInput
          value={text}
          onChangeText={(value) => {
            setText(value);
          }}
          multiline
          style={[
            styles.itemInput,
            { height: 100, fontSize: 12, textAlignVertical: "top", paddingVertical: 10 },
          ]}
        ></TextInput>
      </View>

      <View style={[styles.bodyItem, { zIndex: 10 }]}>
        <Text style={styles.itemLabel}>Color</Text>

        <Dropdown
          options={colorValues}
          value={color}
          SecondElement={DropDownColorElement}
          backgroundColor={LightColors.primary}
          action={setColor}
          type="color"
          headerColor="rgba(200, 210, 247,0.2)"
          //itemColor="rgba(200, 210, 247,0.8)"
        />
      </View>
      <View style={styles.bodyItem}>
        <Text style={styles.itemLabel}>Shape</Text>
        <Dropdown
          options={shapeValues}
          value={shape}
          SecondElement={DropDownShapeElement}
          backgroundColor={LightColors.primary}
          action={setShape}
          type="shape"
          headerColor="rgba(200, 210, 247,0.2)"
          //itemColor="rgba(200, 210, 247,0.8)"
        />
      </View>
    </View>
  );
};
