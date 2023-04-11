import { useCallback } from "react";
import { StyleSheet, View, Dimensions,TouchableOpacity } from "react-native";

import { LightColors, listColors } from "../../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");

const CloseButton = ({ action }: { action: () => void }) => {
  const handleClose = useCallback(() => {
    action();
  }, [action]);
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          handleClose();
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
