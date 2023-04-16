import { StyleSheet,Dimensions } from "react-native";
import { LightColors } from "../../constants/Colors";

const {height, width} = Dimensions.get('window')
export const styles = StyleSheet.create({

 conteiner:{
    backgroundColor:LightColors.darkBackground,
    width:width,
    minHeight:height,
    justifyContent:"center",

 },


})