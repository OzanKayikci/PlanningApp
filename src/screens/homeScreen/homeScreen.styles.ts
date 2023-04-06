import { StyleSheet,Dimensions } from "react-native";
import { LightColors } from "../../constants/Colors";

const {height, width} = Dimensions.get('window')
export const styles = StyleSheet.create({
    container: {
        width:width,
        height:height,
      backgroundColor: LightColors.secondary,
      alignItems: "center",
      justifyContent: "center",
    },
  });