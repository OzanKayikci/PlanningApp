import { StyleSheet } from "react-native";
import { listColors } from "../../../constants/Colors";

export const styles = StyleSheet.create({
  homeButton: {
    margin: 10,
    height: 40,
    width: "90%",
    alignSelf: "center",
    backgroundColor: listColors[1],
    borderRadius: 20,
    justifyContent: "center",
    alignItems:"center"
  },
  buttonView: {
    flexDirection: "row",
    width:"90%",
    justifyContent: "center",

  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    flex:10
  },

  buttonContainer: {
    //backgroundColor: listColors["1"],
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "flex-end",
  },

  deleteButton: {
    flex: 1,
  },
});
