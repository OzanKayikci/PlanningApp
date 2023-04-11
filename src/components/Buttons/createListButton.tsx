import { useCallback } from "react";

import { StyleSheet, View, Dimensions,TouchableOpacity } from "react-native";

import { LightColors, listColors } from "../../constants/Colors";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
const { width, height } = Dimensions.get("window");

const CreateListButton = ({ action }: { action: () => void }) => {
  const handleOpen = useCallback(() => {
    action();
  }, [action]);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>{handleOpen()}}>
        <View style={styles.buttonContainer}>
          <MaterialCommunityIcons color={LightColors.secondary } size={30} name="playlist-plus"></MaterialCommunityIcons>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: height - 60,
    left: width-60
  },
  buttonContainer: {
    width: 50,
    height: 50,
    backgroundColor: listColors["9"],
    borderRadius: 50,
    justifyContent:"center",
    alignItems:"center"
  },
});

export default CreateListButton;
