import { StyleSheet } from "react-native";
import { listColors } from "../../../constants/Colors";

export const styles=StyleSheet.create({
    homeButton:{
        margin:10,
        height:40,
        width:"90%",
        alignSelf:"center",
        backgroundColor:listColors[1],
        borderRadius:20,
        justifyContent:"center",
     },
     buttonText:{
        textAlign:"center",
        color:"white"
     }
})