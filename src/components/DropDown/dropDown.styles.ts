import { StyleSheet } from "react-native";
import { LightColors } from "../../constants/Colors";

export const styles = StyleSheet.create({
  dropdownContainer: {},
  dropdownHeader: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    
  },
  header:{
    color:LightColors.secondary,
    fontFamily:"Poppins-Medium",

  },
  dropdownOptionsContainer: {
    //position: "absolute",
    //top: "120%",
    width: "100%",
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 10,
maxHeight:150
    
  },
  dropdownOptions: {
    height:"100%",
    flexGrow:1,

  },
  itemButton: {
    margin: 2,
    borderRadius: 15,
  },
  buttonView: {
    margin: 2,
    backgroundColor: "#fff",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  item:{
    fontFamily:"Poppins-Italic",

  }
});
