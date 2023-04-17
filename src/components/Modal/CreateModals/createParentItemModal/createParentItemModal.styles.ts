import { StyleSheet } from "react-native";
import { LightColors, listColors } from "../../../../constants/Colors";


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
    },
    itemLabel:{
        color:LightColors.secondary,
        fontFamily:"Poppins-SemiBold"
    },
    itemInput:{
        width:"100%",
        height:40,
        paddingHorizontal:10,
        backgroundColor:"rgba(200, 210, 247,0.2)",
        //textAlign:"center",
        borderWidth:1,
        borderColor:LightColors.secondary,
        borderRadius:20,
        fontFamily:"Poppins-Medium",
    },
    buttonContainer: {
        width: 50,
        height: 50,
        backgroundColor: listColors["1"],
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
      },
})

export default styles