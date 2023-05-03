import { StyleSheet, Dimensions } from "react-native";
import { LightColors } from "../../../constants/Colors";

const { height, width } = Dimensions.get("window");
export const styles = StyleSheet.create({
  taskContainer: {
    //flex: 1,
    // ! width and height are temprory
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  taskHeader: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  taskBody: {
    width: "90%",
    marginVertical: 10,
    borderBottomColor: LightColors.primary,
    borderBottomWidth: 0.2,

    borderRadius: 2,
    paddingBottom: 5,
  },
  taskFooter: {
    width: "90%",
    flexDirection: "row",
  },

  headerText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 13,
  },
  title: {
    width: "80%",
  },
  priority: {
    width: "19%",
    height: 20,
    borderRadius: 20,
    justifyContent: "center",
  },
  priorityText: {
    fontFamily: "Poppins-Medium",
    fontSize: 10,
    textAlign: "center",
    color: LightColors.secondary
    
  },
  bodyText: {
    fontFamily: "Poppins-Light",
    fontSize: 11,
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
