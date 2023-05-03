import { StyleSheet, Dimensions } from "react-native";
import { LightColors, listColors } from "../../../../constants/Colors";

const {width, height} = Dimensions.get("window");

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
        minHeight:height

    },
    bodyItem:{
        width:"90%",
        margin:10,
        index:100
    },
    itemLabel:{
        color:LightColors.secondary,
        fontFamily:"Poppins-SemiBold",

    },
    itemInput:{
        width:"100%",
        height:40,
        paddingHorizontal:10,
        backgroundColor:"rgba(200, 210, 247,0.2)",
        //textAlign:"center",
        borderWidth: 1,
        borderColor: "#ccc",
        //borderColor:LightColors.secondary,
        borderRadius:15,
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