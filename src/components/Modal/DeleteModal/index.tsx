import { Text, View } from "react-native";
import styles from "./deleteModal.styles";
import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { deleteModalState, selectModal, selectModalType } from "../../../redux/state/modalSlice";
import { IBase } from "../../../interfaces/IBase";
import { deletelistById, getProjectLists, selectAlllists } from "../../../redux/state/listSlice";
import { IListService } from "../../../services/Abstract/IListService";
import { ListService } from "../../../services/Concrete/ListService";
import {
  selectButtonAction,
  selectButtonType,
  setButtonAction,
} from "../../../redux/state/buttonActionSlice";
import { types } from "../../../constants/types";
import { deleteProjectById, selectProjects } from "../../../redux/state/projectSlice";
import { IProjectService } from "../../../services/Abstract/IProjectService";
import { ProjectService } from "../../../services/Concrete/ProjectService";
import { setSelectedProject } from "../../../redux/state/selectedProjectSlice";
import { IProject } from "../../../interfaces/IProject";
import { IList } from "../../../interfaces/IList";
import { ITaskService } from "../../../services/Abstract/ITaskService";
import { TaskService } from "../../../services/Concrete/TaskService";
import { deleteTaskById } from "../../../redux/state/taskSlice";

//TODO:  handle klasörü oluştur. delete işlemlerini orada yap
const deleteHandle = (
  id: IBase["id"],
  dispatch: any,
  elementType: types,
  nextSelectedProject?: IProject,
  listsSelector?: IList[]
) => {
  switch (elementType) {
    case types.list:
      dispatch(deletelistById(id));
      const listService: IListService = new ListService();
      listService.delete(id).then((res) => {
        console.log("list silindi", res);
        dispatch(deleteModalState());
        dispatch(setButtonAction([false, ""]));
        const taskService: ITaskService = new TaskService();
        taskService.deleteByListId(id).then((res) => {
          console.log("bu lşisteye ait tasklar silindi", res);
        });
      });

      break;
    case types.project:
      dispatch(deleteProjectById(id));
      const projectService: IProjectService = new ProjectService();
      projectService.delete(id).then((res) => {
        console.log("project silindi", res);
        dispatch(setSelectedProject(nextSelectedProject));
        dispatch(getProjectLists([listsSelector, nextSelectedProject.id]));

        dispatch(deleteModalState());
        dispatch(setButtonAction([false, ""]));
        const listService: IListService = new ListService();
        listService.deleteByGroupId(nextSelectedProject.id).then((res) => {
          console.log("bu projeye ait listeler silindi", res);
        });
        const taskService: ITaskService = new TaskService();
        taskService.deleteByGroupId(id).then((res) => {
          console.log("bu projeye ait tasklar silindi", res);
        });
      });
      break;
    case types.task:
      dispatch(deleteTaskById(id));
      const taskService: ITaskService = new TaskService();
      taskService.delete(id).then((res) => {
        console.log("task silindi", res);
        dispatch(deleteModalState());
        dispatch(setButtonAction([false, ""]));
      });

      break;
    default:
      break;
  }
};

export const DeleteModalHeader = () => {
  return (
    <View style={[styles.container, styles.header]}>
      <Text style={styles.HeaderText}>DELETE</Text>
    </View>
  );
};

export const DeleteModalBody = () => {
  const dispatch = useAppDispatch();
  const modalType = useAppSelector(selectModalType);
  const element = useAppSelector(selectModal);
  const buttonAction = useAppSelector(selectButtonAction);
  const buttontype = useAppSelector(selectButtonType);
  const allProjects = useAppSelector(selectProjects);
  const listsSelector = useAppSelector(selectAlllists);

  useEffect(() => {
    if (buttonAction && buttontype === "delete" && element.elementId) {
      deleteHandle(element.elementId, dispatch, element.elementType, allProjects[0], listsSelector);
    }
    console.log("actt", buttonAction);
  }, [buttonAction]);

  return (
    <View style={styles.body}>
      <Text style={styles.bodyItem}>
        Are you sure you want to delete{" "}
        <Text style={{ color: "red", fontWeight: "bold" }}>{element.title}</Text> ?
      </Text>
    </View>
  );
};
