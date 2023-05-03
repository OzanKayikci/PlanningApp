import { Platform, ScrollView, Text, TouchableOpacity, View, Switch } from "react-native";
import styles from "./createTaskItemModal.styles";
import { TextInput } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FC, ReactNode, useEffect, useState } from "react";
import { LightColors, listColors } from "../../../../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Dropdown from "../../../DropDown";
import { ModalTypes, ParentTypes, priorities, shapes } from "../../../../constants/types";
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
import { selectlists } from "../../../../redux/state/listSlice";
import { IList } from "../../../../interfaces/IList";

const colorValues = Object.values(listColors);
const shapeValues = Object.values(shapes);
const priorityValues = Object.values(priorities);

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

interface ITimePicker {
  oldDate: number;
  setNewDate: React.Dispatch<React.SetStateAction<number>>;
}

//TODO: update e done ekle
const TimePicker: FC<ITimePicker> = ({ oldDate = 0, setNewDate }) => {
  const [timePicker, setTimePicker] = useState(false);
  const [time, setTime] = useState(
    new Date(oldDate !== 0 ? oldDate : Date.now() - new Date().getTimezoneOffset() * 60 * 1000)
  );
  const onTimeSelected = (event: any, value: Date) => {
    setTime(value);
    setNewDate(value.getTime());
    setTimePicker(false);
  };
  const showTimePicker = () => {
    setTimePicker(true);
  };
  return (
    <View style={{ width: "47.5%" }}>
      {timePicker && (
        <DateTimePicker
          value={time.getTime() !== 0 ? time : new Date()}
          mode={"time"}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          is24Hour={true}
          onChange={onTimeSelected}
          positiveButton={{ label: "OK", textColor: "green" }}
          timeZoneOffsetInMinutes={0}
          // style={styleSheet.datePicker}
        />
      )}

      {!timePicker && (
        <View style={{}}>
          <TouchableOpacity onPress={showTimePicker}>
            <TextInput
              value={
                time.getTime() !== 0
                  ? `${time.getUTCHours() < 10 ? "0" + time.getUTCHours() : time.getUTCHours()}:${
                      time.getUTCMinutes() < 10 ? "0" + time.getUTCMinutes() : time.getUTCMinutes()
                    }`
                  : "Select Time"
              }
              editable={false}
              style={[styles.itemInput, { width: "100%", textAlign: "center", color: LightColors.secondary }]}
            ></TextInput>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
interface IDatePicker {
  oldDate: number;
  setNewDate: React.Dispatch<React.SetStateAction<number>>;
}
const DatePicker: FC<IDatePicker> = ({ oldDate = 0, setNewDate }) => {
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date(oldDate != 0 ? oldDate : new Date()));

  useEffect(() => {
    setNewDate(date.getTime());
  }, []);

  const showDatePicker = () => {
    setDatePicker(true);
  };

  const onDateSelected = (event: any, value: any) => {
    setDate(value);
    setNewDate(value.getTime());
    setDatePicker(false);
  };

  return (
    <View style={{ width: "47.5%" }}>
      {datePicker && (
        <DateTimePicker
          value={date.getTime() !== 0 ? date : new Date()}
          mode={"date"}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onDateSelected}
          //  style={styleSheet.datePicker}
        />
      )}

      {!datePicker && (
        <View style={{}}>
          <TouchableOpacity onPress={showDatePicker}>
            <TextInput
              value={
                date.getTime() !== 0
                  ? date.toLocaleDateString("tr-TR", {
                      day: "2-digit",
                      month: "short",
                      year: "2-digit",
                    })
                  : "Select Date"
              }
              editable={false}
              style={[styles.itemInput, { width: "100%", textAlign: "center", color: LightColors.secondary }]}
            ></TextInput>
          </TouchableOpacity>
        </View>
      )}
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
  newIsCompleted: ITask["isCompleted"] = null,
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
    .setIsCompleted(newIsCompleted ?? Task.isCompleted)
    .taskBuild();


  const taskService: ITaskService = new TaskService();

  taskService.update(updatedTask).then((value) => {
    console.log("local store a Task kaydetme başarılı");
    value === "success"
      ? dispatch(updateTaskById(updatedTask.getAllItems))
      : console.log("redux Task kaydetme başarısız");
    dispatch(setButtonAction([false, ""]));
  });
};

//TODO: date silme özelliği yaz

export const CreateTaskModalBody = () => {
  const saveButtonActive = useAppSelector(selectButtonAction);
  const selectedProject = useAppSelector(selectSelectedProject);
  const projectLists = useAppSelector(selectlists);
  const modalProps = useAppSelector(selectModal);
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<ITask["title"]>("");
  const [color, setColor] = useState<ITask["color"]>(listColors[6]);
  const [shape, setShape] = useState<ITask["colorShape"]>(shapes[1]);
  const [text, setText] = useState<ITask["text"]>("");
  const [priority, setPriority] = useState<ITask["priority"]>(null);
  const [startDate, setStartDate] = useState<ITask["startDate"]>(null);
  const [endDate, setEndDate] = useState<ITask["endDate"]>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [listId, setListId] = useState<ITask["listId"]>(100);
  const [listName, setListName] = useState<IList["title"]>("");
  const [taskforUpdate, setTaskforUpdate] = useState<ITask>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState("");
  const [isStartDateSwitchEnabled, setStartDateSwitchIsEnabled] = useState(false);
  const [isEndDateSwitchEnabled, setEndDateSwitchEnabled] = useState(false);
  const [isCompleted, setIsCompleted] = useState<ITask["isCompleted"]>(false);
  const toggleDateSwitch = () => setStartDateSwitchIsEnabled((previousState) => !previousState);
  const toggleTimeSwitch = () => setEndDateSwitchEnabled((previousState) => !previousState);
  const toggleCompleteSwitch = () => setIsCompleted((previousState) => !previousState);
  //?when date switch is disabled
  useEffect(() => {
    if (!isStartDateSwitchEnabled) {
      console.log("startDate", isStartDateSwitchEnabled);
      setStartDate(0);
    }
  }, [isStartDateSwitchEnabled]);

  useEffect(() => {
    if (!isEndDateSwitchEnabled) {
      console.log("endDate", isEndDateSwitchEnabled);
      setEndDate(0);
    }
  }, [isEndDateSwitchEnabled]);


  
  //? when times changed
  useEffect(() => {
    const time = new Date(startTime);
    setStartDate(new Date(new Date(startDate).setHours(time.getHours(), time.getMinutes(), 0, 0)).getTime());
  }, [startTime]);

  useEffect(() => {
    const time = new Date(endTime);
    setEndDate(new Date(new Date(endDate).setHours(time.getHours(), time.getMinutes(), 0, 0)).getTime());
  }, [endTime]);


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
        setStartDateSwitchIsEnabled(value.hasStartDate);
        setEndDateSwitchEnabled(value.hasEndDate);
        setIsCompleted(value.isCompleted);
        setListName(projectLists.filter((list) => list.id === value.listId)[0].title);
      });
    }
    if (modalProps.type === ModalTypes.taskCreate) {
      setListName(projectLists.filter((list) => list.id === modalProps.elementId)[0].title);
      setListId(modalProps.elementId);
    }
  }, [modalProps]);

  useEffect(() => {
    listName !== "" ? setListId(projectLists.filter((list) => list.title === listName)[0].id) : null;
  }, [listName]);

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
            isCompleted,
            dispatch
          );
          break;

        default:
          break;
      }
    }
  }, [saveButtonActive]);
  return (
    <ScrollView scrollEnabled={isDrawerOpen === ""} nestedScrollEnabled={true}>
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
        <View style={[styles.bodyItem, { height: isDrawerOpen === "priority" ? 500 : 64 }]}>
          <Text style={styles.itemLabel}>Priority</Text>
          <Dropdown
            options={priorityValues}
            value={priority}
            backgroundColor={LightColors.primary}
            action={setPriority}
            isopen={setIsDrawerOpen}
            type="priority"
            headerColor="rgba(200, 210, 247,0.2)"
            //itemColor="rgba(200, 210, 247,0.8)"
          />
        </View>

        <View style={[styles.bodyItem, { height: isDrawerOpen === "list" ? 500 : 64 }]}>
          <Text style={styles.itemLabel}>List</Text>
          <Dropdown
            options={projectLists.map((list) => list.title)}
            value={listName}
            backgroundColor={LightColors.primary}
            action={setListName}
            isopen={setIsDrawerOpen}
            type="list"
            headerColor="rgba(200, 210, 247,0.2)"
            //itemColor="rgba(200, 210, 247,0.8)"
          />
        </View>

        <View style={[styles.bodyItem, { height: isDrawerOpen === "color" ? 500 : 64 }]}>
          <Text style={styles.itemLabel}>Color</Text>

          <Dropdown
            options={colorValues}
            value={color}
            SecondElement={DropDownColorElement}
            backgroundColor={LightColors.primary}
            action={setColor}
            type="color"
            isopen={setIsDrawerOpen}
            headerColor="rgba(200, 210, 247,0.2)"
            //itemColor="rgba(200, 210, 247,0.8)"
          />
        </View>
        <View style={[styles.bodyItem, { height: isDrawerOpen === "shape" ? 500 : 64 }]}>
          <Text style={styles.itemLabel}>Shape</Text>
          <Dropdown
            options={shapeValues}
            value={shape}
            SecondElement={DropDownShapeElement}
            backgroundColor={LightColors.primary}
            action={setShape}
            isopen={setIsDrawerOpen}
            type="shape"
            headerColor="rgba(200, 210, 247,0.2)"
            //itemColor="rgba(200, 210, 247,0.8)"
          />
        </View>
        <View style={[styles.bodyItem]}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={[styles.itemLabel]}>Start Date</Text>

            <Switch
              trackColor={{ false: LightColors.darkBackground, true: listColors[7] }}
              thumbColor={isStartDateSwitchEnabled ? LightColors.primary : LightColors.primary}
              onValueChange={toggleDateSwitch}
              value={isStartDateSwitchEnabled}
              style={{ height: 20 }}
            />
          </View>
          {isStartDateSwitchEnabled ? (
            <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
              <DatePicker oldDate={startDate} setNewDate={setStartDate} />
              <TimePicker oldDate={startDate} setNewDate={setStartTime} />
            </View>
          ) : null}
        </View>
        <View style={[styles.bodyItem]}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.itemLabel}>End Date</Text>

            <Switch
              trackColor={{ false: LightColors.darkBackground, true: listColors[7] }}
              thumbColor={isEndDateSwitchEnabled ? LightColors.primary : LightColors.primary}
              onValueChange={toggleTimeSwitch}
              value={isEndDateSwitchEnabled}
              style={{ height: 20 }}
            />
          </View>
          {isEndDateSwitchEnabled ? (
            <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
              <DatePicker oldDate={endDate} setNewDate={setEndDate} />
              <TimePicker oldDate={endDate} setNewDate={setEndTime} />
            </View>
          ) : null}
        </View>

        {modalProps.type === ModalTypes.taskDetail ? (
          <View style={[styles.bodyItem]}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={styles.itemLabel}>Is Completed</Text>

              <Switch
                trackColor={{ false: LightColors.darkBackground, true: listColors[16] }}
                thumbColor={isCompleted ? LightColors.primary : LightColors.primary}
                onValueChange={toggleCompleteSwitch}
                value={isCompleted}
                style={{ height: 20 }}
              />
            </View>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};
