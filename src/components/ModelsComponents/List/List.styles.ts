import { StyleSheet, Dimensions } from "react-native";
import { LightColors, listColors } from "../../../constants/Colors";

const { height, width } = Dimensions.get("window");
export const styles = StyleSheet.create({
  listContainer: {
    //flex: 1,
    // ! width and height are temprory
    margin: 20,
    width: width / 1.2,
    alignItems: "center",
    borderRadius: 15,
  },
  listHeader: {
    width: "85%",
    flexDirection: "row",

    // justifyContent:"space-between",
    paddingBottom: 5,
    marginVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: LightColors.secondary,
  },
  listBody: {
    width: "85%",

    marginBottom: 20,
  },
  headerButton:{
    flex: 10,
  },
  headerText: {
    fontFamily: "Poppins-SemiBoldItalic",
    fontSize: 20,
    textAlign: "center",
    flex: 1,

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
