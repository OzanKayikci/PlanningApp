import { useCallback } from "react";

import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";

import { LightColors, listColors } from "../../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { addModalState, deleteModalState } from "../../redux/state/modalSlice";
import { ModalTypes } from "../../constants/types";
import { deletelistById } from "../../redux/state/listSlice";
import { setButtonAction } from "../../redux/state/buttonActionSlice";
const { width, height } = Dimensions.get("window");

const handleDelete = (dispatch: any) => {
  dispatch(setButtonAction([true,"delete"]));
};

const DeleteButton = () => {
  const dispatch = useAppDispatch();

  return (
  
      <TouchableOpacity
        onPress={() => {
          handleDelete(dispatch);
        }}
      >
        <View style={styles.buttonContainer}>
          <MaterialCommunityIcons
            color={LightColors.primary}
            size={30}
            name="delete-forever-outline"
          ></MaterialCommunityIcons>
        </View>
      </TouchableOpacity>
   
  );
};

const styles = StyleSheet.create({

  buttonContainer: {
    width: 50,
    height: 50,
    backgroundColor: LightColors.priorities.high,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DeleteButton;
