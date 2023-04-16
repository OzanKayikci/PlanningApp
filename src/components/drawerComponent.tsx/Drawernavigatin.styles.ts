import { StyleSheet } from "react-native";
import { LightColors, listColors } from "../../constants/Colors";


export const styles = StyleSheet.create({
    continer:{
        height:"100%",
        backgroundColor:"rgba(200,200,200,0.3)",
        borderRadius: 30,
        overflow: 'hidden',
        
    },
    viewContiner:{
        flex:1,
 
        
    },
    header: {
        //backgroundColor: LightColors.tertiary,
        paddingVertical:10,
        alignItems:"center",
        width: "95%",
        alignSelf: "center",
        
        borderBottomWidth: 1,
        borderBottomLeftRadius:15
       
    },
     headerText:{
        color:"white",
        fontFamily:"Poppins-Bold",
        fontSize:20
     },
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