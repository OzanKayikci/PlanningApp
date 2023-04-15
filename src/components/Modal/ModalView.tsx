import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { IModalView } from "../../interfaces/IModal";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { LightColors, listColors } from "../../constants/Colors";
import { ModalTypes } from "../../constants/types";
import {
  CreateListModalBody,
  CreateListModalFooter,
  CreateListModalHeader,
} from "./CreateModals/createListModal/createListModal";

import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { selectButtonAction } from "../../redux/state/buttonActionSlice";
import { deleteModalState, selectModalState, selectModalType } from "../../redux/state/modalSlice";
import { DeleteModalBody, DeleteModalHeader } from "./DeleteModal";
import DeleteButton from "../Buttons/deleteButton";

const { height, width } = Dimensions.get("window");

const handleClose = (dispatch: any) => {
  dispatch(deleteModalState());
};

const ModalView = ({ children }) => {
  const okeyButtonActive = useAppSelector(selectButtonAction);
  const modalType = useAppSelector(selectModalType);

  const isVisible: boolean = useAppSelector(selectModalState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!okeyButtonActive) {
      handleClose(dispatch);
    }
  }, [okeyButtonActive]);

  let header: ReactNode;
  let body: ReactNode;
  let footer: ReactNode;
  let modalStyle = styles;
  switch (modalType) {
    case ModalTypes.listCreate:
      header = <CreateListModalHeader />;
      body = <CreateListModalBody />;
      footer = <CreateListModalFooter />;

      modalStyle.modalView.height = "95%";
      modalStyle.body.flex = 10;
      break;
    case ModalTypes.deleteModal:
      header = <DeleteModalHeader />;
      body = <DeleteModalBody />;
      footer = <DeleteButton />;

      modalStyle.modalView.height = "35%";
      modalStyle.body.flex = 2;
      break;
      case ModalTypes.listDetail:
        header = <CreateListModalHeader title="UPDATE LIST" />;
        body = <CreateListModalBody />;
        footer = <CreateListModalFooter />;
    default:
      break;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={150}
        enabled
      >
        <Modal animationType="slide" visible={isVisible} transparent={true} style={modalStyle.centeredView}>
          <BlurView style={styles.blurViewStyle} tint="dark" intensity={90}>
            <View style={styles.modalView}>
              <View style={styles.header}>{header}</View>
              <View style={modalStyle.body}>
                {/* <ScrollView>{body}</ScrollView> */}
                {body}
              </View>
              <View style={styles.footer}>
                {children}
                {footer}
              </View>
            </View>
          </BlurView>
        </Modal>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    position: "absolute",
    height: height,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  blurViewStyle: {
    position: "absolute",
    height: height,

    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "90%",
    height: "95%",
    backgroundColor: "rgba(200,200,200,0)",
    paddingVertical: "5%",
    paddingHorizontal: "2%",
    borderRadius: 20,
    elevation: 120,
  },
  header: {
    flex: 1,
    backgroundColor: LightColors.primary,
    elevation: 5,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,

    borderColor: listColors["12"],
  },
  body: {
    flex: 10,
    backgroundColor: LightColors.primary,
    marginVertical: 10,
    elevation: 5,
    borderRadius: 20,

    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderColor: listColors["12"],
  },
  footer: {
    //backgroundColor: "orange",
    flex: 1.1,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: LightColors.primary,
    elevation: 5,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,

    borderColor: listColors["12"],
  },
});
export default ModalView;
