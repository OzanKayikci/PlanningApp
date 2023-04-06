import { StyleSheet,Dimensions } from "react-native";
import { LightColors } from "../../../constants/Colors";

const {height, width} = Dimensions.get('window')
export const styles = StyleSheet.create({
    listContainer: {
      //flex: 1,
      // ! width and height are temprory
     margin:20,
      width:width/1.2,
      alignItems: 'center',
      borderRadius:15
    },
    listHeader:{
        width:"85%",
        
        paddingVertical:12
    },
    listBody:{
        width:"85%",
        
        marginBottom:20,
        
    },
    headerText:{
        fontFamily:"Poppins-SemiBoldItalic",
        fontSize:20,

    }
  });