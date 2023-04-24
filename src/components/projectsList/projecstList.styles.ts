import { StyleSheet } from "react-native";
import { LightColors, listColors } from "../../constants/Colors";

export const styles = StyleSheet.create({
  continer: {
    height: "100%",
    backgroundColor: "rgba(200,200,200,0.3)",
    borderRadius: 30,
    overflow: "hidden",
  },

  header: {
    //backgroundColor: LightColors.tertiary,
    paddingVertical: 10,
    alignItems: "center",
    width: "85%",
    alignSelf: "center",
    borderBottomWidth: 1,
    borderColor:LightColors.primary
  },
  headerText: {
    color: "white",
    fontFamily: "Poppins-Bold",
    fontSize: 20,
  },
  middleView: {
    flex: 16,
  },
  list: {
    // borderRadius:100,
    // borderBottomWidth: 1,
    // borderTopWidth: 1,
    paddingTop: 20,
  },
  drawerContent: {
    minHeight: "100%",
    borderTopEndRadius: 50,
  },
  bottomView: {
    flex: 2,
    justifyContent: "center",
    borderTopWidth: 1,
  },
  bottomButton: {
    margin: 10,
    height: 40,
    width: "90%",
    alignSelf: "center",
    backgroundColor: listColors[14],
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    paddingHorizontal: 10,
    color: "white",
    fontFamily: "Poppins-Bold",
    fontSize: 18,
  },
});
