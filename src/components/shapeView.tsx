import { FC } from 'react';
import {shapes} from '../constants/types'
import { StyleSheet, View } from 'react-native';
import { LightColors, listColors } from '../constants/Colors';

const shapeValues = Object.values(shapes)
 interface IShape {
    shape?:typeof shapeValues[number];
}

const GetShape:FC<IShape>  = ({shape}) => {

    return (
        <View style={[styles[ shape ?? "rectangle"],{}]}></View>
    )
}
//
const styles:{[key: string]: any} = StyleSheet.create({
    circle: {
        width:15,
        height:15,
        borderRadius: 100,
        backgroundColor: listColors[2],
    },
    square:{
        width:15,
        height:15,
        backgroundColor: listColors[2],
        borderRadius:5
    },
    rectangle:{
        width:17,
        height:12,
        backgroundColor: listColors[2],
        borderRadius:3
    },
    triangle:{
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderBottomWidth: 14,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: listColors[2],
        
    },
    rhombus:{
        width:15,
        height:15,
        transform: [{ rotate: "45deg" }],
        backgroundColor: listColors[2],
        borderRadius:3
    }
})
export default GetShape;