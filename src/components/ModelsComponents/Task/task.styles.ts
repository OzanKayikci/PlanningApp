import { StyleSheet,Dimensions } from "react-native";
import { LightColors } from "../../../constants/Colors";

const {height, width} = Dimensions.get('window')
export const styles = StyleSheet.create({
    taskContainer: {
      //flex: 1,
      // ! width and height are temprory
      width:"100%",
      alignItems: 'center',
      borderRadius:10,
      paddingVertical:15,

    },
    taskHeader:{
        width:"90%",
        flexDirection:"row",
        justifyContent:"space-between",
        
    },
    taskBody:{
        width:"90%",
        marginVertical:10,
    
        
    },
    headerText:{
        fontFamily:"Poppins-SemiBold",
        fontSize:13,

    },
    title:{
       
        width:"80%",

    },
    priority:{
        width:"18%",
        height:20,
        borderRadius:20,
        justifyContent:"center",
        
    },
    priorityText:{
        fontFamily:"Poppins-Light",
        fontSize:10,
        textAlign:"center", 
       
    },
    bodyText:{
        fontFamily:"Poppins-Light",
        fontSize:12
    }
  });