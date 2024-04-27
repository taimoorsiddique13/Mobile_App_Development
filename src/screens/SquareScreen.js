import React from 'react';
import { StyleSheet, Text, View, Button,TextInput,FlatList} from 'react-native';
import { useState } from 'react';
import ColorChanger from '../components/ColorChanger';

export default function SquareScreen() {
        const [red,setRed]=useState(0);
        const [green,setGreen]=useState(0);
        const [blue,setBlue]=useState(0);

        const Color_Increment=15;

        const setColor=(color,change)=>{
            switch(color)
            {
                case 'red':
                    red+change>255||red+change<0?null:setRed(red+change)
                    return
                case 'green':
                    green+change>255||green+change<0?null:setGreen(green+change)
                    return
                case 'blue':
                    blue+change>255||blue+change<0?null:setBlue(blue+change)
                    return    
            }
        }
  return (
    <View>
        <Text>
            Welcome to Square Screen
        </Text>
        <ColorChanger
        color='Red'
        onIncrease={()=>{
            setColor('red',Color_Increment);
        }}
        onDecrease={()=>{
            setColor('red',-1*Color_Increment);
        }}
        />
    <ColorChanger
        color='Green'
        onIncrease={()=>{
            setColor('green',Color_Increment);
        }}
        onDecrease={()=>{
            setColor('green',-1*Color_Increment);
        }}
        />
        <ColorChanger
        color='Blue'
        onIncrease={()=>{
            setColor('blue',Color_Increment);
        }}
        onDecrease={()=>{
            setColor('blue',-1*Color_Increment);
        }}
        />
        <View style={{height:100,width:100,backgroundColor:`rgb(${red},${green},${blue})`}}>

        </View>
        </View>
  );
}

const styles = StyleSheet.create({
 
 
});
