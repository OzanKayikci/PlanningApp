import { Text, View } from "react-native";
import styles from "./deleteModal.styles";
import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { deleteModalState, selectModal, selectModalType } from "../../../redux/state/modalSlice";
import { IBase } from "../../../interfaces/IBase";
import { deletelistById } from "../../../redux/state/listSlice";
import { IListService } from "../../../services/Abstract/IListService";
import { ListService } from "../../../services/Concrete/ListService";
import {
  selectButtonAction,
  selectButtonType,
  setButtonAction,
} from "../../../redux/state/buttonActionSlice";

const deleteHandle = (id: IBase["id"], dispatch: any) => {
  dispatch(deletelistById(id));
  const listService: IListService = new ListService();
  listService.delete(id).then((res) => {
    console.log("list silindi", res);
    dispatch(deleteModalState());
    dispatch(setButtonAction([false, ""]));
  });
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
  useEffect(() => {
    if (buttonAction && buttontype === "delete" && element.elementId) {
      deleteHandle(element.elementId, dispatch);
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
