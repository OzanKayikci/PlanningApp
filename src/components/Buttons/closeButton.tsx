import { useCallback } from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";

import { LightColors, listColors } from "../../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { deleteModalState } from "../../redux/state/modalSlice";
import { useAppDispatch } from "../../redux/hooks/hooks";
const { width, height } = Dimensions.get("window");

const handleClose = (dispatch: any) => {
  console.log("closee")
  dispatch(deleteModalState());
};

const CloseButton = () => {
  const dispatch = useAppDispatch();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          handleClose(dispatch);
        }}
      >
        <View style={styles.buttonContainer}>
          <MaterialCommunityIcons
            color={LightColors.secondary}
            size={30}
            name="close"
          ></MaterialCommunityIcons>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "red",
  },
  buttonContainer: {
    width: 50,
    height: 50,
    backgroundColor: listColors["9"],
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CloseButton;
