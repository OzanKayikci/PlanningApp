import { StyleSheet } from "react-native";
import { LightColors } from "../../../constants/Colors";


const styles = StyleSheet.create({
    container:{
        width:"100%", height:"100%",

    },
    header:{
        justifyContent:"center",
        alignItems:"center"
    },
    HeaderText:{
        color:LightColors.secondary,
        fontFamily:"Poppins-Bold",
        fontSize:30
        
    },

    body:{
        //justifyContent:"center",
        alignItems:"center",

    },
    bodyItem:{
        width:"90%",
        margin:10,
        textAlign:"center"
    },
    itemLabel:{
        color:LightColors.secondary,
        fontFamily:"Poppins-SemiBold"
    },

})

export default styles