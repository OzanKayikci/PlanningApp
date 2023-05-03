import { StyleSheet, Dimensions } from "react-native";
import { LightColors } from "../../constants/Colors";

const { height, width } = Dimensions.get("window");
export const styles = StyleSheet.create({
  container: {
    width: width,
    paddingTop: 20,
    backgroundColor: LightColors.darkBackground,
  },
  headerContainer:{
    width:"95%",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-around",
    alignSelf:"center",

  },
  header: {
    backgroundColor: "rgba(200,200,200,0.2)",
    width: "87%",
    alignSelf: "center",
    borderBottomColor: LightColors.secondary,
    borderBottomWidth: 3,
    borderRadius: 20,
  },
  headerText: {
    marginVertical:5,
    color: LightColors.primary,
    textAlign: "center",
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    
  },
  headerIcon: {
    width: 30,
    height: 30,
  position:"absolute",
  left:"45%",
  top:-16,
    
  },
});
