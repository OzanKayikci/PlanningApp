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
import CloseButton from "../Buttons/closeButton";
import { ModalTypes } from "../../constants/types";
import { CreateListModalBody, CreateListModalHeader } from "./CreateModals/createListModal/createListModal";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { selectButtonAction, setButtonAction } from "../../redux/state/buttonActionSlice";

const { height, width } = Dimensions.get("window");

const ModalView: FC<IModalView & { action: () => void }> = ({ type, children, isVisible, action }) => {
  
  const saveButtonActive = useAppSelector(selectButtonAction);

  const dispatch = useAppDispatch();
  const handleClose = useCallback(() => {
    action();
  }, [action]);

  useEffect(() => {
    if (!saveButtonActive) {
      handleClose();
    }
  }, [saveButtonActive]);

  const handleSave = () => {
    dispatch(setButtonAction(true));
  };

  let header: ReactNode;
  let body: ReactNode;
  switch (type) {
    case ModalTypes.listCreate:
      header = <CreateListModalHeader />;
      body = <CreateListModalBody />;
      break;
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
        <Modal animationType="slide" visible={isVisible} transparent={true} style={styles.centeredView}>
          <BlurView style={styles.blurViewStyle} tint="dark" intensity={90}>
            <View style={styles.modalView}>
              <View style={styles.header}>{header}</View>
              <View style={styles.body}>
                {/* <ScrollView>{body}</ScrollView> */}
                {body}
              </View>
              <View style={styles.footer}>
                {children}
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      handleSave();
                    }}
                  >
                    <View style={styles.buttonContainer}>
                      <MaterialCommunityIcons
                        color={LightColors.secondary}
                        size={30}
                        name="playlist-plus"
                      ></MaterialCommunityIcons>
                    </View>
                  </TouchableOpacity>
                </View>
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
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,

    borderColor: listColors["8"],
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
    borderColor: listColors["8"],
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

    borderColor: listColors["8"],
  },
  buttonContainer: {
    width: 50,
    height: 50,
    backgroundColor: listColors["1"],
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ModalView;
