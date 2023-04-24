import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { addModalState, deleteModalState, selectModal } from "../../redux/state/modalSlice";
import { ModalTypes } from "../../constants/types";
import { LightColors, listColors } from "../../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const DeleteItemButton = () => {
    const modalProps = useAppSelector(selectModal);
    const dispatch = useAppDispatch();
    const deleteHandle = () => {
      dispatch(deleteModalState());
      const timeoutId = setTimeout(() => {
        dispatch(
          addModalState([
            ModalTypes.deleteModal,
            modalProps.elementId,
            modalProps.title,
            modalProps.elementType,
          ])
        );
      }, 100);
      return () => clearTimeout(timeoutId);
    };
  
    return (
      <TouchableOpacity
        onPress={() => {
          console.log("Delete");
          deleteHandle();
        }}
        style={styles.deleteButton}
      >
        <View style={[styles.buttonContainer,{backgroundColor:LightColors.priorities.high}]}>
          <MaterialCommunityIcons
            color={LightColors.primary}
            size={20}
            name="trash-can"
          ></MaterialCommunityIcons>
        </View>
      </TouchableOpacity>
    );
  };
  

  
const styles = StyleSheet.create({
 
    buttonContainer: {
      width: 50,
      height: 50,
      backgroundColor: listColors["1"],
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    deleteButton: {
      flex: 1,
    },
  });